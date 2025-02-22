import { twMerge } from "tailwind-merge";
import { sizeStyles, variantStyles } from "./styles";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button: React.FC<ButtonProps> = ({
  asChild = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={twMerge(
        "rounded-[10px] font-medium transition",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
