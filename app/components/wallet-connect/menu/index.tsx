import { useGetPrimary } from "@/app/hooks/use-get-primary";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Button } from "../common/button";
import { abbreviate } from "@/app/utils/pubkey/abbreviate";
import { ChevronDown, ChevronUp } from "lucide-react";
import { WalletConnectMenuActions } from "./menu-actions";

export const WalletConnectMenu = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { data: primaryDomain } = useGetPrimary({ connection, publicKey });
  const displayedUser = primaryDomain ? primaryDomain : abbreviate(publicKey);

  return (
    <DropdownMenu.Root
      open={isMenuVisible}
      onOpenChange={(state) => setIsMenuVisible(state)}
    >
      <DropdownMenu.Trigger asChild>
        <Button
          variant="primary"
          size="md"
          className="flex justify-center items-center gap-1"
        >
          {displayedUser}
          {isMenuVisible ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="px-3 py-2 flex flex-col gap-2 rounded-md bg-secondary items-center">
        <WalletConnectMenuActions />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
