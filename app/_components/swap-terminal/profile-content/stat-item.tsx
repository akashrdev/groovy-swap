import { Skeleton } from "../../common/skeleton";
import { Stat } from "./stats-section";

export const StatItem = ({
  stat,
  isLoading
}: {
  stat: Stat;
  isLoading: boolean;
}) => {
  return (
    <div key={stat.label} className="flex flex-col items-center">
      <span className="text-white/60 sm:text-sm text-xs">{stat.label}</span>
      {!isLoading ? (
        <span className="font-semibold sm:text-sm text-xs">{stat.value}</span>
      ) : (
        <Skeleton className="w-12 h-4 rounded-md" />
      )}
    </div>
  );
};
