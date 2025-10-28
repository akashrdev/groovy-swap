import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolscanButton } from "../../buttons/solscan-button";
import { StatsSection } from "./stats-section";

export const ProfileContentOverview = () => {
  const { publicKey } = useWallet();
  const abbreviatedPubkey = abbreviate(publicKey);

  return (
    <div className="w-full h-28 justify-between flex py-4 border-b border-b-secondary-border flex-col items-center gap-2 text-white overflow-clip">
      <div className="flex gap-1.5 items-center">
        <span className="font-semibold">{abbreviatedPubkey}</span>
        <SolscanButton account={publicKey?.toBase58() || ""} />
      </div>
      <StatsSection />
    </div>
  );
};
