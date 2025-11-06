import * as Dialog from "@radix-ui/react-dialog";
import { TokenSelectDialogContent } from "./token-select-dialog-content";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { TokenSelectTrigger } from "./token-select-trigger";
import { TOKEN_DIRECTION } from "../../_stores/useSwapStore";

export const TokenSelectDialog = ({
  tokenDirection
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  return (
    <Dialog.Root>
      <VisuallyHidden>
        <Dialog.Title>Token Select</Dialog.Title>
        <Dialog.Description>Select tokens for swap</Dialog.Description>
      </VisuallyHidden>
      <Dialog.Trigger>
        <TokenSelectTrigger tokenDirection={tokenDirection} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <TokenSelectDialogContent tokenDirection={tokenDirection} />
      </Dialog.Portal>
    </Dialog.Root>
  );
};
