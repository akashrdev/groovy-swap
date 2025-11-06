import { TokenSelectDialog } from "./token-select-dialog";
import { TokenAmountInput } from "./token-amount-input";
import { TOKEN_DIRECTION } from "../../_stores/useSwapStore";

export const TokenSelectSection = ({
  tokenDirection
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  return (
    <div className={"w-full justify-between h-1/2 p-3 flex items-center"}>
      <TokenSelectDialog tokenDirection={tokenDirection} />
      <TokenAmountInput tokenDirection={tokenDirection} />
    </div>
  );
};
