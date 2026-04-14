// 当前时间Hook，用于获取和显示格式化的当前时间
import { useEffect, useState } from "react";
import { formatCurrentTime } from "@/utils/format.ts";

/**
 * 当前时间Hook
 * 用于获取和显示格式化的当前时间，每秒自动更新
 * @returns 格式化后的当前时间字符串
 */
export function useCurrentTime() : string{
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
  return formatCurrentTime(now);
};
