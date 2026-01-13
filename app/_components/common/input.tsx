import { twMerge } from "tailwind-merge";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
}

export const Input = ({
  containerClassName,
  className,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div
      className={twMerge(
        "px-4 py-2 flex border border-primary-accent rounded-md",
        containerClassName
      )}
    >
      <input className={className} onChange={onChange} {...props} />
    </div>
  );
};
