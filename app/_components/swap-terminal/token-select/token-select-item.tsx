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
      className="w-full h-20 hover:bg-primary-card-hover flex gap-2 items-start justify-center flex-col cursor-pointer p-3 rounded-xl"
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
        <span className="font-bold text-lg">{token.symbol}</span>
      </div>
      <span>{abbreviate(token.mintAddress)}</span>
    </div>
  );
};
