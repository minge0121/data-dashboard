import BaseChart from "@/components/BaseChart";
import { echarts } from "@/utils/echartsConfig";
import type { EChartsOption } from "@/utils/echartsConfig";
import { areaChartData } from "@/data/mock";

const AreaChartViewBoard = () => {
  const { trafficFlow, yesterdayFlow } = areaChartData;
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`,
  );

  const options: EChartsOption = {
    tooltip: {
      //  提示框
      trigger: "axis", // 触发方式为“坐标轴”,当鼠标移动到图表的数据区域时，会显示该坐标轴上所有系列的数据（即同时显示今日和昨日的数值）
      backgroundColor: "rgba(6,13,31,0.9)",
      borderColor: "rgba(0,224,255,0.2)",
      textStyle: { color: "#e8edf3", fontSize: 12 },
      // 当 tooltip 没有写 formatter 时，ECharts 会自动生成一个“默认格式”的提示框内容
      // “默认格式”:
      //    第一行：X 轴的刻度标签（如果是类目轴）或数值（如果是数值轴）
      //    后续行：每个系列的名称 + 对应的数值    
    },
    legend: { //  图例
      top: 0, //  图例距离顶部的距离
      right: 0, //  图例距离右侧的距离  ==> top + right 就是指该图例位于图表容器右上角
      textStyle: { color: "#7b8ca8", fontSize: 15 },
      itemWidth: 24, //  图例项的宽度
      itemHeight: 2, //  图例项的高度   ==> 当前是折线图，通常显示为线条样式
    },
    grid: { left: "8%", right: "4%", top: "14%", bottom: "10%" }, //  绘图区域（坐标系）的边界，图表主区域距离容器四边的百分比边距
    xAxis: {
      type: "category", // 类目轴
      data: hours, // 类目轴的数据
      boundaryGap: false, // 折线图从坐标轴起点开始绘制，不留两侧空白，使曲线紧贴边缘（常用于时间序列）
      axisLine: { lineStyle: { color: "rgba(0,224,255,0.1)" } }, // 轴线
      axisTick: { show: false }, // 刻度线：隐藏
      axisLabel: {
        color: "#7b8ca8",
        fontSize: 10,
        interval: 2, // 每隔2个显示一个标签，避免拥挤
      },
    },
    yAxis: {
      type: "value", // 数值轴
      splitLine: { lineStyle: { color: "rgba(0,224,255,0.06)" } }, // 分割线（网格线），此处设置颜色极淡（透明度 0.06），几乎不可见
      axisLabel: { color: "#7b8ca8", fontSize: 10 },
      axisLine: { show: false }, // 轴线：隐藏
      axisTick: { show: false }, // 刻度线：隐藏
    },
    // 系列（数据）：数组中有两个数据表示两条折线图（type: "line"）
    series: [
      {
        name: "今日", // 在图例（legend）中显示的名称
        type: "line", // 折线图
        smooth: true, // 平滑曲线
        symbol: "none", // 不显示数据点标记（只显示线条）
        lineStyle: { color: "#00e0ff", width: 2 }, // 线条样式：青色 #00e0ff，宽度 2px。
        areaStyle: { // 面积填充：从上到下的渐变
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 参数 (0, 0, 0, 1) 表示垂直渐变（从上到下，x=0, y=0 → x=0, y=1）
            { offset: 0, color: "rgba(0,224,255,0.3)" }, // 起始点（offset 0）透明度 0.3
            { offset: 1, color: "rgba(0,224,255,0.01)" } // 结束点（offset 1）透明度 0.01，接近透明
          ])
        },
        data: trafficFlow, // 数据数组，长度应与 hours （xAxis.data） 一致
      },
      {
        name: "昨日",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { color: "rgba(0,224,255,0.25)", width: 1, type: "dashed" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(0,224,255,0.05)" },
            { offset: 1, color: "rgba(0,224,255,0.0)" },
          ]),
        },
        data: yesterdayFlow,
      },
    ],
    animationDuration: 2000, // 初始动画时长 2000 毫秒（2 秒），图表会以动画形式逐渐绘制出来
  };

  return (
    <div className="w-full h-full">
      <BaseChart option={options} />
    </div>
  );
};

export default AreaChartViewBoard;
