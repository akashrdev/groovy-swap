import { SWAP_TERMINAL_TAB } from "..";
import { Button } from "../../common/button";

export const TerminalTabs = ({
  setTab,
}: {
  setTab: (tab: SWAP_TERMINAL_TAB) => void;
}) => {
  return (
    <div className="w-[200px] bg-secondary-dark h-10 rounded-t-xl border border-secondary-card">
      <Button
        className="w-1/2 bg-inherit text-white rounded-tl-xl rounded-tr-none rounded-b-none"
        onClick={() => setTab(SWAP_TERMINAL_TAB.SWAP)}
      >
        Swap
      </Button>
      <Button
        className="w-1/2 bg-inherit text-white rounded-tr-xl rounded-tl-none rounded-b-none border-l border-l-secondary-border"
        onClick={() => setTab(SWAP_TERMINAL_TAB.PROFILE)}
      >
        Portfolio
      </Button>
    </div>
  );
};
