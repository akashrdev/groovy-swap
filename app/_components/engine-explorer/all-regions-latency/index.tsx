"use client";

import { useGetAllRegionLatency } from "@/app/_hooks/block-engine-explorer/get-all-region-latency";
import { AllRegionsBlockEngineBarChart } from "./chart";
import { NetworkDropdown } from "./network-dropdown";

export const AllRegionsLatencySection = () => {
  const { isLoading } = useGetAllRegionLatency({});

  return (
    <div className="flex flex-col gap-4 w-[800px]">
      {!isLoading && (
        <div className="flex w-full justify-end">
          <NetworkDropdown />
        </div>
      )}

      <AllRegionsBlockEngineBarChart />
    </div>
  );
};
