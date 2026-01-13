import { useGetPrimary } from "@/app/_hooks/use-get-primary";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { abbreviate } from "@/app/_utils/pubkey/abbreviate";
import { ChevronDown, ChevronUp } from "lucide-react";
import { WalletConnectMenuActions } from "./menu-actions";
import { Button } from "../../common/button";

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
          variant="outline"
          className="flex justify-center items-center gap-1 text-base sm:text-lg py-1 px-4"
        >
          {displayedUser}
          {isMenuVisible ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="px-3 py-1 flex flex-col gap-2 rounded-xl bg-secondary-accent items-center mt-0.5">
        <WalletConnectMenuActions />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
