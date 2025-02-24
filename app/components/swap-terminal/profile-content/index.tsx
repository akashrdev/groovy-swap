import { useGetWalletTokensBalance } from "@/app/hooks/use-get-wallet-token-balance";
import { ProfileContentItem } from "./profile-content-item";
import {
  API_RESPONSE_ITEM,
  useGetJupTokens,
} from "@/app/hooks/use-get-jup-tokens";
import { useEffect, useState } from "react";
import { DEFAULT_TOKEN_LIST } from "@/app/constants/token-list";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletButton } from "../../buttons/connect-wallet-button";
import { ProfileContentOverview } from "./profile-content-overview";
import { getUsdPrice } from "@/app/utils/price/get-usd-price";

interface UserTokenListItem {
  mintAddress: string;
  logo: string;
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
}

export const ProfileContent = () => {
  const { data: tokenList } = useGetJupTokens();
  const { data: walletData } = useGetWalletTokensBalance();
  const { connected } = useWallet();

  const [userTokenList, setUserTokenList] = useState<UserTokenListItem[]>([]);
  const [numberTokensOwned, setNumberTokensOwned] = useState(0);
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const [largestHoldingToken, setLargestHoldingToken] = useState({
    name: "",
    usdValue: 0,
  });

  useEffect(() => {
    const fetchBalances = async () => {
      if (!walletData || !tokenList) return;

      const tokenBalancesWithSOL = [
        ...walletData.tokenBalances,
        {
          mintAddress: DEFAULT_TOKEN_LIST.SOL.mintAddress,
          balance: walletData.formattedSolBalance,
          decimals: DEFAULT_TOKEN_LIST.SOL.decimals,
        },
      ];

      const processedTokens = tokenBalancesWithSOL
        .map((token) => {
          const tokenInfo = tokenList.find(
            (t: API_RESPONSE_ITEM) => t.mintAddress === token.mintAddress
          );

          return {
            mintAddress: token.mintAddress,
            balance: token.balance,
            name:
              tokenInfo?.name === "Wrapped SOL" ? "Solana" : tokenInfo?.name, // ✅ Handle Wrapped SOL
            symbol: tokenInfo?.symbol,
            logo: tokenInfo?.logo,
          };
        })
        .filter((token) => !!token.balance && !!token.name)
        .sort((a, b) => b.balance - a.balance);

      const tokenPrices = await getUsdPrice({
        mintAddresses: processedTokens.map((token) => token.mintAddress),
      });

      let totalUsdBalance = 0;
      let maxHolding = { name: "", usdValue: 0 };

      const tokensWithUsdValue = processedTokens.map((token) => {
        const tokenPrice = tokenPrices[token.mintAddress] || 0;
        const usdValue = token.balance * tokenPrice;

        totalUsdBalance += usdValue;

        if (usdValue > maxHolding.usdValue) {
          maxHolding = { name: token.name, usdValue };
        }

        return {
          ...token,
          usdValue,
        };
      });

      setUserTokenList(tokensWithUsdValue);
      setNumberTokensOwned(tokensWithUsdValue.length);
      setTotalUsdBalance(totalUsdBalance);
      setLargestHoldingToken(maxHolding);
    };

    fetchBalances();
  }, [walletData, tokenList]);

  return (
    <>
      {!connected ? (
        <div className="w-full h-full flex justify-center items-center">
          <ConnectWalletButton />
        </div>
      ) : (
        <div className="w-full h-full overflow-y-auto flex flex-col">
          <ProfileContentOverview
            totalUsdBalance={totalUsdBalance}
            totalTokensOwned={numberTokensOwned}
            largestHolding={largestHoldingToken.name}
            largestHoldingValue={largestHoldingToken.usdValue}
          />
          {userTokenList.map((token: UserTokenListItem) => (
            <ProfileContentItem
              key={token.mintAddress}
              tokenBalance={token.balance}
              tokenName={token.name}
              tokenLogo={token.logo}
              usdValue={token.usdValue}
            />
          ))}
        </div>
      )}
    </>
  );
};
