import BaseChart from "@/components/BaseChart";
import { barChartData } from "@/data/mock";
import { echarts } from "@/utils/echartsConfig";
import type { EChartsOption } from "@/utils/echartsConfig";
import { useState } from "react";
// 如果自己封装的BaseChart有问题，就换ReactECharts验证，看是数据问题还是组件配置问题。
// import ReactECharts from 'echarts-for-react';

const areas = barChartData.map(([name]) => name);
const values = barChartData.map(([, value]) => value);
const maxVal = Math.max(...values);

// 柱状图（横向/纵向）
export const BarChartViewBoard = () => {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  // 切换方向
  const toggleOrientation = () => {
    setOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal",
    );
  };

  // 横向条形图配置 : yAxis是category（类别轴）+ xAxis是value（数值轴）
  const getHorizontalOption = (): EChartsOption => ({
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
        max: maxVal * 1.1, // 设置坐标轴最大值为 maxVal 的 1.1 倍
      },
    ],
    yAxis: {
      type: "category", // 分类轴, 用于处理离散的分类数据
      data: areas,
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
        data: areas.map(() => maxVal * 1.1),
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
          formatter: "{c}万",
        },
      },
    ],
    animationDuration: 1500,
    animationEasing: "cubicOut",
  });

  // 垂直柱状图配置（保持相同视觉风格）
  const getVerticalOption = (): EChartsOption => ({
    grid: {
      left: "10%",
      right: "8%",
      top: "12%",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: areas,
      axisLabel: {
        rotate: 30, // 区名过长时可旋转
        color: "#7b8ca8",
        fontSize: 11,
        fontFamily: "Noto Sans SC",
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      show: false,
      max: maxVal * 1.1,
    },
    series: [
      // 背景柱（每个柱子后面的灰色背景）
      {
        type: "bar",
        barWidth: 12,
        barGap: "-100%",
        data: areas.map(() => maxVal * 1.1),
        itemStyle: {
          color: "rgba(0,224,255,0.06)",
          borderRadius: [4, 4, 0, 0],
        },
        silent: true,
      },
      // 前景柱（渐变，方向从上到下）
      {
        type: "bar",
        barWidth: 12,
        data: values,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0,224,255,0.8)" },
            { offset: 1, color: "rgba(0,224,255,0.15)" },
          ]),
        },
        label: {
          show: true,
          position: "top",
          color: "#00e0ff",
          fontSize: 11,
          fontFamily: "Orbitron",
          formatter: "{c}万",
        },
      },
    ],
    animationDuration: 1500,
    animationEasing: "cubicOut",
  });

  // 根据当前方向选择配置
  const currentOption =
    orientation === "horizontal" ? getHorizontalOption() : getVerticalOption();

  return (
    // 在BaseChart外面包一层，然后点击整个图表区域都会触发点击事件
    // <div
    //   onClick={toggleOrientation}
    //   style={{ cursor: "pointer", width: "100%", height: "100%" }}
    // >
      <BaseChart
        option={currentOption}
        onEvents={{
          click: toggleOrientation, // 点击图表任意位置切换
        }}
      />
    // </div>
    // <ReactECharts option={option} />;
  );
};
