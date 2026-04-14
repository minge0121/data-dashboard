import { indicators } from "@/data/mock";
import { IndicatorCard } from "./IndicatorCard";

const IndicatorCardViewBorad = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {indicators.map((item, idx) => (
        <IndicatorCard key={idx} data={item} />
      ))}
    </div>
  );
};

export default IndicatorCardViewBorad;
