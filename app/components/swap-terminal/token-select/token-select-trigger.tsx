import { TOKEN_DIRECTION, useSwap } from "@/app/context/swap";
import { Button } from "../../common/button";
import Image from "next/image";

export const TokenSelectTrigger = ({
  tokenDirection,
}: {
  tokenDirection: TOKEN_DIRECTION;
}) => {
  const { selectedInputToken, selectedOutputToken } = useSwap();
  const displayedToken =
    tokenDirection === TOKEN_DIRECTION.INPUT
      ? selectedInputToken
      : selectedOutputToken;

  return (
    <Button variant="outline" size="xl" className=" min-w-[140px]" asChild>
      <div className="flex gap-2">
        <Image
          src={displayedToken.logo}
          alt="input token"
          height={30}
          width={30}
          className="rounded-full"
          unoptimized
        />
        <span className="font-semibold text-lg text-white">
          {displayedToken.symbol}
        </span>
      </div>
    </Button>
  );
};
