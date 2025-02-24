import Image from "next/image";

export const ProfileContentItem = ({
  tokenName,
  tokenBalance,
  tokenLogo,
}: {
  tokenName: string;
  tokenBalance: number;
  tokenLogo: string;
}) => {
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
      <span>{tokenBalance}</span>
    </div>
  );
};
