import { round } from "@/app/utils/numbers/round";
import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import { useWallet } from "@solana/wallet-adapter-react";

export const ProfileContentOverview = ({
  totalUsdBalance,
  totalTokensOwned,
  largestHolding,
  largestHoldingValue,
}: {
  totalUsdBalance: number;
  totalTokensOwned: number;
  largestHolding: string;
  largestHoldingValue: number;
}) => {
  const { publicKey } = useWallet();
  const abbreviatedPubkey = abbreviate(publicKey);
  const formattedUsdTotal = round(totalUsdBalance);
  const formattedLargestHoldingValue = round(largestHoldingValue);

  const userStats = [
    { label: "Total value", value: `$${formattedUsdTotal}` },
    { label: "Total tokens", value: totalTokensOwned },
    { label: "Largest holding", value: largestHolding },
    { label: "Largest holding value", value: formattedLargestHoldingValue },
  ];

  return (
    <div className="w-full min-h-24 justify-between flex py-4 border-b border-b-secondary-border flex-col items-center gap-2">
      <span className="font-semibold">{abbreviatedPubkey}</span>
      <div className="flex text-center justify-evenly items-start w-full overflow-x-auto">
        {userStats.map((stat) => {
          return (
            <div key={stat.label} className="flex flex-col">
              <span className="text-white/60">{stat.label}</span>
              <span>{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
