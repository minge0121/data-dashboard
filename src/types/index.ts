// 指标数据
export interface IndicatorData {
  label: string;
  value: number;
  unit: string;
  trend: "up" | "down";
  trendValue: string;
  color: string;
}

// 基础数据点
export interface DataPoint {
  name: string;
  value: number;
  // 可选的额外数据
  extra?: Record<string, unknown>;
}

// 时间序列数据（用于折线图）
export interface TimeSeriesData {
  dates: string[]; // x轴：时间
  values: number[]; // y轴：数值
  seriesName: string; // 系列名称
}

// 多系列数据（用于多折线/柱状图）
export interface MultiSeriesData {
  categories: string[]; // x轴分类
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

// 饼图数据
export interface PieData {
  name: string;
  value: number;
  selected?: boolean;
}

// 仪表盘数据
export interface GaugeData {
  value: number;
  name: string;
  min?: number;
  max?: number;
  unit?: string;
}

// 图表组件通用 Props
export interface ChartProps<T> {
  data: T;
  title?: string;
  loading?: boolean;
  height?: number | string;
  onClick?: (params: unknown) => void;
}

// 大屏布局数据
export interface DashboardData {
  salesTrend: TimeSeriesData; // 销售趋势
  categorySales: MultiSeriesData; // 品类销售对比
  regionDistribution: PieData[]; // 地区分布
  satisfaction: GaugeData; // 满意度
  realTimeOrders: DataPoint[]; // 实时订单
}
