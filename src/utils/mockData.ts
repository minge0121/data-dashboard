// 模拟数据

// ========== 基础类型定义 ==========
export interface ProvinceGDP2025 {
  name: string;
  gdp: number; // 亿元
  rank: number;
}

export interface IndustryRatio2025 {
  name: string;
  value: number; // 百分比
}

export interface PopulationTrend2025 {
  year: string;
  value: number; // 万人
}

export interface SafetyIndicator2025 {
  name: string;
  value: number; // 0-100分
  max: number;
}

export interface RegionData2025 {
  // 柱形图：GDP数据
  gdpRanking: ProvinceGDP2025[];
  // 饼图：产业占比
  industryRatio: IndustryRatio2025[];
  // 折线图：人口趋势（近5年）
  populationTrend: PopulationTrend2025[];
  // 雷达图：安全指标
  safetyIndicators: SafetyIndicator2025[];
}

// ========== 全国数据（2025年统计） ==========
export const NATIONAL_DATA_2025: RegionData2025 = {
  // GDP排名前7省份（2025年预测数据，单位：亿元）
  gdpRanking: [
    { name: "广东", gdp: 145000, rank: 1 },
    { name: "江苏", gdp: 142000, rank: 2 },
    { name: "山东", gdp: 102000, rank: 3 },
    { name: "浙江", gdp: 95000, rank: 4 },
    { name: "四川", gdp: 68000, rank: 5 },
    { name: "河南", gdp: 65000, rank: 6 },
    { name: "湖北", gdp: 62000, rank: 7 },
  ],
  
  // 全国产业占比（2025年）
  industryRatio: [
    { name: "高新技术", value: 28.5 },
    { name: "金融服务", value: 18.2 },
    { name: "现代物流", value: 15.8 },
    { name: "文化旅游", value: 12.3 },
    { name: "其他产业", value: 25.2 },
  ],
  
  // 全国人口趋势（万人）
  populationTrend: [
    { year: "2021", value: 141260 },
    { year: "2022", value: 141175 },
    { year: "2023", value: 140967 },
    { year: "2024", value: 140828 },
    { year: "2025", value: 140650 },
  ],
  
  // 全国安全指标（2025年，百分制）
  safetyIndicators: [
    { name: "治安管理", value: 92, max: 100 },
    { name: "交通安全", value: 88, max: 100 },
    { name: "消防安全", value: 90, max: 100 },
    { name: "食品安全", value: 85, max: 100 },
    { name: "环境安全", value: 78, max: 100 },
    { name: "网络安全", value: 82, max: 100 },
  ],
};

// ========== 省市数据生成器 ==========
export interface CityGDP2025 {
  name: string;
  gdp: number;
  rank: number;
  parentProvince: string;
}

// 省级下辖各市数据映射
export const PROVINCE_CITIES_DATA_MAP_2025: Record<string, RegionData2025> = {
  "广东": {
    // 必须是该省7个市的GDP排名，不是全省单一GDP
    gdpRanking: [
      { name: "深圳", gdp: 36800, rank: 1 },
      { name: "广州", gdp: 31500, rank: 2 },
      { name: "佛山", gdp: 13300, rank: 3 },
      { name: "东莞", gdp: 12200, rank: 4 },
      { name: "惠州", gdp: 5400, rank: 5 },
      { name: "珠海", gdp: 4300, rank: 6 },
      { name: "江门", gdp: 3800, rank: 7 },
    ],
    // 该省整体产业占比
    industryRatio: [
      { name: "高新技术", value: 35.2 },
      { name: "金融服务", value: 22.1 },
      { name: "现代物流", value: 18.5 },
      { name: "文化旅游", value: 8.3 },
      { name: "其他产业", value: 15.9 },
    ],
    // 该省整体人口趋势
    populationTrend: [
      { year: "2021", value: 12684 },
      { year: "2022", value: 12656 },
      { year: "2023", value: 12706 },
      { year: "2024", value: 12780 },
      { year: "2025", value: 12850 },
    ],
    // 该省整体安全指标
    safetyIndicators: [
      { name: "治安管理", value: 94, max: 100 },
      { name: "交通安全", value: 91, max: 100 },
      { name: "消防安全", value: 93, max: 100 },
      { name: "食品安全", value: 89, max: 100 },
      { name: "环境安全", value: 82, max: 100 },
      { name: "网络安全", value: 88, max: 100 },
    ],
  },
  // ... 其他省份
};

// 省级数据映射（部分主要省份2025年预测数据）
export const PROVINCE_DATA_MAP_2025: Record<string, RegionData2025> = {
  "广东": {
    gdpRanking: [{ name: "广东", gdp: 145000, rank: 1 }], // 自身GDP
    industryRatio: [
      { name: "高新技术", value: 35.2 },
      { name: "金融服务", value: 22.1 },
      { name: "现代物流", value: 18.5 },
      { name: "文化旅游", value: 8.3 },
      { name: "其他产业", value: 15.9 },
    ],
    populationTrend: [
      { year: "2021", value: 12684 },
      { year: "2022", value: 12656 },
      { year: "2023", value: 12706 },
      { year: "2024", value: 12780 },
      { year: "2025", value: 12850 },
    ],
    safetyIndicators: [
      { name: "治安管理", value: 94, max: 100 },
      { name: "交通安全", value: 91, max: 100 },
      { name: "消防安全", value: 93, max: 100 },
      { name: "食品安全", value: 89, max: 100 },
      { name: "环境安全", value: 82, max: 100 },
      { name: "网络安全", value: 88, max: 100 },
    ],
  },
  "江苏": {
    gdpRanking: [{ name: "江苏", gdp: 142000, rank: 1 }],
    industryRatio: [
      { name: "高新技术", value: 32.8 },
      { name: "金融服务", value: 19.5 },
      { name: "现代物流", value: 17.2 },
      { name: "文化旅游", value: 11.5 },
      { name: "其他产业", value: 19.0 },
    ],
    populationTrend: [
      { year: "2021", value: 8505 },
      { year: "2022", value: 8515 },
      { year: "2023", value: 8526 },
      { year: "2024", value: 8536 },
      { year: "2025", value: 8545 },
    ],
    safetyIndicators: [
      { name: "治安管理", value: 95, max: 100 },
      { name: "交通安全", value: 92, max: 100 },
      { name: "消防安全", value: 94, max: 100 },
      { name: "食品安全", value: 91, max: 100 },
      { name: "环境安全", value: 85, max: 100 },
      { name: "网络安全", value: 90, max: 100 },
    ],
  },
  "山东": {
    gdpRanking: [{ name: "山东", gdp: 102000, rank: 1 }],
    industryRatio: [
      { name: "高新技术", value: 24.5 },
      { name: "金融服务", value: 15.2 },
      { name: "现代物流", value: 16.8 },
      { name: "文化旅游", value: 14.2 },
      { name: "其他产业", value: 29.3 },
    ],
    populationTrend: [
      { year: "2021", value: 10170 },
      { year: "2022", value: 10162 },
      { year: "2023", value: 10122 },
      { year: "2024", value: 10080 },
      { year: "2025", value: 10050 },
    ],
    safetyIndicators: [
      { name: "治安管理", value: 91, max: 100 },
      { name: "交通安全", value: 87, max: 100 },
      { name: "消防安全", value: 89, max: 100 },
      { name: "食品安全", value: 86, max: 100 },
      { name: "环境安全", value: 80, max: 100 },
      { name: "网络安全", value: 84, max: 100 },
    ],
  },
  "浙江": {
    gdpRanking: [{ name: "浙江", gdp: 95000, rank: 1 }],
    industryRatio: [
      { name: "高新技术", value: 38.5 },
      { name: "金融服务", value: 21.8 },
      { name: "现代物流", value: 16.2 },
      { name: "文化旅游", value: 13.5 },
      { name: "其他产业", value: 10.0 },
    ],
    populationTrend: [
      { year: "2021", value: 6540 },
      { year: "2022", value: 6577 },
      { year: "2023", value: 6627 },
      { year: "2024", value: 6670 },
      { year: "2025", value: 6720 },
    ],
    safetyIndicators: [
      { name: "治安管理", value: 93, max: 100 },
      { name: "交通安全", value: 90, max: 100 },
      { name: "消防安全", value: 92, max: 100 },
      { name: "食品安全", value: 90, max: 100 },
      { name: "环境安全", value: 88, max: 100 },
      { name: "网络安全", value: 91, max: 100 },
    ],
  },
  // 可以继续添加其他省份...
};

// ========== 数据获取函数 ==========

export const getRegionData = (
  regionName: string, 
  regionLevel: number
): RegionData2025 => {
  // 全国级别
  if (regionLevel === 0 || regionName === "全国") {
    return NATIONAL_DATA_2025;
  }
  
  // 省级：关键修复！必须使用 PROVINCE_CITIES_DATA_MAP_2025 而非 PROVINCE_DATA_MAP_2025
  if (regionLevel === 1) {
    // 修复：使用下辖各市的数据映射
    if (PROVINCE_CITIES_DATA_MAP_2025[regionName]) {
      return PROVINCE_CITIES_DATA_MAP_2025[regionName];  // 返回该省7个市的数据
    }
    // 如果没有预定义，生成模拟的各市数据
    return generateProvinceCitiesData(regionName);
  }
  
  // 市级：返回单一城市数据
  if (regionLevel === 2) {
    return generateCityData(regionName, regionName);
  }
  
  return NATIONAL_DATA_2025;
};

// 新增：为未定义省份生成下辖各市模拟数据
const generateProvinceCitiesData = (provinceName: string): RegionData2025 => {
  const seed = provinceName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseGDP = 30000 + (seed % 70000);
  
  // 生成7个模拟城市
  const cityNames = ["A市", "B市", "C市", "D市", "E市", "F市", "G市"].map(
    (_, i) => `${provinceName.slice(0, 2)}${String.fromCharCode(65 + i)}市`
  );
  
  return {
    gdpRanking: cityNames.map((name, i) => ({
      name,
      gdp: Math.round(baseGDP * (0.35 - i * 0.04) * (0.9 + Math.random() * 0.2)),
      rank: i + 1,
    })),
    industryRatio: [
      { name: "高新技术", value: 20 + (seed % 20) },
      { name: "金融服务", value: 15 + (seed % 15) },
      { name: "现代物流", value: 12 + (seed % 12) },
      { name: "文化旅游", value: 10 + (seed % 15) },
      { name: "其他产业", value: 20 + (seed % 15) },
    ],
    populationTrend: [
      { year: "2021", value: 4000 + (seed % 6000) },
      { year: "2022", value: 4050 + (seed % 6000) },
      { year: "2023", value: 4100 + (seed % 6000) },
      { year: "2024", value: 4150 + (seed % 6000) },
      { year: "2025", value: 4200 + (seed % 6000) },
    ],
    safetyIndicators: [
      { name: "治安管理", value: 75 + (seed % 20), max: 100 },
      { name: "交通安全", value: 70 + (seed % 25), max: 100 },
      { name: "消防安全", value: 72 + (seed % 23), max: 100 },
      { name: "食品安全", value: 68 + (seed % 27), max: 100 },
      { name: "环境安全", value: 65 + (seed % 30), max: 100 },
      { name: "网络安全", value: 70 + (seed % 25), max: 100 },
    ],
  };
};

// 市级数据生成器（基于省级数据生成近似值）
const generateCityData = (provinceName: string, cityName: string): RegionData2025 => {
  const provinceData = PROVINCE_DATA_MAP_2025[provinceName] || NATIONAL_DATA_2025;
  const ratio = 0.15 + Math.random() * 0.25; // 市级占省级15%-40%
  
  return {
    gdpRanking: [{ 
      name: cityName, 
      gdp: Math.round(provinceData.gdpRanking[0].gdp * ratio), 
      rank: 1 
    }],
    industryRatio: provinceData.industryRatio.map(item => ({
      name: item.name,
      value: Math.round(item.value * (0.8 + Math.random() * 0.4) * 10) / 10,
    })),
    populationTrend: provinceData.populationTrend.map(item => ({
      year: item.year,
      value: Math.round(item.value * ratio * 10) / 10,
    })),
    safetyIndicators: provinceData.safetyIndicators.map(item => ({
      name: item.name,
      value: Math.min(100, Math.round(item.value + (Math.random() - 0.5) * 10)),
      max: 100,
    })),
  };
};