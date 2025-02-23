import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { DEFAULT_TOKEN_LIST } from "../constants/token-list";

export const useGetWalletTokensBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const queryFn = async () => {
    if (!publicKey) return null;
    const solBalance = await connection.getBalance(publicKey);
    const formattedSolBalance =
      solBalance / Math.pow(10, DEFAULT_TOKEN_LIST.SOL.decimals);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    const tokenBalances = tokenAccounts.value.map((account) => {
      const { mint, tokenAmount } = account.account.data.parsed.info;

      return {
        mintAddress: mint,
        balance: tokenAmount.uiAmount,
        decimals: tokenAmount.decimals,
      };
    });

    return {
      formattedSolBalance,
      tokenBalances,
    };
  };
  return useQuery({
    queryKey: ["tokenBalances", publicKey],
    queryFn,
  });
};
