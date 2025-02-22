import { useGetJupTokens } from "@/app/hooks/use-get-jup-tokens";
import { TokenItem } from "@/app/types/token-item";
import * as Dialog from "@radix-ui/react-dialog";
import { TokenSelectItem } from "./item";
import { TokenSelectDialogSkeleton } from "./skeleton";
import { TOKEN_DIRECTION } from "@/app/context/swap";

export const TokenSelectDialogContent = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { data: tokenList, isLoading: isTokenListLoading } = useGetJupTokens();
  const displayedTokens = tokenList ? tokenList.slice(0, 10) : [];
  return (
    <Dialog.Content className="fixed top-1/2 left-1/2 sm:w-[445px] w-full h-[550px] -translate-x-1/2 -translate-y-1/2 bg-primary-card rounded-lg shadow-lg py-3 px-1 overflow-y-auto z-[11]">
      <div className="flex flex-col gap-3 justify-start">
        {isTokenListLoading ? (
          <TokenSelectDialogSkeleton />
        ) : (
          displayedTokens.map((token: TokenItem) => {
            return (
              <Dialog.Close key={token.mintAddress}>
                <TokenSelectItem
                  tokenDirection={tokenDirection}
                  token={token}
                />
              </Dialog.Close>
            );
          })
        )}
      </div>
    </Dialog.Content>
  );
};
