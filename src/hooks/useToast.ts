"use client";

import { ReactNode, useCallback, useState } from "react";
import { ExternalToast, toast } from "sonner";

export const useToast = () => {
  const [toastId, setToastId] = useState<string | number | null>(null);

  const show = useCallback(
    (
      type: "loading" | "success" | "error",
      message: string | ReactNode,
      data?: ExternalToast
    ) => {
      const method = toast[type];
      const options = toastId ? { id: toastId, ...data } : data;
      const id = method(message, options);
      if (type == "loading") setToastId(id);
      else setToastId(null);
    },
    [toastId]
  );

  return {
    loading: (msg: string | ReactNode, data?: ExternalToast) =>
      show("loading", msg, data),
    success: (msg: string | ReactNode, data?: ExternalToast) =>
      show("success", msg, data),
    error: (msg: string | ReactNode, data?: ExternalToast) =>
      show("error", msg, data),
  };
};
