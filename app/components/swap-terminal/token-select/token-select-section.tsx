import { TOKEN_DIRECTION } from "@/app/context/swap";
import { TokenSelectDialog } from "./token-select-dialog";
import { TokenAmountInput } from "./token-amount-input";

export const TokenSelectSection = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  return (
    <div className="w-full justify-between h-1/2 p-3 flex items-center">
      <TokenSelectDialog tokenDirection={tokenDirection} />
      <TokenAmountInput tokenDirection={tokenDirection} />
    </div>
  );
};
