import React, { useEffect, useState, useCallback, useMemo } from "react";
import { echarts } from "@/utils/echartsConfig";
import type { EChartsOption } from "echarts";
import BaseChart from "@/components/BaseChart";

// ========= 类型定义 =========

interface GeoJsonProperties {
  adcode: string | number;
  name: string;
  level: string;
  parent?: { adcode: string | number };
  [key: string]: unknown;
}

interface GeoJsonFeature {
  type: "Feature";
  properties: GeoJsonProperties;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJsonData {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

interface MapDataItem {
  name: string;
  value: number;
  adcode?: string | number;
}

interface MapChartProps {
  width?: string | number;
  height?: string | number;
  onRegionSelect?: (
    regionName: string,
    regionLevel: number,
    regionData: MapDataItem | null,
  ) => void;
  theme?: string;
}

// ========= 常量 =========

const GEO_DATA_URL = "https://geo.datav.aliyun.com/areas_v3/bound/geojson";
const LOCAL_GEO_PATH = "./geojson"; // public/geojson/ 目录。发布到github page后，接口可能调不通，改为访问本地数据
const ADCODE_CHINA = "100000";

// ========= 地图组件 =========
// 此处可能存在的问题：是否需要每次都重新注册地图(当前情况GeoJSON不会变，故不需要重新注册覆盖旧的)，再重新setOptions（更新地图渲染）?
// 注意：ECharts.init只需要初始一次，是在一个容器（DOM元素）上创建一个图表实例
//      registerMap：是向ECharts全局注册一份地图数据，方便后续的图表实例通过地图名字来调用它
//      init 可以在 registerMap 之前或之后调用，因两者是不同层面的独立操作
//      同步流程时：先注册（已有地图数据）==> 后初始化（init, setOption）
//      异步流程时：先init初始化一次 ==> 再异步获取地图数据后，registerMap注册地图 ==> 再setOption更新渲染
const MapChartViewBoard: React.FC<MapChartProps> = ({
  width = "100%",
  height = "100%",
  onRegionSelect,
  theme,
}) => {
  // 当前注册到 ECharts 的“地图名称”（全国=china，其它=adcode）
  const [mapName, setMapName] = useState<string>("china");

  // 当前层级（0：全国，1：省，2：市）
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  // 上级栈：用于“返回上级”
  const [parentStack, setParentStack] = useState<
    Array<{ name: string; adcode: string; level: number }>
  >([]);

  // 当前要展示的地图数据（series.data）
  const [mapData, setMapData] = useState<MapDataItem[]>([]);

  // 全局 loading 状态（获取 GeoJSON 时）
  const [loading, setLoading] = useState<boolean>(false);

  // 标记“地图数据是否至少成功加载过一次”，避免无意义渲染
  const [geoLoaded, setGeoLoaded] = useState<boolean>(false);

  // 已注册过的地图名称，避免重复注册
  const registeredMapRef = React.useRef<Set<string>>(new Set<string>());

  // 统一获取地图数据，并registerMap注册地图，生成 mock 数据
  const fetchMapData = useCallback(async (adcode: string, level: number) => {
    setLoading(true);

    try {
      let data: GeoJsonData | null = null;

      try {
        // 策略一：接口访问数据
        const url = `${GEO_DATA_URL}?code=${adcode}_full`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`地图数据在线加载接口响应异常:${response.status}`);
        }
        data = await response.json();
      } catch (onlineError) {
        console.warn("在线地图服务不可用，切换到本地数据:", onlineError);
        // 策略2：降级到本地数据
        try {
          const localPath = `${LOCAL_GEO_PATH}/${adcode}.json`;

          const localResponse = await fetch(localPath);
          if (!localResponse.ok) {
            throw new Error(`本地数据加载失败: ${localResponse.status}`);
          }
          data = await localResponse.json();
        } catch (localError) {
          console.error(`[Map] 本地数据也失败:`, localError);
          // 策略3：如果当前是省级，且没有本地数据，尝试使用全国数据兜底
          if (level > 0) {
            try {
              const fallbackResponse = await fetch(
                `${LOCAL_GEO_PATH}/100000.json`,
              );
              if (fallbackResponse.ok) {
                data = await fallbackResponse.json();
                console.warn(`[Map] 使用全国数据兜底显示`);
                // 降级为显示全国，重置层级
                setCurrentLevel(0);
              } else {
                throw new Error("全国兜底数据加载失败");
              }
            } catch {
              throw new Error("所有数据源均失败");
            }
          } else {
            throw new Error("全国数据加载失败");
          }
        }
      }

      // 此时 data 一定有值（GeoJsonData），否则已经 throw
      if (!data) throw new Error("未能获取到有效地图数据");

      // 避免重复注册同名地图（即使重新请求同一区域）
      const registerName = adcode === ADCODE_CHINA ? "china" : adcode;
      if (!registeredMapRef.current.has(registerName)) {
        // 5.0 以后需要手动通过 echarts.registerMap 注册地图数据 (GeoJSON 格式)
        // 注册地图后，ECharts 才能使用该地图名称（例如：setOption 中的 mapType）
        (
          echarts as unknown as {
            registerMap: (name: string, geoJson: GeoJsonData) => void;
          }
        ).registerMap(registerName, data);
        registeredMapRef.current.add(registerName);
      }

      // 从 GeoJSON 生成 mock 数据（value 使用 Math.random()，仅作演示）
      const mockData: MapDataItem[] = data.features.map((feature) => ({
        name: feature.properties.name,
        value: Math.round(Math.random() * 1000) + 500,
        adcode: feature.properties.adcode,
      }));

      setMapName(registerName);
      setMapData(mockData);
      setCurrentLevel(level);
      setGeoLoaded(true); // 每次重新渲染后，都标记为已加载过地图数据
    } catch (error) {
      console.error("地图数据加载错误:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始化：加载全国地图
  useEffect(() => {
    fetchMapData(ADCODE_CHINA, 0);
  }, [fetchMapData]);

  // 下钻逻辑: 点击地图区域
  const handleMapClick = useCallback(
    // 点击（地图区域）事件回调（ECharts params 包含 name、data、componentType 等）
    (params: unknown) => {
      const clickParams = params as {
        componentType?: string;
        seriesType?: string;
        name?: string;
        data?: MapDataItem;
      };

      // 忽略非地图系列点击（例如标线 markLine 等其它组件）
      if (
        !clickParams?.name ||
        clickParams.componentType !== "series" ||
        clickParams.seriesType !== "map"
      ) {
        return;
      }

      const regionName = clickParams.name;
      const regionData =
        mapData.find((item) => item.name === regionName) || null;

      // 向外暴露事件（父组件等传入的回调函数）
      onRegionSelect?.(regionName, currentLevel + 1, regionData);

      // 只做两级下钻（例如：全国 -> 省）
      // 当前层级允许下钻（<1）且该区域有 adcode
      if (currentLevel < 1 && regionData?.adcode) {
        const adcode = String(regionData.adcode);

        // 把当前视图（全国或当前省）压入栈
        setParentStack((prev) => [
          ...prev,
          {
            name: mapName === "china" ? "全国" : mapName,
            adcode: mapName === "china" ? ADCODE_CHINA : mapName,
            level: currentLevel,
          },
        ]);

        // 加载下级地图：根据点击区域的 adcode 加载对应的子区域地图
        fetchMapData(adcode, currentLevel + 1);
      }
    },
    [currentLevel, mapData, mapName, onRegionSelect, fetchMapData],
  );

  const onEvents = useMemo(
    () => ({
      click: handleMapClick,
    }),
    [handleMapClick],
  ); // handleMapClick 已经是 useCallback 缓存的

  // 返回上级
  const handleDrillUp = useCallback(() => {
    // 栈为空则直接返回：0层是初始地图，不能继续返回上级
    if (parentStack.length === 0) return;

    // 取栈顶元素（上一级视图）
    const parent = parentStack[parentStack.length - 1];
    // useState 传入函数（当新值依赖旧值时推荐）
    // 从栈中弹出当前视图（全国或当前省）
    setParentStack((prev) => prev.slice(0, -1));
    // 加载上一级地图：根据上一级视图的 adcode 加载对应的父区域地图
    fetchMapData(parent.adcode, parent.level);
    // 向外暴露事件（父组件等传入的回调函数）
    onRegionSelect?.(parent.name, parent.level, null);
  }, [parentStack, onRegionSelect, fetchMapData]);

  // 返回全国（重置）
  const handleReset = useCallback(() => {
    setParentStack([]);
    fetchMapData(ADCODE_CHINA, 0);
    onRegionSelect?.("全国", 0, null);
  }, [onRegionSelect, fetchMapData]);

  // ECharts 配置项
  const option: EChartsOption = {
    backgroundColor: "transparent", // 透明背景
    title: {
      // 标题配置
      text: currentLevel === 0 ? "中国地图" : `省级地图`, // 此处暂没有拿到省级地图名称
      left: "center",
      top: 20,
      textStyle: {
        fontSize: 20,
        fontWeight: "normal",
        color: "#333",
      },
    },
    tooltip: {
      // 提示框配置
      trigger: "item", // 鼠标悬停触发, 触发方式为数据项
      formatter: "{b}<br/>数值: {c}", // {b} 是数据名（区域名），{c} 是数据值
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: { color: "#333" },
    },
    visualMap: {
      // 可视化地图配置
      min: 0,
      max: 1500, // 数据范围 0–1500
      left: "left", // 左下角展示；默认位置为右下角
      bottom: "50",
      text: ["高", "低"], // 颜色范围文本提示
      calculable: true, // 允许拖拽筛选，用户可以拖动滑块来筛选数据范围
      inRange: {
        color: ["#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      },
    },
    toolbox: {
      // 工具箱组件
      show: true,
      right: 30, // 右上角展示；默认位置为左上角
      top: 20,
      feature: {
        myReset: {
          // 自定义 myReset 按钮
          show: true,
          title: "返回全国",
          icon: "path://M12,2 A10,10 0 1,1 2,12 L5,12 A7,7 0 1,0 12,5 Z", // SVG 路径绘制一个箭头圆弧
          onclick: handleReset, // 点击执行 handleReset
        },
        // 官方内置的“还原”按钮，可还原缩放、漫游等状态
        restore: { show: true, title: "还原" },
        saveAsImage: { show: true, title: "保存图片" }, // 内置的 saveAsImage 按钮导出图片
      },
    },
    series: [
      {
        name: "地图数据",
        type: "map", // "map" 类型，用于绘制地图
        map: mapName, // 注册的地图名称，也就是上面定义的registerName： "china" 或者 adcode值
        roam: true, // 允许缩放、漫游等操作
        // zoom: 1.2, // 初始缩放比例
        label: {
          // 区名标签配置
          show: true, // 显示区名标签
          fontSize: 10,
          color: "#333",
        },
        emphasis: {
          // 高亮样式（标签加粗、区域变黄、带阴影），鼠标悬停时触发
          label: { show: true, fontSize: 12, fontWeight: "bold" },
          itemStyle: {
            areaColor: "#ffd700",
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        select: {
          // 选中样式（标签加粗、区域变黄、带阴影），鼠标点击时触发
          itemStyle: { areaColor: "#ff7f50" },
          label: { show: true, color: "#fff" },
        },
        data: mapData,
      },
    ],
  };

  return (
    // 外层容器 position: relative，便于绝对定位按钮
    <div style={{ position: "relative", width, height }}>
      {/* 地图数据加载成功后，才渲染 BaseChart，避免无地图时 ECharts 报错 */}
      {geoLoaded && (
        <BaseChart
          option={option}
          width={width}
          height={height}
          loading={loading}
          theme={theme}
          onEvents={onEvents}
        />
        //  onEvents={{ click: handleMapClick }}  不能这么写，每次都生成新的对象，会导致BaseChart无限重新渲染
      )}

      {/* 返回上级按钮（仅在栈不为空时显示） */}
      {parentStack.length > 0 && (
        <button
          onClick={handleDrillUp}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            padding: "8px 16px",
            background: "#fff",
            border: "1px solid #5470c6",
            borderRadius: 4,
            cursor: "pointer",
            color: "#5470c6",
            fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          ← 返回上级
        </button>
      )}
    </div>
  );
};

export default MapChartViewBoard;

// 渲染过程
// 第一阶段：真正的“初始渲染”（页面刚出来）
//         组件函数执行，调用useState、useCallback、useEffect注册副作用函数（此时副作用函数不执行）
//         遇到return，因为 geoLoaded 是 false，所以 BaseChart 根本不会被渲染，页面是空div
//         在渲染结束（浏览器将变更绘制到屏幕）之后，useEffect 才会执行。于是调用fetchMapData请求全国地图数据

// 第二阶段：数据返回，触发“第一次有意义的渲染”
//         fetchMapData中调用了 setState 更新地图数据和加载状态
//         React（通过setState函数） 发现 state 被修改了
//         触发重新渲染：MapChart 组件函数重新执行一遍
//         再次走到 return，此时 geoLoaded === true，BaseChart 开始挂载
//         BaseChart 内部拿到了 option 数据，ECharts 开始渲染地图

// 第三阶段：点击下钻
//        点击事件触发handleMapClick回调。
//        此时仅 setParentStack 会触发一次渲染，左上角可能多了一个“返回上级”的按钮
//        因为fetchMapData是异步请求，故此时mapName和mapData还没有变，所以页面上地图暂时没变化，
//        异步请求完成（过了几百毫秒），fetchMapData内部调用 setState 更新地图数据和加载状态
//        React（通过setState函数）发现state被修改了，即mapName 和 mapData变了，MapChart组件函数重新执行
//        重新计算 option 对象
//        把新的 option 传给 <BaseChart option={option} ... />
//        BaseChart 内部 useEffect 在 option 变化时，会ECharts.setOption(option) 来更新地图

// 第四阶段：点击上级按钮
//        触发 handleDrillUp
//        从 parentStack 里拿出上一步存的 { name: "全国", adcode: "100000" }，此处name有问题
//        调用 fetchMapData("100000", 0)
//        数据回来 -> 执行 setMapName("china") 和 setMapData(全国数据)
//        State 改变 -> 触发 MapChart 重新执行 -> 生成新的 option
//        传给 BaseChart -> BaseChart 内部调用 chart.setOption -> ECharts 画回全国地图
