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
    <div className="w-full h-14 flex justify-between border-b border-b-primary-accent p-4 text-primary-brand ">
      <div className="flex gap-2 items-center">
        <Image
          src={tokenLogo}
          width={22}
          height={22}
          alt="token logo"
          className="rounded-full"
        />
        <span className="sm:text-xl text-lg">{tokenName}</span>
      </div>
      <div className="gap-1 flex items-center font-aeonik">
        <span className="sm:text-sm text-xs">{tokenBalance}</span>
        <span className="sm:text-xs text-[10px] text-primary-accent">{`($${formattedUsdValue})`}</span>
      </div>
    </div>
  );
};
