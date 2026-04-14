import BaseChart from "@/components/BaseChart";
import { echarts } from "@/utils/echartsConfig";
import type { EChartsOption } from "@/utils/echartsConfig";
import type { RegionData2025 } from "@/utils/mockData";
import { useMemo } from "react";
// 如果自己封装的BaseChart有问题，就换ReactECharts验证，看是数据问题还是组件配置问题。
// import ReactECharts from 'echarts-for-react';

// 柱状图（横向/纵向）
const BarChartViewBoard = ({
  regionName,
  regionData,
  isNational,
}: {
  regionName: string;
  isNational: boolean;
  regionData: RegionData2025;
}) => {
  // 横向条形图配置 : yAxis是category（类别轴）+ xAxis是value（数值轴）
  const option: EChartsOption = useMemo(() => {
    const data = regionData.gdpRanking;
    const names = data.map((item) => item.name);
    const values = data.map((item) => item.gdp);
    const maxVal = Math.max(...values);

    return {
      title: {
        text: isNational ? "2025年GDP排名前7省份" : `${regionName} 2025年GDP`,
        left: "center",
        top: "0%", // 标题距离顶部顶部
        textStyle: { fontSize: 14, fontWeight: "bold" },
      },
      grid: {
        // 网格布局
        left: "28%", //  左侧留出较大空间，因为 Y 轴标签（区名）较长，避免被截断
        right: "12%", // 右侧空间用于显示数据标签（label）
        top: "8%", // 控制图表主体与容器边界的距离
        bottom: "8%", // 控制图表主体与容器边界的距离
      },
      xAxis: [
        {
          type: "value", // 数值轴, 用于处理连续的数值数据
          show: false, // 使用了背景柱来表示最大值范围，不需显示 X 轴线、刻度、标签
        },
      ],
      yAxis: {
        type: "category", // 分类轴, 用于处理离散的分类数据
        data: names,
        inverse: true, // 让 Y 轴从上到下排列
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#7b8ca8",
          fontSize: 11,
          fontFamily: "Noto Sans SC",
        },
      },
      series: [
        // 背景柱（灰色，表示最大值范围）
        {
          type: "bar",
          barWidth: 12,
          barGap: "-100%", // 与前景柱重叠
          data: names.map(() => maxVal * 1.1),
          itemStyle: {
            color: "rgba(0,224,255,0.06)",
            borderRadius: [0, 4, 4, 0],
          },
          silent: true, // 不响应鼠标事件
        },
        // 前景柱（渐变色）
        {
          type: "bar",
          barWidth: 12,
          data: values,
          itemStyle: {
            borderRadius: [0, 4, 4, 0], // 圆角
            // 线性渐变：从左（透明）到右（亮青色）
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(0,224,255,0.15)" },
              { offset: 1, color: "rgba(0,224,255,0.8)" },
            ]),
          },
          label: {
            show: true,
            position: "right",
            color: "#00e0ff",
            fontSize: 11,
            fontFamily: "Orbitron",
            // formatter: "{c}万",
            formatter: function (params) {
              // params 包含以下属性：
              // - params.value: 数据值
              // - params.name: 数据名
              // - params.seriesName: 系列名
              // - params.dataIndex: 数据索引
              // - params.color: 柱子颜色
              return (params.value as number) / 10000 + "万亿";
            },
          },
        },
      ],
      animationDuration: 1500,
      animationEasing: "cubicOut",
    };
  }, [isNational, regionData, regionName]);

  return (
    // 在BaseChart外面包一层，然后点击整个图表区域都会触发点击事件
    // <div
    //   onClick={toggleOrientation}
    //   style={{ cursor: "pointer", width: "100%", height: "100%" }}
    // >
    <BaseChart option={option} />
    // </div>
    // <ReactECharts option={option} />;
  );
};

export default BarChartViewBoard;
