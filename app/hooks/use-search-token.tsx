export const useSearchToken = () => {
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
