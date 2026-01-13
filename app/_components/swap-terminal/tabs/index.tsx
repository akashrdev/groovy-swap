import { twMerge } from "tailwind-merge";

import { Button } from "../../common/button";
import { SWAP_TERMINAL_TAB } from "../../_stores/useSwapStore";

export const TerminalTabs = ({
  tab,
  setTab
}: {
  tab: SWAP_TERMINAL_TAB;
  setTab: (tab: SWAP_TERMINAL_TAB) => void;
}) => {
  const isCurrentlySelected = (tabButton: SWAP_TERMINAL_TAB) => {
    return tab === tabButton;
  };

  return (
    <div className="w-[200px] h-10 rounded-t-xl border border-b-0 border-primary-accent">
      <Button
        className={twMerge(
          "w-1/2 text-primary-brand rounded-tl-xl rounded-tr-none rounded-b-none flex-1 h-full overflow-hidden",
          isCurrentlySelected(SWAP_TERMINAL_TAB.SWAP)
            ? "bg-secondary-accent"
            : "bg-transparent "
        )}
        onClick={() => setTab(SWAP_TERMINAL_TAB.SWAP)}
      >
        Swap
      </Button>
      <Button
        className={twMerge(
          "w-1/2  text-primary-brand rounded-tr-xl rounded-tl-none rounded-b-none border-l border-l-primary-accent flex-1 h-full overflow-hidden",
          isCurrentlySelected(SWAP_TERMINAL_TAB.PROFILE)
            ? "bg-secondary-accent"
            : "bg-transparent"
        )}
        onClick={() => setTab(SWAP_TERMINAL_TAB.PROFILE)}
      >
        Portfolio
      </Button>
    </div>
  );
};
