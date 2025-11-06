import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TokenItem } from "../_types/token-item";

const URL = "https://lite-api.jup.ag/tokens/v2/tag?query=verified";

export interface API_RESPONSE_ITEM {
  id: string;
  decimals: number;
  icon: string;
  symbol: string;
  name: string;
}

export const useGetJupTokens = () => {
  const queryFn = async () => {
    const { data } = await axios.get(URL);
    return data.map(
      (token: API_RESPONSE_ITEM): TokenItem =>
        ({
          mintAddress: token.id,
          symbol: token.symbol,
          logo: token.icon,
          decimals: token.decimals,
          name: token.name
        }) as TokenItem
    );
  };

  return useQuery({
    queryKey: ["jupTokens"],
    queryFn
  });
};
