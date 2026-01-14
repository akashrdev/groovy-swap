import {
  BLOCK_ENGINE_REGIONS,
  TESTNET_BLOCK_ENGINE_REGIONS
} from "@/app/_constants/block-engine-regions";
import { getRegionLatency } from "@/app/_utils/get-region-latency";
import { useQuery } from "@tanstack/react-query";

export enum NETWORKS {
  MAINNET = "Mainnet",
  TESTNET = "Testnet"
}

export const useGetAllRegionLatency = ({
  network = NETWORKS.MAINNET
}: {
  network?: NETWORKS;
}) => {
  const BASE_URL =
    network === NETWORKS.MAINNET
      ? "mainnet.block-engine.jito.wtf"
      : "testnet.block-engine.jito.wtf";

  const fn = async () => {
    const regions =
      network === NETWORKS.MAINNET
        ? BLOCK_ENGINE_REGIONS
        : TESTNET_BLOCK_ENGINE_REGIONS;
    return Promise.all(
      regions.map((region) => {
        const endpoint = region + "." + BASE_URL;
        return getRegionLatency(endpoint, region);
      })
    );
  };
  return useQuery({
    queryFn: fn,
    queryKey: ["region-latency", network],
    staleTime: 20_000
  });
};
