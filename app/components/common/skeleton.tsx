import { twMerge } from "tailwind-merge";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={twMerge("animate-color-pulse", className)} />;
};
