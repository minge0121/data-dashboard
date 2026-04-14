/**
 * 格式化当前时间
 * @param date 日期对象
 * @returns 格式化后的时间字符串，格式为：周X YYYY-MM-DD HH:MM:SS
 */
export const formatCurrentTime = (date: Date) => {
  // 星期几的中文表示
  const weekday = ["日", "一", "二", "三", "四", "五", "六"];
  const year = date.getFullYear(); // 获取年份
  const month = `${date.getMonth() + 1}`.padStart(2, "0"); // 获取月份，补零
  const day = `${date.getDate()}`.padStart(2, "0"); // 获取日期，补零
  const hours = `${date.getHours()}`.padStart(2, "0"); // 获取小时，补零
  const minutes = `${date.getMinutes()}`.padStart(2, "0"); // 获取分钟，补零
  const seconds = `${date.getSeconds()}`.padStart(2, "0"); // 获取秒数，补零

  // 返回格式化后的时间字符串
  return `周${weekday[date.getDay()]} ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};