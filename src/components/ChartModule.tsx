// 模块容器组件（带标题的卡片）
export function ChartModule({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`tech-card p-3 flex flex-col overflow-hidden ${className}`}>
      <div className="module-title mb-3 flex-shrink-0">{title}</div>
      <div className="flex-1 min-h-0 relative">{children}</div>
    </div>
  );
}
