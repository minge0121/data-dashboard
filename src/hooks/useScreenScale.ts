import { useState, useEffect } from "react";

interface ScaleResult {
  scale: number;
  offset: { x: number; y: number };
  screenW: number;
  screenH: number;
}

// 屏幕缩放Hook
export function useScreenScale(
  designW: number,
  designH: number,
  minScale: number,
): ScaleResult {
  const [result, setResult] = useState<ScaleResult>({
    scale: 1,
    offset: { x: 0, y: 0 },
    screenW: designW,
    screenH: designH,
  });

  useEffect(() => {
    function calc() {
      // 分别算横向和纵向的缩放比
      const sw = window.innerWidth;
      const sh = window.innerHeight;

      // 取高度和宽度的较小值（保证内容不溢出）
      let s = Math.min(sw / designW, sh / designH);

      // 确保缩放比例不低于最小值
      s = Math.max(s, minScale);

      // 后续可考虑最小和最大屏幕尺寸限制

      // 计算偏移量（让内容在屏幕正中间）
      setResult({
        scale: s,
        offset: {
          x: (sw - designW * s) / 2,
          y: (sh - designH * s) / 2,
        },
        screenW: sw,
        screenH: sh,
      });
    }
    // 初始化一次
    calc();

    window.addEventListener("resize", calc); // 窗口变化时重新计算
    return () => window.removeEventListener("resize", calc);
  }, [designW, designH, minScale]);

  // 返回缩放比例和偏移量
  return result;
}
