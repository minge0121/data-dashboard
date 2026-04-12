import { useScreenScale } from "@/hooks/useScreenScale";

// 设计稿尺寸 —— 所有内容都基于这个尺寸编写
const DESIGN_W = 1920;
const DESIGN_H = 1080;

// 最小和最大屏幕尺寸限制
// const MIN_WIDTH = 1200;
// const MAX_WIDTH = 4096;

// 最小缩放比例，确保内容不会太小
const MIN_SCALE = 0.3; // 0.3：行业通用、视觉安全、体验最好

// 大屏标准布局：全屏、无滚动、相对定位（方便图表绝对定位）
const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
  const { scale, offset, screenW, screenH } = useScreenScale(
    DESIGN_W,
    DESIGN_H,
    MIN_SCALE,
  );

  return (
    <>
      {/* 视口：固定占满屏幕 */}
      <div className="scale-viewport">
        {/* 缩放容器：固定设计稿尺寸，通过 transform 缩放 */}
        <div
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "0 0", // 从左上角开始缩放（关键！）
            position: "absolute",
            left: offset.x,
            top: offset.y,
            overflow: "hidden",
          }}
        >
          {/* 可以放全局头部、公共边框、水印、返回按钮等 */}
          {children}
        </div>
      </div>
      {/* 屏幕信息角标（调试用，上线可删除） */}
      <div className="screen-info-badge">
        {screenW}×{screenH} | scale: {scale.toFixed(3)}
      </div>
    </>
  );
};

export default ScreenLayout;
