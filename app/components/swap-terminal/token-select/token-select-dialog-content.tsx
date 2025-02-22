import { useGetJupTokens } from "@/app/hooks/use-get-jup-tokens";
import { TokenItem } from "@/app/types/token-item";
import * as Dialog from "@radix-ui/react-dialog";
import { TokenSelectItem } from "./token-select-item";
import { TokenSelectDialogSkeleton } from "./token-select-skeleton";
import { TOKEN_DIRECTION } from "@/app/context/swap";
import { TokenSelectSearch } from "./token-select-search";
import { useForm } from "react-hook-form";

export const TokenSelectDialogContent = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { data: tokenList, isLoading: isTokenListLoading } = useGetJupTokens();
  const initialDisplayedTokens = tokenList ? tokenList.slice(0, 50) : [];

  const { register, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const searchTerm = watch("search");

  const filteredTokens =
    tokenList && searchTerm
      ? tokenList
          .filter((token: TokenItem) =>
            token.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 10)
      : initialDisplayedTokens;

  return (
    <Dialog.Content className="fixed top-1/2 left-1/2 sm:w-[445px] w-full -translate-x-1/2 -translate-y-1/2 bg-primary-card rounded-lg shadow-lg  px-1 z-[11]">
      <div className="relative flex flex-col gap-3 justify-start">
        <div className="sticky top-0">
          <TokenSelectSearch register={register} />
        </div>
        <div className="overflow-y-auto h-[500px] flex flex-col">
          {isTokenListLoading ? (
            <TokenSelectDialogSkeleton />
          ) : (
            filteredTokens.map((token: TokenItem) => {
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
      </div>
    </Dialog.Content>
  );
};
