// 大屏内容: 图表、组件、业务代码
// 引入指标卡片区组件
import { IndicatorCardViewBorad } from "@/components/IndicatorCardViewBoard";
import { ChartModule } from "@/components/ChartModule";
import { BarChartViewBoard } from "@/components/BarChartViewBoard";
import { PieChartViewBoard } from "@/components/PieChartViewBoard";
import AreaChartViewBoard from "@/components/AreaChartViewBoard";
import RadarChartViewBoard from "@/components/RadarChartViewBoard";
import EventList from "@/components/EventListViewBoard";
// 引入hooks
import { useCurrentTime } from "@utils/useCurrentTime";

const ScreenContent = () => {
  // 获取当前时间
  const currentTime = useCurrentTime();

  return (
    // 主容器
    // h-screen、w-screen：视口高度、宽度。祖先明确可计算的高度、宽度 --> 子元素（图表容器）height:100%、width:100%才能生效
    <div className="screen-bg w-full h-full flex flex-col overflow-hidden">
      {/* 网格背景：两个渐变叠加成的一个淡淡的、科技感的方格网格线 */}
      {/* <div className="bg-[linear-gradient(rgba(8,22,45,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(8,22,45,0.2)_1px,transparent_1px)] bg-[length:48px_48px] pointer-events-none" /> */}
      {/* 边框效果 */}
      {/* <div className="border border-cyan-300/10 pointer-events-none" /> */}
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
              智 慧 城 市 数 据 监 控 中 心 大 屏 可 视 化 平 台
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
          <ChartModule title="各区域人口分布" className="h-full">
            {/* 柱状图 */}
            <BarChartViewBoard />
          </ChartModule>
          </div>
          <div className="col-span-12 md:col-span-3 md:[grid-area:2/1/3/4]">
          <ChartModule title="产业结构占比" className="h-full">
            {/* 环形图(饼图) */}
            <PieChartViewBoard />
          </ChartModule>
          </div>

        {/* 中列：占 6 列 */}
        <div className="col-span-12 md:col-span-6 md:[grid-area:1/4/3/10]">
          <ChartModule title="24小时交通流量趋势" className="h-full">
            {/* 两个折线图 */}
            <AreaChartViewBoard />
          </ChartModule>
          </div>

        {/* 右列：占 3 列 */}
        <div className="col-span-12 md:col-span-3 md:[grid-area:1/10/2/13]">
          <ChartModule title="城市安全评分" className="h-full">
            <RadarChartViewBoard />
          </ChartModule>
          </div>
          <div className="col-span-12 md:col-span-3 md:[grid-area:2/10/3/13]">
          <ChartModule title="实时事件监控" className="h-full overflow-hidden">
            <EventList />
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
