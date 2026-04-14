// 模拟数据
import type { IndicatorData } from "@/types/index";

// 指标数据
export const indicators: IndicatorData[] = [
  {
    label: "GDP",
    value: 141260,
    unit: "亿元",
    trend: "up",
    trendValue: "+2.5%",
    color: "#00e0ff",
  },
  {
    label: "交通流量",
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
