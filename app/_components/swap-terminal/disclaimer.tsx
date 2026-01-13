import { twMerge } from "tailwind-merge";

export const Disclaimer = ({ className }: { className: string }) => {
  return (
    <span
      className={twMerge(
        "text-primary-brand/60 sm:text-sm text-xs text-center",
        className
      )}
    >
      To protect Groovy Swap users, only tokens from the Jupiter Ecosystem List
      are tradeable. Learn more{" "}
      <a
        href="https://www.jupresear.ch/t/get-your-token-a-community-tag-beta/18963"
        className="text-sm text-primary-brand"
      >
        here
      </a>
      .
    </span>
  );
};
