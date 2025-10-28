import { Stat } from "./stats-section";

export const StatItem = ({ stat }: { stat: Stat }) => {
  return (
    <div key={stat.label} className="flex flex-col items-center">
      <span className="text-white/60 sm:text-sm text-xs">{stat.label}</span>
      <span className="font-semibold sm:text-sm text-xs">{stat.value}</span>
    </div>
  );
};
