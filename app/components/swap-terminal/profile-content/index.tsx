import { useGetWalletTokensBalance } from "@/app/hooks/use-get-wallet-token-balance";
import { ProfileContentItem } from "./profile-content-item";
import {
  API_RESPONSE_ITEM,
  useGetJupTokens,
} from "@/app/hooks/use-get-jup-tokens";
import { useMemo } from "react";
import { DEFAULT_TOKEN_LIST } from "@/app/constants/token-list";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletButton } from "../../buttons/connect-wallet-button";

export const ProfileContent = () => {
  const { data: tokenList } = useGetJupTokens();
  const { data: walletData } = useGetWalletTokensBalance();
  const { connected } = useWallet();

  const userTokenList = useMemo(() => {
    if (!walletData || !tokenList) return [];

    const tokenBalancesWithSOL = [
      ...walletData.tokenBalances,
      {
        mintAddress: DEFAULT_TOKEN_LIST.SOL.mintAddress,
        balance: walletData.formattedSolBalance,
        decimals: DEFAULT_TOKEN_LIST.SOL.decimals,
      },
    ];

    return tokenBalancesWithSOL
      .map((token) => {
        const tokenInfo = tokenList.find(
          (t: API_RESPONSE_ITEM) => t.mintAddress === token.mintAddress
        );

        return {
          mintAddress: token.mintAddress,
          balance: token.balance,
          name: tokenInfo?.name,
          symbol: tokenInfo?.symbol,
          logo: tokenInfo?.logo,
        };
      })
      .filter((token) => !!token.balance && !!token.name)
      .sort((a, b) => b.balance - a.balance);
  }, [walletData, tokenList]);

  return (
    <>
      {!connected ? (
        <div className="w-full h-full flex justify-center items-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto">
          {userTokenList.map((token) => (
            <ProfileContentItem
              key={token.mintAddress}
              tokenBalance={token.balance}
              tokenName={token.name === "Wrapped SOL" ? "Solana" : token.name} // Abstract WSOL, functionally the same as SOL
              tokenLogo={token.logo}
            />
          ))}
        </div>
      )}
    </>
  );
};
