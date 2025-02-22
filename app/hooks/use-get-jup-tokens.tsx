import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TokenItem } from "../types/token-item";

const URL = "https://api.jup.ag/tokens/v1/tagged/verified";

interface API_RESPONSE_ITEM extends Record<string, unknown> {
  address: string;
  decimals: number;
  logoURI: string;
  symbol: string;
  name: string;
}

export const useGetJupTokens = () => {
  const queryFn = async () => {
    const { data } = await axios.get(URL);
    return data.map(
      (token: API_RESPONSE_ITEM): TokenItem =>
        ({
          mintAddress: token.address,
          symbol: token.symbol,
          logo: token.logoURI,
          decimals: token.decimals,
        } as TokenItem)
    );
  };

  return useQuery({
    queryKey: ["jupTokens"],
    queryFn,
  });
};
