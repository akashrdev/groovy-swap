import { TokenItem } from "@/app/types/token-item";
import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import Image from "next/image";
import { Button } from "../../common/button";
import { TOKEN_DIRECTION, useSwap } from "@/app/context/swap";

export const TokenSelectItem = ({
  token,
  tokenDirection,
}: {
  token: TokenItem;
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { setSelectedInputToken, setSelectedOutputToken } = useSwap();
  return (
    <Button
      variant="ghost"
      className="w-full h-20 hover:bg-primary-card-hover flex gap-2 items-start justify-center flex-col cursor-pointer"
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
          src={token.logo}
          alt="token"
          className="rounded-full"
        />
        <span className="font-bold text-lg">{token.symbol}</span>
      </div>
      <span>{abbreviate(token.mintAddress)}</span>
    </Button>
  );
};
