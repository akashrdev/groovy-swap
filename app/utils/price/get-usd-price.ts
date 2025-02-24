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

export const getUsdPrice = async ({
  mintAddresses,
}: {
  mintAddresses: string[];
}) => {
  if (!mintAddresses.length) return {};

  const URL = `https://api.jup.ag/price/v2?ids=${mintAddresses.join(",")}`;
  const { data: response } = await axios.get<API_RESPONSE_PRICE>(URL);

  return Object.fromEntries(
    mintAddresses.map((mint) => [
      mint,
      response.data[mint] ? Number(response.data[mint].price) : 0,
    ])
  );
};
