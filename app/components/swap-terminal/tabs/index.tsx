import { twMerge } from "tailwind-merge";
import { SWAP_TERMINAL_TAB } from "..";
import { Button } from "../../common/button";

export const TerminalTabs = ({
  tab,
  setTab,
}: {
  tab: SWAP_TERMINAL_TAB;
  setTab: (tab: SWAP_TERMINAL_TAB) => void;
}) => {
  const isCurrentlySelected = (tabButton: SWAP_TERMINAL_TAB) => {
    return tab === tabButton;
  };
  console.log("tab", tab);

  return (
    <div className="w-[200px] bg-secondary-dark h-10 rounded-t-xl border border-secondary-card">
      <Button
        className={twMerge(
          "w-1/2 text-white rounded-tl-xl rounded-tr-none rounded-b-none",
          isCurrentlySelected(SWAP_TERMINAL_TAB.SWAP)
            ? "bg-secondary-card"
            : "bg-inherit"
        )}
        onClick={() => setTab(SWAP_TERMINAL_TAB.SWAP)}
      >
        Swap
      </Button>
      <Button
        className={twMerge(
          "w-1/2  text-white rounded-tr-xl rounded-tl-none rounded-b-none border-l border-l-secondary-border",
          isCurrentlySelected(SWAP_TERMINAL_TAB.PROFILE)
            ? "bg-secondary-card"
            : "bg-inherit"
        )}
        onClick={() => setTab(SWAP_TERMINAL_TAB.PROFILE)}
      >
        Portfolio
      </Button>
    </div>
  );
};
