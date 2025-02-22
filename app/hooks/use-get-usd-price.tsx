import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PRICE_DATA {
  id: string;
  type: string;
  price: string;
}

interface API_RESPONSE_PRICE {
  data: Record<string, PRICE_DATA>;
  timeTaken: number;
}

export const useGetUsdPrice = ({ mintAddress }: { mintAddress: string }) => {
  const URL = `https://api.jup.ag/price/v2?ids=${mintAddress}`;
  const queryFn = async () => {
    const { data: response } = await axios.get<API_RESPONSE_PRICE>(URL);
    return response.data[mintAddress]
      ? Number(response.data[mintAddress].price)
      : null;
  };

  return useQuery({
    queryKey: ["usdPrice", mintAddress],
    queryFn,
  });
};
