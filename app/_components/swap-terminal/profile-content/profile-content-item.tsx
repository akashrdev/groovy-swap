import { round } from "@/app/_utils/numbers/round";
import Image from "next/image";

export const ProfileContentItem = ({
  tokenName,
  tokenBalance,
  tokenLogo,
  usdValue
}: {
  tokenName: string;
  tokenBalance: number;
  tokenLogo: string;
  usdValue: number;
}) => {
  const formattedUsdValue = round(usdValue);
  return (
    <div className="w-full h-14 flex justify-between border-b border-b-secondary-border p-4">
      <div className="flex gap-2 items-center">
        <Image
          src={tokenLogo}
          width={22}
          height={22}
          alt="token logo"
          className="rounded-full"
        />
        <span className="text-white">{tokenName}</span>
      </div>
      <div className="gap-1 flex items-center">
        <span>{tokenBalance}</span>
        <span className="text-white/60 text-sm">{`($${formattedUsdValue})`}</span>
      </div>
    </div>
  );
};
