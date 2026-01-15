import { TokenItem } from "@/app/_types/token-item";
import { abbreviate } from "@/app/_utils/pubkey/abbreviate";
import Image from "next/image";

import { DEFAULT_TOKEN_LIST } from "@/app/_constants/token-list";
import { TOKEN_DIRECTION, useSwapStore } from "../../_stores/useSwapStore";

export const TokenSelectItem = ({
  token,
  tokenDirection
}: {
  token: TokenItem;
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { setSelectedInputToken, setSelectedOutputToken } = useSwapStore();
  return (
    <div
      className="w-full  hover:bg-primary-card-hover flex gap-1 items-start justify-center flex-col cursor-pointer px-3 py-1 text-primary-brand"
      onClick={() =>
        tokenDirection === TOKEN_DIRECTION.INPUT
          ? setSelectedInputToken(token)
          : setSelectedOutputToken(token)
      }
    >
      <div className="flex items-center gap-2">
        <Image
          width={20}
          height={20}
          src={token.logo || DEFAULT_TOKEN_LIST.SOL.logo}
          alt="token"
          className="rounded-full"
          unoptimized
        />
        <span className="font-bold text-xl">{token.symbol}</span>
      </div>
      <span className="text-lg">{abbreviate(token.mintAddress)}</span>
    </div>
  );
};
