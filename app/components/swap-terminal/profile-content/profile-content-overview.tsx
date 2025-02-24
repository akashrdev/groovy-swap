import { round } from "@/app/utils/numbers/round";
import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolscanButton } from "../../buttons/solscan-button";

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
  const isEmptyWallet = totalTokensOwned === 0;

  const userStats = [
    { label: "Total value", value: `$${formattedUsdTotal}` },
    { label: "Total tokens", value: totalTokensOwned },
    { label: "Largest holding", value: largestHolding },
    { label: "Largest holding value", value: formattedLargestHoldingValue },
  ];

  return (
    <div className="w-full min-h-28 justify-between flex py-4 border-b border-b-secondary-border flex-col items-center gap-2">
      <div className="flex gap-1.5 items-center">
        <span className="font-semibold">{abbreviatedPubkey}</span>
        <SolscanButton account={publicKey?.toBase58() || ""} />
      </div>

      <div className="flex text-center justify-evenly items-start w-full overflow-x-auto">
        {userStats.map((stat) => {
          return (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-white/60 sm:text-sm text-xs">
                {stat.label}
              </span>
              {!isEmptyWallet && (
                <span className="font-semibold sm:text-sm text-xs">
                  {stat.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {isEmptyWallet && (
        <span className="font-semibold text-sm">No tokens found</span>
      )}
    </div>
  );
};
