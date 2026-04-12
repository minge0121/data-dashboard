import React, { useEffect, useRef } from "react";
import { EChartsUtils, echarts } from "@utils/echartsConfig";
import type { EChartsOption } from "@utils/echartsConfig";

interface EChartsProps {
  option: EChartsOption;
  width?: string | number;
  height?: string | number;
  loading?: boolean;
  theme?: string;
  onEvents?: Record<string, (params: unknown) => void>; // 新增事件映射，支持点击事件等
}

const BaseChart: React.FC<EChartsProps> = ({
  option,
  loading = false,
  theme,
  onEvents = {}, // 默认空对象
}) => {
  // 获取真实 DOM （不能直接手动操作真实DOM，因为React虚拟DOM机制，React下次渲染可能覆盖真实DOM）
  const chartRef = useRef<HTMLDivElement>(null);
  // 存 ECharts 实例
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  // 用于记录当前已绑定的事件名，方便解绑
  const boundEventsRef = useRef<Set<string>>(new Set());

  // 初始化 + 销毁（只执行一次）
  // 执行顺序：
  // 1. 组件函数体执行 → chartRef 创建，但 .current 是 null
  // 2. React 把 <div ref={chartRef}> 渲染到页面
  // 3. useEffect 回调执行 → chartRef.current 有值了，可以初始化 ECharts
  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    // 主题是在初始化时绑定，切换主题：销毁旧图表 → 用新主题重新初始化 → 重新 setOption
    //
    const chartInstance = EChartsUtils.init(chartRef.current, theme);
    chartInstanceRef.current = chartInstance;

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    // 变量保存ref.current，以闭包形式在return中使用,避免ESLint检测报错。虽然直接在return中使用ref.current也可以。
    const boundEvents = boundEventsRef.current;

    return () => {
      window.removeEventListener("resize", handleResize);
      // 销毁实例时，ECharts 会自动清理其内部事件，但为了严谨，手动清空记录
      boundEvents?.clear();
      // 关键：销毁实例，防止内存泄漏
      EChartsUtils.dispose(chartInstance);
      chartInstanceRef.current = null;
    };
  }, [theme]); // 在挂载后执行一次。在theme变化时也执行一次

  // option 变化时更新图表
  // 增加loading状态，避免图表更新时显示空白区域
  useEffect(() => {
    const instance = chartInstanceRef.current;
    if (!instance) return;

    if (loading) {
      instance.showLoading();
    } else {
      instance.hideLoading();
      // notMerge: true 表示不合并旧配置，直接替换（避免残留）
      instance.setOption(option, { notMerge: true });
    }
  }, [option, loading]); // 在挂载后执行一次。在option或loading变化时也执行一次

  // 处理事件绑定/解绑
  useEffect(() => {
    const instance = chartInstanceRef.current;
    if (!instance) return;

    // 获取当前props中的事件名列表
    const newEventNames = Object.keys(onEvents);
    const oldEventNames = Array.from(boundEventsRef.current);

    // 解绑已移除的事件监听
    oldEventNames.forEach((eventName) => {
      if (!onEvents[eventName]) {
        // 移除 ECharts 实例上真实的事件监听器，避免回调函数继续被触发
        instance.off(eventName);
        // 从内部记录集合中删除事件名，保持 boundEventsRef 与当前实际绑定状态一致
        boundEventsRef.current.delete(eventName);
      }
    });

     // 添加新增或变更的事件
    newEventNames.forEach((eventName) => {
      const handler = onEvents[eventName];
      if (handler && !boundEventsRef.current.has(eventName)) {
        // 用户点击图表时，ECharts会根据点击坐标构造事件参数对象，再调用事件函数
        // 所以：只要ECharts实例被正确初始化，注册事件回调后，点击就能自动触发
        instance.on(eventName, handler);
        boundEventsRef.current.add(eventName);
      } else if (handler && boundEventsRef.current.has(eventName)) {
        // 如果事件已绑定但回调函数可能变了，需要先解绑再绑定
        // 注意：这里只是简单起见，只解绑当前事件，不考虑其他事件的回调函数。 ---> 可以解绑所有再重绑，性能略差
        instance.off(eventName);
        instance.on(eventName, handler);
        // boundEventsRef 无需修改，仍然是这个事件名
      }
    });
  }, [onEvents]); // 依赖实例和事件配置

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default BaseChart;
