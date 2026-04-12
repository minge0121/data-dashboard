// 模拟数据
import type { IndicatorData } from "@/types/index";

// 指标数据
export const indicators: IndicatorData[] = [
  {
    label: "城市人口总量",
    value: 12847632,
    unit: "人",
    trend: "up",
    trendValue: "+2.3%",
    color: "#00e0ff",
  },
  {
    label: "今日交通流量",
    value: 3456789,
    unit: "次",
    trend: "up",
    trendValue: "+5.7%",
    color: "#00e676",
  },
  {
    label: "空气质量指数",
    value: 42,
    unit: "AQI",
    trend: "down",
    trendValue: "-12%",
    color: "#ffab00",
  },
  {
    label: "能源消耗",
    value: 8765,
    unit: "MWh",
    trend: "down",
    trendValue: "-3.1%",
    color: "#ff5252",
  },
];

// 横向柱状图：各区域人口分布
export const barChartData: [string, number][] = [
  ["龙华区", 252],
  ["南山区", 198],
  ["福田区", 176],
  ["罗湖区", 142],
  ["宝安区", 385],
  ["龙岗区", 312],
];

// 环形图：产业结构占比
export const pieChartData: { value: number; name: string }[] = [
  { value: 35, name: "高新技术" },
  { value: 25, name: "金融服务" },
  { value: 20, name: "现代物流" },
  { value: 12, name: "文化旅游" },
  { value: 8, name: "其他产业" },
];

// 区域图(两个折线图)：模拟早晚交通流量趋势
export const areaChartData = {
  trafficFlow: [
    120, 85, 60, 45, 40, 55, 180, 420, 380, 290, 250, 230, 260, 240, 220, 280,
    350, 480, 390, 300, 250, 200, 170, 140,
  ],
  yesterdayFlow: [
    110, 80, 55, 42, 38, 50, 170, 400, 360, 280, 240, 220, 250, 230, 210, 270,
    340, 460, 370, 290, 240, 190, 160, 130,
  ],
};

// 雷达图：模拟城市安全评分
export const radarChartData: { name: string; max: number }[] = [
  { name: "治安管理", max: 100 },
  { name: "交通安全", max: 100 },
  { name: "消防安全", max: 100 },
  { name: "食品安全", max: 100 },
  { name: "环境安全", max: 100 },
  { name: "网络安全", max: 100 },
];

// 事件列表数据
export const eventsData: { time: string; type: string; content: string; level: string }[] = [
  {
    time: "14:32",
    type: "交通",
    content: "南山区深南大道发生轻微追尾，已处理",
    level: "info",
  },
  {
    time: "14:18",
    type: "环境",
    content: "福田区PM2.5浓度短时升高至75μg/m³",
    level: "warn",
  },
  {
    time: "13:55",
    type: "安防",
    content: "宝安区某社区消防通道被占用，已通知",
    level: "warn",
  },
  {
    time: "13:42",
    type: "能源",
    content: "龙华区光伏电站发电效率异常下降",
    level: "error",
  },
  {
    time: "13:30",
    type: "交通",
    content: "北环大道东行方向拥堵缓解，恢复畅通",
    level: "info",
  },
  {
    time: "13:15",
    type: "医疗",
    content: "罗湖区三甲医院门诊接诊量达峰值",
    level: "info",
  },
  {
    time: "12:58",
    type: "安防",
    content: "龙岗区某工地扬尘超标，已立案",
    level: "warn",
  },
  {
    time: "12:40",
    type: "能源",
    content: "全市电网负荷降至安全区间",
    level: "info",
  },
];
