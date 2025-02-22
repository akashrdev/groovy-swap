import { TokenItem } from "@/app/types/token-item";
import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import Image from "next/image";
import { TOKEN_DIRECTION, useSwap } from "@/app/context/swap";
import { DEFAULT_TOKEN_LIST } from "@/app/constants/token-list";

export const TokenSelectItem = ({
  token,
  tokenDirection,
}: {
  token: TokenItem;
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { setSelectedInputToken, setSelectedOutputToken } = useSwap();
  return (
    <div
      className="w-full h-20 hover:bg-primary-card-hover flex gap-2 items-start justify-center flex-col cursor-pointer p-3"
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
