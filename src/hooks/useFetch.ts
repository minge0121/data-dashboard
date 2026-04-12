// // 替换掉 const INDICATORS = [...] 
// const [indicators, setIndicators] = useState<IndicatorData[]>([]);

// useEffect(() => {
//   fetch('/api/indicators')
//     .then(res => res.json())
//     .then(data => setIndicators(data));
// }, []);

// // 加上轮询：每5秒刷新一次
// useEffect(() => {
//   const timer = setInterval(() => {
//     fetch('/api/indicators')
//       .then(res => res.json())
//       .then(data => setIndicators(data));
//   }, 5000);
//   return () => clearInterval(timer);
// }, []);