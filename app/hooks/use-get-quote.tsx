import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

interface RoutePlan {
  swapInfo: SwapInfo;
  percent: number;
}

export interface APIResponseQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee: null | string;
  priceImpactPct: string;
  routePlan: RoutePlan[];
  contextSlot: number;
  timeTaken: number;
}
export const useGetQuote = ({
  inputTokenMint,
  outputTokenMint,
  inputAmount,
}: {
  inputTokenMint: string;
  outputTokenMint: string;
  inputAmount: number;
}) => {
  const URL = `https://api.jup.ag/swap/v1/quote?inputMint=${inputTokenMint}&outputMint=${outputTokenMint}&amount=${inputAmount}&slippageBps=50&restrictIntermediateTokens=true`;
  const queryFn = async () => {
    const { data } = await axios.get(URL);
    return data;
  };

  return useQuery({
    queryKey: ["quote", inputTokenMint, outputTokenMint, inputAmount],
    queryFn,
  });
};
