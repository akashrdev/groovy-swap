import { BLOCK_ENGINE_REGIONS } from "@/app/_constants/block-engine-regions";
import { getRegionLatency } from "@/app/_utils/get-region-latency";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRegionLatency = () => {
  const BASE_URL = "mainnet.block-engine.jito.wtf";

  const fn = async () => {
    return Promise.all(
      BLOCK_ENGINE_REGIONS.map((region) => {
        const endpoint = region + "." + BASE_URL;
        return getRegionLatency(endpoint, region);
      })
    );
  };
  return useQuery({
    queryFn: fn,
    queryKey: ["region-latency"],
    staleTime: 20_000
  });
};
