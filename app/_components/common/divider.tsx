import { twMerge } from "tailwind-merge";

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge("w-full border border-primary-border", className)}
    />
  );
};
