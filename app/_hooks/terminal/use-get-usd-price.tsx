import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PRICE_DATA {
  blockId: number;
  decimals: number;
  priceChange24h: number;
  usdPrice: number;
}

type API_RESPONSE_PRICE = Record<string, PRICE_DATA>;

export interface PriceResult {
  mint: string;
  usdPrice: number;
}

export const useGetUsdPrice = ({
  mintAddresses
}: {
  mintAddresses: string[];
}) => {
  const fn = async (): Promise<PriceResult[] | []> => {
    if (!mintAddresses.length) return [];

    const URL = `https://lite-api.jup.ag/price/v3?ids=${mintAddresses.join(",")}`;
    try {
      const { data: response } = await axios.get<API_RESPONSE_PRICE>(URL);
      return mintAddresses.map((mint) => {
        return {
          mint: mint,
          usdPrice: response[mint].usdPrice
        };
      });
    } catch (err) {
      console.log("Error:", err);
      return [];
    }
  };
  return useQuery({ queryKey: ["useGetUsdPrice", mintAddresses], queryFn: fn });
};
