"use client";
import { TOKEN_DIRECTION } from "@/app/context/swap";
import { Divider } from "../common/divider";
import { TokenSelectSection } from "./token-select/token-select-section";
import { SwapButton } from "./buttons/swap-button";
import { SwitchDirectionButton } from "./buttons/switch-direction-button";

export const SwapTerminal = () => {
  return (
    <div className="relative sm:w-[500px] w-full border border-primary-border rounded-xl min-h-[450px] p-4 gap-4 flex flex-col">
      <div className="w-full h-full">
        <TokenSelectSection tokenDirection={TOKEN_DIRECTION.INPUT} />
        <div className="relative w-full flex justify-center">
          <Divider className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2" />
          <SwitchDirectionButton className="z-10 p-2 rounded-full" />
        </div>
        <TokenSelectSection tokenDirection={TOKEN_DIRECTION.OUTPUT} />
      </div>
      <SwapButton />
    </div>
  );
};
