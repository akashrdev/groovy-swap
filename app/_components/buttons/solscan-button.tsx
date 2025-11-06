import Image from "next/image";
import Link from "next/link";

type SolscanButtonProps = (
  | { account: string; tx?: never }
  | { tx: string; account?: never }
) & {
  iconHeight?: number;
  iconWidth?: number;
  className?: string;
};

export const SolscanButton = ({
  account,
  tx,
  iconHeight,
  iconWidth,
  className
}: SolscanButtonProps) => {
  const solScanLink = account
    ? `https://solscan.io/account/${account}`
    : `https://solscan.io/tx/${tx}`;
  return (
    <Link href={solScanLink} target="_blank" rel="noopener noreferrer">
      <Image
        src="/explorers/solscan.png"
        height={iconHeight || 15}
        width={iconWidth || 15}
        alt="Solscan explorer"
        className={className}
      />
    </Link>
  );
};
