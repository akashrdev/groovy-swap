"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Toast } from "@/app/components/common/toast";

interface ToastOptions {
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const showToast = ({ title, message, duration = 3000 }: ToastOptions) => {
    const newToast = { title, message, duration };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== newToast));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        {toasts.map((toast, index) => (
          <Toast title={toast.title} message={toast.message} key={index} />
        ))}

        <ToastPrimitive.Viewport className="fixed bottom-5 right-5 w-80" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
