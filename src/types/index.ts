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

// ------ 地图下钻相关类型 ------ //
// types/index.ts
import type { EChartsOption as OriginalEChartsOption } from "echarts";

// 重新导出echarts类型
export type EChartsOption = OriginalEChartsOption;

// 地图数据相关类型
export interface MapFeatureProperties {
  adcode: string | number;
  name: string;
  level: string;
  parent?: {
    adcode: string | number;
  };
  [key: string]: unknown;
}

export interface MapFeature {
  type: "Feature";
  properties: MapFeatureProperties;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][][] | number[][][];
  };
}

export interface GeoJsonData {
  type: "FeatureCollection";
  features: MapFeature[];
}

// 组件Props类型
export interface BaseChartProps {
  option: EChartsOption;
  width?: string | number;
  height?: string | number;
  loading?: boolean;
  theme?: string;
  onEvents?: Record<string, (params: unknown) => void>;
  className?: string;
}

export interface MapChartProps {
  width?: string | number;
  height?: string | number;
  onRegionSelect?: (regionName: string, regionLevel: number, regionData: unknown) => void;
  theme?: string;
}

// 统计数据类型（参考2024年实际数据）
export interface ProvinceStat {
  name: string;
  gdp2024: number; // 亿元
  gdpGrowth: number; // %
  population: number; // 万人
  primaryIndustry: number; // 第一产业占比 %
  secondaryIndustry: number; // 第二产业占比 %
  tertiaryIndustry: number; // 第三产业占比 %
}

// 导出统计数据（可选，用于真实数据展示）
export const PROVINCE_STATS_2024: ProvinceStat[] = [
  { name: "广东", gdp2024: 141633.81, gdpGrowth: 3.5, population: 12780, primaryIndustry: 4.1, secondaryIndustry: 40.1, tertiaryIndustry: 55.8 },
  { name: "江苏", gdp2024: 137008, gdpGrowth: 5.8, population: 8526, primaryIndustry: 3.4, secondaryIndustry: 44.3, tertiaryIndustry: 52.3 },
  { name: "山东", gdp2024: 98566, gdpGrowth: 5.7, population: 10162, primaryIndustry: 7.1, secondaryIndustry: 39.3, tertiaryIndustry: 53.6 },
  { name: "浙江", gdp2024: 90100, gdpGrowth: 5.5, population: 6670, primaryIndustry: 2.8, secondaryIndustry: 40.4, tertiaryIndustry: 56.8 },
  // ... 其他省份数据
];