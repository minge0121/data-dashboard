import BaseChart from "./BaseChart";
import type { EChartsOption } from "@/utils/echartsConfig";
import type { RegionData2025 } from "@/utils/mockData";
import { useMemo } from "react";

// 饼图（环形图）
const PieChartViewBoard = ({
  regionName,
  regionData,
  isNational,
}: {
  regionName: string;
  isNational: boolean;
  regionData: RegionData2025;
}) => {
  const option: EChartsOption = useMemo(() => {
    const data = regionData.industryRatio;

    const colors = ["#00e0ff", "#00e676", "#ffab00", "#7c4dff", "#455a64"];
    return {
      title: {
        text: isNational
          ? "2025年全国产业占比"
          : `${regionName} 2025年产业占比`,
        left: "center",
        top: "0%", // 标题距离顶部顶部
        textStyle: { fontSize: 14, fontWeight: "bold" },
      },
      tooltip: {
        // 提示框
        trigger: "item", // 触发方式为“数据项”，即鼠标移到扇区上时触发
        backgroundColor: "rgba(6,13,31,0.9)",
        borderColor: "rgba(0,224,255,0.2)",
        textStyle: { color: "#e8edf3", fontSize: 12 },
        formatter: "{b}：{d}%", // 提示框格式化：扇区名称：占比%。{b}和{d}这种字母是ECharts官方预先定义。自定义建议用回调函数实现formatter: function (params) {...}。
      },
      legend: {
        // 图例 ---> 对环形图各个区域进行说明。图例会自动查找series并匹配每个系列或数据项(类型为pie)的name来生成图例项
        // data:['高新技术'],  // 手动关联（精确控制）,明确指定要显示的图例项,legend.data中的name必须与series中每个数据项(此处类型为pie)的name完全一致，否则图例不会显示
        orient: "vertical",
        left: "left", // 图例位置：左侧
        top: "middle", // 图例位置：垂直居中
        textStyle: { color: "#7b8ca8", fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
      },
      series: [
        {
          type: "pie", // 饼图（环形图）
          radius: ["40%", "70%"], // 内径40%，外径70% → 环形 。内外径不同形成环形（类似甜甜圈图）。如果只有一个值则变成实心饼图。
          center: ["50%", "50%"], // 圆心位置：水平方向距左侧 35%，垂直方向 50% 处。偏左侧，留出右侧空间给图例。
          avoidLabelOverlap: false,
          label: { show: false }, // 关闭扇区标签 ，因为此处用的图例显示扇区名称。
          emphasis: {
            // 高亮（鼠标悬停）时的样式
            label: {
              show: true,
              fontSize: 13,
              fontWeight: "bold",
              color: "#03172fff",
              formatter: "{b}\n{d}%",
            },
            scaleSize: 8,
          },
          itemStyle: {
            borderColor: "#060d1f", // 扇区之间的分隔色（和背景色一样，制造“无缝”或“缝隙”效果）
            borderWidth: 2,
          },
          color: colors, // 外部定义的颜色数组，依次赋给各个扇区。
          labelLine: { show: false },
          data: data.map((item) => ({
            name: item.name,
            value: item.value,
          })), // 外部传入的数据数组，通常格式为 [{ name: "A", value: 100 }, ...]
        },
      ],
      animationDuration: 1500, // 初始动画时长 1500 毫秒
    };
  }, [isNational, regionName, regionData]);

  return <BaseChart option={option} />;
};

export default PieChartViewBoard;
