import { TOKEN_DIRECTION } from "@/app/context/swap";
import { TokenSelectSection } from "./token-select/token-select-section";
import { Divider } from "../common/divider";
import { SwitchDirectionButton } from "./buttons/switch-direction-button";
import { SwapButton } from "./buttons/swap-button";

export const SwapContent = () => {
  return (
    <div className="w-full h-full gap-4 flex flex-col p-6">
      <TokenSelectSection tokenDirection={TOKEN_DIRECTION.INPUT} />
      <div className="relative w-full flex justify-center">
        <Divider className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 mx-auto border-secondary-card" />
        <SwitchDirectionButton className="z-10 p-2 rounded-full" />
      </div>
      <TokenSelectSection tokenDirection={TOKEN_DIRECTION.OUTPUT} />
      <SwapButton />
    </div>
  );
};
