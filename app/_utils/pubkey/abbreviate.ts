import { PublicKey } from "@solana/web3.js";

export const abbreviate = (publicKey: string | PublicKey | null) => {
  if (!publicKey) return null;
  const publicKeyString =
    typeof publicKey === "string" ? publicKey : publicKey.toBase58();

  return `${publicKeyString.slice(0, 4)}...${publicKeyString.slice(-4)}`;
};
