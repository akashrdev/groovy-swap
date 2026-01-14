import { getPrimaryDomain } from "@bonfida/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

export const useGetPrimary = ({
  connection,
  publicKey,
}: {
  connection: Connection;
  publicKey: PublicKey | null;
}) => {
  const queryFn = async () => {
    if (!publicKey) return undefined;
    const primaryDomain = await getPrimaryDomain(connection, publicKey);

    if (primaryDomain.reverse && !primaryDomain.stale) {
      return `${primaryDomain.reverse}.sol`;
    } else {
      return undefined;
    }
  };

  return useQuery({
    queryKey: ["primaryDomain", publicKey],
    queryFn,
  });
};
