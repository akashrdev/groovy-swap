import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUsdPrice = ({ mintAddress }: { mintAddress: string }) => {
  interface PRICE_DATA {
    blockId: number;
    decimals: number;
    priceChange24h: number;
    usdPrice: number;
  }

  type API_RESPONSE_PRICE = Record<string, PRICE_DATA>;

  const fn = async () => {
    if (!mintAddress.length) return 0;

    const URL = `https://lite-api.jup.ag/price/v3?ids=${mintAddress}`;
    try {
      const { data: response } = await axios.get<API_RESPONSE_PRICE>(URL);
      return response[mintAddress].usdPrice;
    } catch (err) {
      console.log("Error:", err);
      return 0;
    }
  };
  return useQuery({ queryKey: ["useGetUsdPrice", mintAddress], queryFn: fn });
};
