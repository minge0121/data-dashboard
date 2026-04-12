import { useNumberAnimation } from "@/hooks/useNumberAnimation";
import type { IndicatorData } from "@/types";

export function IndicatorCard({ data }: { data: IndicatorData }) {
      const animatedValue = useNumberAnimation(data.value, 2500);

      return (
        <div className="tech-card p-3 flex flex-col gap-2 relative overflow-hidden">
          {/* 背景装饰光点 */}
          <div
            className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${data.color}, transparent)` }}
          />
          <span className="text-muted text-xs font-body">{data.label}</span>
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-display text-2xl font-bold tracking-wider"
              style={{ color: data.color }}
            >
              {animatedValue.toLocaleString()}
            </span>
            <span className="text-muted text-xs">{data.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span
              className="inline-block w-0 h-0"
              style={{
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
                borderLeft: data.trend === 'up'
                  ? '5px solid #00e676'
                  : '5px solid #ff5252',
                transform: data.trend === 'down' ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
            <span style={{ color: data.trend === 'up' ? '#00e676' : '#ff5252' }}>
              {data.trendValue}
            </span>
            <span className="text-muted">较昨日</span>
          </div>
          {/* 底部色条 */}
          <div className="indicator-bar" style={{ '--bar-color': data.color } as React.CSSProperties} />
        </div>
      );
    }
