"use client";

import { DropdownMenu } from "radix-ui";
import { Button } from "../../common/button";
import { Dispatch, SetStateAction } from "react";
import { ChevronDown } from "lucide-react";
import { NETWORKS } from "@/app/_hooks/block-engine-explorer/get-all-region-latency";
export const NetworkDropdown = ({
  currentNetwork,
  setCurrentNetwork
}: {
  currentNetwork: NETWORKS;
  setCurrentNetwork: Dispatch<SetStateAction<NETWORKS>>;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          className="w-fit flex gap-2 sm:text-xl text-lg text-primary-brand place-items-center"
        >
          {currentNetwork}
          <ChevronDown size={15} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="text-primary-brand bg-secondary-accent sm:text-lg text-base px-4 py-1 z-10 rounded-xl"
          sideOffset={5}
        >
          {Object.values(NETWORKS).map((network, idx) => {
            return (
              <DropdownMenu.Item
                key={idx}
                onClick={() => setCurrentNetwork(network)}
                className="px-4 py-1 cursor-pointer"
              >
                {network}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
