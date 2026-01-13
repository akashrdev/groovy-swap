import * as ToastPrimitive from "@radix-ui/react-toast";
import { ReactNode } from "react";

export const Toast = ({
  title,
  message,
  action,
  ...props
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) => {
  return (
    <ToastPrimitive.Root
      {...props}
      className="fixed bottom-5 right-5 z-[1000] bg-primary-card text-primary-brand p-4 rounded-lg shadow-lg"
    >
      {title && (
        <ToastPrimitive.Title className="font-semibold text-lg">
          {title}
        </ToastPrimitive.Title>
      )}
      <ToastPrimitive.Description className="text-sm">
        {message}
      </ToastPrimitive.Description>

      {action && (
        <ToastPrimitive.Action asChild altText="Perform action">
          {action}
        </ToastPrimitive.Action>
      )}

      <ToastPrimitive.Close
        aria-label="Close"
        className="absolute top-2 right-2"
      >
        <span aria-hidden>×</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};
