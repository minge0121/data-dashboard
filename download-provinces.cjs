const https = require('https');
const fs = require('fs');
const path = require('path');

// 配置
const OUTPUT_DIR = path.join(__dirname, 'public', 'geojson'); // 保存 GeoJSON 文件的目录 /public/geojson/
const DELAY_MS = 500;
const PROVINCE_LIST_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';

// 确保目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 封装 HTTPS GET 请求为 Promise
function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 延时函数
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 下载单个省份文件
async function downloadProvince(adcode, name) {
  const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`;
  const filePath = path.join(OUTPUT_DIR, `${adcode}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`⏭️  跳过已存在: ${name} (${adcode})`);
    return;
  }

  try {
    const data = await getJSON(url);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ 下载成功: ${name} (${adcode})`);
  } catch (error) {
    console.error(`❌ 下载失败: ${name} (${adcode}) - ${error.message}`);
  }
}

async function main() {
  console.log('🚀 开始获取省级列表...');
  try {
    const nationalData = await getJSON(PROVINCE_LIST_URL);
    const features = nationalData.features;

    const provinces = features
      .filter(f => f.properties.level === 'province')
      .map(f => ({
        adcode: f.properties.adcode,
        name: f.properties.name
      }));

    console.log(`📋 共找到 ${provinces.length} 个省级行政区\n`);

    for (let i = 0; i < provinces.length; i++) {
      const { adcode, name } = provinces[i];
      await downloadProvince(adcode, name);
      if (i < provinces.length - 1) await sleep(DELAY_MS);
    }

    console.log('\n🎉 所有省份下载完成！');
    console.log(`📁 文件保存在: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('❌ 获取省份列表失败:', error.message);
  }
}

main();