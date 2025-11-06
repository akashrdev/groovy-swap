import { useGetPortfolio } from "@/app/_hooks/use-get-portfolio";
import { round } from "@/app/_utils/numbers/round";
import { StatItem } from "../stat-item";

export interface Stat {
  label: string;
  value: string | number;
}

export const StatsSection = () => {
  const { maxHolding, totalUsdBalance, numberTokensOwned, isLoading } =
    useGetPortfolio();
  const formattedUsdTotal = round(totalUsdBalance);
  const formattedLargestHoldingValue = round(maxHolding.usdValue);

  const userStats: Stat[] = [
    { label: "Total value", value: `$${formattedUsdTotal}` },
    { label: "Total tokens", value: numberTokensOwned },
    { label: "Largest holding", value: maxHolding.name },
    {
      label: "Largest holding value",
      value: `$${formattedLargestHoldingValue}`
    }
  ];

  const isEmptyWallet = !isLoading && numberTokensOwned === 0;

  return (
    <div className="flex text-center justify-evenly items-start w-full overflow-x-auto">
      {userStats.map((stat) => {
        return <StatItem key={stat.label} stat={stat} />;
      })}
      {isEmptyWallet && (
        <span className="font-semibold text-sm">No tokens found</span>
      )}
    </div>
  );
};
