// 大屏内容: 图表、组件、业务代码
// 引入指标卡片区组件
import IndicatorCardViewBorad from "@/components/IndicatorCardViewBoard";
import ChartModule from "@/components/ChartModule";
import BarChartViewBoard from "@/components/BarChartViewBoard";
import PieChartViewBoard from "@/components/PieChartViewBoard";
import AreaChartViewBoard from "@/components/AreaChartViewBoard";
import RadarChartViewBoard from "@/components/RadarChartViewBoard";
// import EventList from "@/components/EventListViewBoard";
// 引入hooks
import {useCurrentTime} from "@hooks/useCurrentTime";
import { useCallback, useMemo, useState } from "react";
import MapChartViewBoard from "@/components/MapChartViewBoard";
import { getRegionData } from "@/utils/mockData";
import type { RegionData2025 } from "@/utils/mockData";

interface RegionInfo {
  name: string;
  level: number;
}

const ScreenContent = () => {
  // 获取当前时间（这个会不断的更新视图，因为里面useState会不断更新state）
  const currentTime = useCurrentTime();

  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>({
    name: "全国",
    level: 0,
  });

  // 获取当前区域数据
  const regionData = useMemo<RegionData2025>(
    () => getRegionData(selectedRegion.name, selectedRegion.level),
    [selectedRegion.name, selectedRegion.level],
  );

  // 判断是否为全国视图
  const isNational = useMemo(
    () => selectedRegion.level === 0 || selectedRegion.name === "全国",
    [selectedRegion.level, selectedRegion.name],
  );

  const handleRegionSelect = useCallback(
    (regionName: string, regionLevel: number) => {
      setSelectedRegion({
        name: regionName,
        level: regionLevel,
      });
    },
    []  // 空依赖数组
  );

  return (
    // 主容器
    // h-screen、w-screen：视口高度、宽度。祖先明确可计算的高度、宽度 --> 子元素（图表容器）height:100%、width:100%才能生效
    <div className="screen-bg w-full h-full flex flex-col overflow-hidden">
      {/* ==================== 顶部标题栏 ==================== */}
      <header className="flex-shrink-0 px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          {/* 左侧装饰 */}
          <div className="flex items-center gap-3 text-slate-400">
            <div className="w-2 h-2 rounded-full bg-cyan-accent breathe" />
            <span className="text-muted text-xs font-body tracking-wider">
              SYSTEM ONLINE
            </span>
          </div>

          {/* 中间标题 */}
          <div className="text-center text-slate-400">
            <h1 className="text-3xl font-bold mt-1 tracking-widest font-body">
              数 据 中 心 大 屏 可 视 化 平 台
            </h1>
            <p className="mt-2 text-xl tracking-wide ">
              统一监测 · 实时预警 · 分发分析
            </p>
          </div>

          {/* 右侧时间 */}
          <div className="text-right text-slate-400">
            <div className="font-display text-lg text-cyan-accent tracking-wider">
              SYSTEM TIME
            </div>
            <div className="text-muted text-xs font-display tracking-wider">
              {currentTime}
            </div>
          </div>
        </div>
        {/* 标题下方装饰线 */}
        <div className="title-line mt-3" />
      </header>

      {/* ==================== 指标卡片区 ==================== */}
      <section className="flex-shrink-0 px-6 py-3" aria-label="核心指标">
        <IndicatorCardViewBorad />
      </section>

      {/* ==================== 图表区（三列布局） ==================== */}
      {/* CSS Grid 显式行布局 替代之前的 Flex 嵌套，彻底避免 flex 高度计算问题
          grid-rows-2：强制将主区域分为上下两行，每行占 50% 高度 */}
      <main className="flex-1 min-h-0 px-6 pb-6 grid grid-cols-12 grid-rows-2 gap-3">
        {/* 左列：占 3 列 */}
        <div className="col-span-12 md:col-span-3 md:[grid-area:1/1/2/4]">
          <ChartModule title="GDP数据" className="h-full">
            {/* 柱状图 */}
            <BarChartViewBoard
              regionName={selectedRegion.name}
              regionData={regionData}
              isNational={isNational}
            />
          </ChartModule>
        </div>
        <div className="col-span-12 md:col-span-3 md:[grid-area:2/1/3/4]">
          <ChartModule title="产业占比" className="h-full">
            {/* 环形图(饼图) */}
            <PieChartViewBoard
              regionName={selectedRegion.name}
              regionData={regionData}
              isNational={isNational}
            />
          </ChartModule>
        </div>

        {/* 中列：占 6 列 */}
        <div className="col-span-12 md:col-span-6 md:[grid-area:1/4/3/10]">
          <ChartModule title="地图" className="h-full">
            <div style={{ marginBottom: "10px" }}>
              <h2 style={{ margin: 0, color: "#666", fontSize: "16px" }}>
                当前选中：{selectedRegion.name} | 级别：
                {selectedRegion.level === 0
                  ? "全国"
                  : selectedRegion.level === 1
                    ? "省级"
                    : "市级"}
              </h2>
              <p
                style={{ margin: "5px 0 0 0", color: "#999", fontSize: "12px" }}
              >
                提示：点击地图区域可下钻查看详情，点击"返回上级"可回到上一级视图
              </p>
            </div>
            <MapChartViewBoard onRegionSelect={handleRegionSelect} />
          </ChartModule>
        </div>

        {/* 右列：占 3 列 */}
        <div className="col-span-12 md:col-span-3 md:[grid-area:1/10/2/13]">
          <ChartModule title="安全指标" className="h-full">
            {/* 雷达图 */}
            <RadarChartViewBoard
              regionName={selectedRegion.name}
              regionData={regionData}
              isNational={isNational}
            />
          </ChartModule>
        </div>
        <div className="col-span-12 md:col-span-3 md:[grid-area:2/10/3/13]">
          <ChartModule
            title="人口趋势（近5年）"
            className="h-full overflow-hidden"
          >
            {/* 折线图 */}
            <AreaChartViewBoard
              regionName={selectedRegion.name}
              regionData={regionData}
              isNational={isNational}
            />
          </ChartModule>
        </div>
      </main>

      {/* ==================== 底部装饰条 ==================== */}
      <footer className="flex-shrink-0 px-6 pb-3">
        <div
          className="title-line"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,224,255,0.15), transparent)",
          }}
        />
        <div className="flex justify-between text-muted text-[10px] mt-2 font-display tracking-wider">
          <span>DATA REFRESH RATE: 5s</span>
          <span>POWERED BY REACT + ECHARTS</span>
          <span>NODES: 2,847 ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default ScreenContent;
