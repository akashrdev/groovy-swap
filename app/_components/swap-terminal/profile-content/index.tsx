import { ProfileContentItem } from "./profile-content-item";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletButton } from "../../buttons/connect-wallet-button";
import { ProfileContentOverview } from "./profile-content-overview";
import { Skeleton } from "../../common/skeleton";
import { useGetPortfolio } from "@/app/_hooks/terminal/use-get-portfolio";

interface UserTokenListItem {
  mintAddress: string;
  logo: string;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
}

export const ProfileContent = () => {
  const { connected } = useWallet();
  const { userTokenList, isLoading } = useGetPortfolio();
  return (
    <>
      {!connected ? (
        <div className="w-full h-full flex justify-center items-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <ProfileContentOverview />
          <div className="h-full overflow-y-auto">
            {isLoading ? (
              <Skeleton className="h-full rounded-b-lg" />
            ) : (
              userTokenList.map((token: UserTokenListItem) => (
                <ProfileContentItem
                  key={token.mintAddress}
                  tokenBalance={token.balance}
                  tokenName={token.name}
                  tokenLogo={token.logo}
                  usdValue={token.usdValue}
                />
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};
