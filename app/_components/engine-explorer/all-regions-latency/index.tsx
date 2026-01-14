"use client";

import {
  NETWORKS,
  useGetAllRegionLatency
} from "@/app/_hooks/block-engine-explorer/get-all-region-latency";
import { AllRegionsBlockEngineBarChart } from "./chart";
import { NetworkDropdown } from "./network-dropdown";
import { useState } from "react";

export const AllRegionsLatencySection = () => {
  const { isLoading } = useGetAllRegionLatency({});
  const [currentNetwork, setCurrentNetwork] = useState<NETWORKS>(
    NETWORKS.MAINNET
  );
  return (
    <div className="flex flex-col gap-4 w-[800px]">
      {!isLoading && (
        <div className="flex w-full justify-end">
          <NetworkDropdown
            currentNetwork={currentNetwork}
            setCurrentNetwork={setCurrentNetwork}
          />
        </div>
      )}

      <AllRegionsBlockEngineBarChart currentNetwork={currentNetwork} />
    </div>
  );
};
