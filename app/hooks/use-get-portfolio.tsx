import { useMemo } from "react";
import { useGetJupTokens } from "./use-get-jup-tokens";
import { useGetWalletTokensBalance } from "./use-get-wallet-token-balance";
import { DEFAULT_TOKEN_LIST } from "../constants/token-list";
import { PriceResult, useGetUsdPrice } from "./use-get-usd-price";
import { TokenItem } from "../types/token-item";

export const useGetPortfolio = () => {
  const { data: tokenList, isLoading: isTokenListLoading } = useGetJupTokens();
  const { data: walletData, isLoading: isWalletDataLoading } =
    useGetWalletTokensBalance();

  const tokenBalancesWithSol = useMemo(() => {
    if (!walletData) return [];
    return [
      ...walletData?.tokenBalances,
      {
        mintAddress: DEFAULT_TOKEN_LIST.SOL.mintAddress,
        balance: walletData?.formattedSolBalance,
        decimals: DEFAULT_TOKEN_LIST.SOL.decimals
      }
    ];
  }, [walletData]);

  const processedTokens = tokenBalancesWithSol
    .map((token) => {
      const tokenInfo = tokenList?.find(
        (t: TokenItem) => t.mintAddress === token.mintAddress
      );

      return {
        mintAddress: token.mintAddress,
        balance: token.balance,
        name: tokenInfo?.name === "Wrapped SOL" ? "Solana" : tokenInfo?.name,
        symbol: tokenInfo?.symbol,
        logo: tokenInfo?.logo
      };
    })
    .filter((token) => !!token.balance && !!token.name);

  const { data: tokenPrices, isLoading: isUsdPriceLoading } = useGetUsdPrice({
    mintAddresses: processedTokens.map((token) => token.mintAddress)
  });

  const portfolioData = useMemo(() => {
    if (!walletData || !tokenPrices) {
      return {
        userTokenList: [],
        totalUsdBalance: 0,
        maxHolding: { name: "", usdValue: 0 }
      };
    }

    let totalUsdBalance = 0;
    let maxHolding = { name: "", usdValue: 0 };

    const userTokenList = processedTokens
      .map((token) => {
        const priceData = tokenPrices.find(
          (t: PriceResult) => t.mint === token.mintAddress
        );
        const usdPrice = priceData?.usdPrice || 0;
        const usdValue = token.balance * usdPrice;

        totalUsdBalance += usdValue;

        if (usdValue > maxHolding.usdValue) {
          maxHolding = { name: token.name, usdValue };
        }

        return {
          ...token,
          usdValue
        };
      })
      .sort((a, b) => b.usdValue - a.usdValue);

    return {
      userTokenList,
      totalUsdBalance,
      maxHolding
    };
  }, [processedTokens, tokenPrices, walletData]);

  const { userTokenList, totalUsdBalance, maxHolding } = portfolioData;
  const numberTokensOwned = userTokenList.length;

  const isLoading =
    isTokenListLoading || isWalletDataLoading || isUsdPriceLoading;
  return {
    userTokenList,
    totalUsdBalance,
    maxHolding,
    numberTokensOwned,
    isLoading
  };
};
