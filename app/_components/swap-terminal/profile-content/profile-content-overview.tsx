import { abbreviate } from "@/app/_utils/pubkey/abbreviate";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolscanButton } from "../../buttons/solscan-button";
import { StatsSection } from "./stats-section";

export const ProfileContentOverview = () => {
  const { publicKey } = useWallet();
  const abbreviatedPubkey = abbreviate(publicKey);

  return (
    <div className="w-full h-28 justify-between flex py-2 border-b border-b-primary-accent flex-col items-center gap-1 text-primary-brand overflow-clip">
      <div className="flex gap-1.5 items-center">
        <span className="font-semibold sm:text-xl text-lg">
          {abbreviatedPubkey}
        </span>
        <SolscanButton account={publicKey?.toBase58() || ""} />
      </div>
      <StatsSection />
    </div>
  );
};
