// 滚动事件列表
// 用 CSS animation 实现无缝滚动效果
import { eventsData } from "../data/mock";

export default function EventList() {
  const levelColor: Record<string, string> = {
    info: "#00e0ff",
    warn: "#ffab00",
    error: "#ff5252",
  };
  const levelLabel: Record<string, string> = {
    info: "一般",
    warn: "警告",
    error: "严重",
  };

  // 关键：把数据复制一份，实现无缝滚动
  // 正常列表： [A, B, C, D]
  // 复制后：   [A, B, C, D, A, B, C, D]
  //                     ↑原始       ↑复制
  // 滚动到 D 时，瞬间跳回开头的 A，视觉上看不出来因为内容一样
  const doubledEvents = [...eventsData,...eventsData];

  return (
    <div className="overflow-hidden flex-1 relative">
      <div className="scroll-list">
        {doubledEvents.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 py-2 border-b border-white/5 text-xs"
          >
            <span className="text-muted whitespace-nowrap font-display text-[10px] mt-0.5">
              {item.time}
            </span>
            <span
              className="whitespace-nowrap px-1.5 py-0.5 rounded text-[10px]"
              style={{
                color: levelColor[item.level],
                background: levelColor[item.level] + "15",
              }}
            >
              {levelLabel[item.level]}
            </span>
            <span className="text-black/80 leading-relaxed">
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
