// ECharts按需引入配置，优化打包体积
import * as echarts from "echarts/core";
import type { EChartsOption } from "echarts";

// import * as echarts from "echarts/core"
// → 精简核心（按需引）：按需引入专用（推荐！体积小、项目正式必须用），不包含任何图表、组件
// import * as echarts from "echarts"
// → 全家桶（全打包）： 全量引入（把所有图表、组件全部打包，体积超大，不推荐），只适合本地快速测试、开发，不适合上线项目

// echarts是： 图表本身 + 图表配件 = 图表

// 按需引入图表类型 （图本身）
// 想画什么图 → 从 charts 引
import {
  BarChart, // 柱状图   → 决定了 series.type = 'bar' 能生效
  LineChart, // 折线图
  PieChart, // 饼图
  ScatterChart, // 散点图
  EffectScatterChart, // 带有涟漪效果的散点图
  SunburstChart, // 旭日图
  GaugeChart, // 仪表盘图
  RadarChart, // 雷达图
  FunnelChart, // 漏斗图
  GraphChart, // 关系图
  TreeChart, // 树图
  TreemapChart, // 矩形树图
  HeatmapChart, // 热力图
  LinesChart, // 线图
  MapChart, // 地图
  CustomChart, // 自定义系列
} from "echarts/charts";

// 按需引入组件 （图表配件）
// 需要坐标轴、图例、提示、标题、网格 → 从 components 引
// （otpions）配置写了，组件没引 → 功能直接消失
import {
  GridComponent, // 网格组件     → 网格，用于展示图表数据的分类  →  options.grid 配置
  TooltipComponent, // 提示框组件   → 指针悬浮时显示提示框，显示提示信息  →  options.tooltip 配置
  LegendComponent, // 图例组件     → 图例，用于展示图表数据的分类  →  options.legend 配置
  TitleComponent, // 标题组件     → 标题  →  options.title 配置
  ToolboxComponent, // 工具栏组件
  DatasetComponent, // 数据集组件
  TransformComponent, // 数据转换组件
  MarkPointComponent, // 标记点组件
  MarkLineComponent, // 标记线组件
  MarkAreaComponent, // 标记区域组件
  DataZoomComponent, // 数据区域缩放组件
  VisualMapComponent, // 视觉映射组件
  TimelineComponent, // 时间轴组件
  CalendarComponent, // 日历组件
  GraphicComponent, // 图形组件
  AriaComponent, // 无障碍组件
} from "echarts/components";

// 按需引入渲染器
import {
  CanvasRenderer, // Canvas渲染器
  SVGRenderer, // SVG渲染器
} from "echarts/renderers";

// import + use = 给 ECharts 安装插件（安装一次）
// init = 打开画图工具（随时用，不用反复引入安装）

// 注册所有需要的图表类型
// 全局注册一次，终生使用
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  EffectScatterChart,
  SunburstChart,
  GaugeChart,
  RadarChart,
  FunnelChart,
  GraphChart,
  TreeChart,
  TreemapChart,
  HeatmapChart,
  LinesChart,
  MapChart,
  CustomChart,
]);

// 注册所有需要的组件
// 全局注册一次，终生使用
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  DatasetComponent,
  TransformComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  AriaComponent,
]);

// 注册渲染器（优先使用Canvas渲染器）
echarts.use([CanvasRenderer]);

/**
 * ECharts工具函数集合
 */
export const EChartsUtils = {
  /**
   * 初始化图表实例
   * @param dom DOM元素
   * @param renderer 渲染器类型
   * @returns ECharts实例
   * 注意：| 是TS的或运算符，而 || 是JS的或运算符
   */
  init: (
    dom: HTMLElement,
    themeName: string = "dark",
    renderer: "canvas" | "svg" = "canvas",
  ) => {
    return echarts.init(dom, themeName, { renderer });
  },

  /**
   * 连接多个图表实例，实现联动
   * @param instances 图表实例数组
   * 使用方式一：echarts.connect([instances1, instances2]);
   * 使用方式二（推荐）：echarts.connect("组名group");
   */
  // 使用方式一：
  // instances1、instances2 是ECharts.init后返回的图表实例
  // connect: (instances: echarts.ECharts[]) => {
  //   echarts.connect(instances);
  // },
  // 使用方式二：
  // 属性是group，而不是groupId
  // instances1.group = "组名group"
  // instances2.group = "组名group"
  connect: (group: string) => {
    return echarts.connect(group);
  },

  /**
   * 断开图表实例的联动
   * @param group 组ID
   */
  disconnect: (group: string) => {
    return echarts.disconnect(group);
  },

  /**
   * 获取当前主题配置
   * @returns 主题配置
   */
  getCurrentTheme: () => {
    return chartThemes.dark;
  },

  /**
   * 注册自定义主题
   * @param themeName 主题名称
   * @param theme 主题配置
   */
  registerTheme: (themeName: string, theme: object) => {
    echarts.registerTheme(themeName, theme);
  },

  dispose: (instance: echarts.ECharts) => {
    instance.dispose();
  },
};

export const chartThemes = {
  dark: {
    backgroundColor: "transparent",
    textStyle: {
      fontFamily:
        '"Rajdhani", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    },
    color: [
      "#7b6dff",
      "#4dd7ff",
      "#8effcb",
      "#ffd16c",
      "#ff6b6b",
      "#6effc8",
      "#5af7ff",
      "#85a9ff",
      "#d4a5ff",
      "#ffb3d9",
    ],
  },
  light: {
    backgroundColor: "#fff",
    textStyle: {
      fontFamily:
        '"Rajdhani", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    },
    color: [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
  },
};

// 注册默认主题
EChartsUtils.registerTheme("dark", chartThemes.dark);
EChartsUtils.registerTheme("light", chartThemes.light);

// 导出ECharts核心和类型
export { echarts };
export type { EChartsOption };

// 导出图表类型
export { BarChart };

// 导出组件
export { TitleComponent };

// 导出渲染器
export { CanvasRenderer, SVGRenderer };
