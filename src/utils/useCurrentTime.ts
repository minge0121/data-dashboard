// 当前时间Hook，用于获取和显示格式化的当前时间
import { useEffect, useMemo, useState } from "react";

/**
 * 格式化当前时间
 * @param date 日期对象
 * @returns 格式化后的时间字符串，格式为：周X YYYY-MM-DD HH:MM:SS
 */
const formatCurrentTime = (date: Date) => {
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

/**
 * 当前时间Hook
 * 用于获取和显示格式化的当前时间，每秒自动更新
 * @returns 格式化后的当前时间字符串
 */
export const useCurrentTime = () => {
  // 状态存储当前日期对象，初始值为当前时间
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // 设置定时器，每秒更新一次当前时间
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    // 组件卸载时清除定时器，避免内存泄漏
    return () => window.clearInterval(timer);
  }, []); // 空依赖数组，确保只执行一次

  // 使用useMemo缓存格式化后的时间字符串，只有当now变化时才重新计算
  return useMemo(() => formatCurrentTime(now), [now]);
};
