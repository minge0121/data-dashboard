import { useState, useEffect } from "react";

// 数字滚动动画 Hook: 数字从 0 滚到目标值
// 1. 记录起始时间 startTime
// 2. 每一帧计算已经过去了多少时间 → 算出进度 0~1
// 3. 用缓动函数把进度映射成"看起来自然"的数字
// 4. 更新显示
export function useNumberAnimation(
  target: number,
  duration: number = 5000,
): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo 缓动：开始快，结尾慢，像刹车
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(target * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }
    // requestAnimationFrame: 在下次重绘之前执行一个回调函数，用来更新动画
    //                        回调的执行频率与屏幕刷新率保持同步，确保动画平滑且性能优化（不过度绘制）
    //                        在调用时自动生成并传入一个高精度时间戳作为回调函数的第一个参数
    rafId = requestAnimationFrame(tick);
    // 组件卸载时，取消动画
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return current;
}
