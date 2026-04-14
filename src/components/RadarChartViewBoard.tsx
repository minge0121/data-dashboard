import BaseChart from "@/components/BaseChart";
import { echarts } from "@/utils/echartsConfig";
import type { EChartsOption } from "@/utils/echartsConfig";
import type { RegionData2025 } from "@/utils/mockData";
import { useMemo } from "react";

// 雷达图
const RadarChartViewBoard = ({
  regionName,
  regionData,
  isNational,
}: {
  regionName: string;
  isNational: boolean;
  regionData: RegionData2025;
}) => {
  const options: EChartsOption = useMemo(() => {
    const data = regionData.safetyIndicators;

    return {
      title: {
        text: isNational
          ? "2025年全国安全指标"
          : `${regionName} 2025年安全指标`,
        left: "center",
        top: "0%", // 标题距离顶部顶部
        textStyle: { fontSize: 14, fontWeight: "bold" },
      },
      tooltip: {
        backgroundColor: "rgba(6,13,31,0.9)",
        borderColor: "rgba(0,224,255,0.2)",
        textStyle: { color: "#e8edf3", fontSize: 12 },
      },
      radar: {
        indicator: data.map((item) => ({
          name: item.name,
          max: item.max,
        })), // 雷达图的维度和取值范围。例如 [{ name: '指标1', max: 100 }, ...]
        // shape: "polygon", // 多边形（默认），改成 'circle' 就是圆形雷达图
        radius: "65%", // 雷达图半径占整个容器宽/高的 65%，简言之就是图表整体大小
        center: ["50%", "55%"], // 雷达图圆心位置（水平居中，垂直略偏下）
        axisName: {
          // 各指标轴文字颜色（灰蓝色）
          color: "#7b8ca8",
          fontSize: 11,
        },
        splitArea: {
          areaStyle: {
            color: ["rgba(0,224,255,0.02)", "rgba(0,224,255,0.04)"].reverse(), // // 背景填充色的两个交替层（反向）
          },
        },
        splitLine: { lineStyle: { color: "rgba(0,224,255,0.1)" } }, // 分隔线（从中心到顶点的放射线）样式
        axisLine: { lineStyle: { color: "rgba(0,224,255,0.1)" } }, // 轴线（多边形各边）样式
      },
      grid: {
        left: "4%",
        right: "4%",
        top: "4%",
        bottom: "30%",
      },
      // 雷达图数据，有两组数据，表示有个雷达图线
      series: [
        {
          type: "radar", // 雷达图类型
          data: [
            {
              value: data.map((item) => item.value), // 与 indicator 顺序对应的数值
              name: "当前评分",
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  // 垂直渐变填充
                  { offset: 0, color: "rgba(0,224,255,0.35)" }, // 顶部青色较浓
                  { offset: 1, color: "rgba(0,224,255,0.05)" }, // 底部几乎透明
                ]),
              },
              lineStyle: { color: "#00e0ff", width: 2 }, // 实线，青色，稍粗
              itemStyle: { color: "#00e0ff" }, // 数据点标记颜色
            },
          ],
        },
      ],
      // legend: {
      //   // 图例配置
      //   bottom: 0, // 放置在底部
      //   textStyle: { color: "#7b8ca8", fontSize: 11 },
      //   itemWidth: 16,
      //   itemHeight: 2, // 图例标记的宽和高（标记为细长条状）
      // },
      animationDuration: 1500, // 初始动画持续 1.5 秒
    };
  }, [isNational, regionData, regionName]);

  return (
    <div className="w-full h-full">
      <BaseChart option={options} />
    </div>
  );
};

export default RadarChartViewBoard;
