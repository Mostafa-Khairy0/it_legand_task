"use client";

import { useBoolean } from "@/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { createContext } from "react";

type SuccessContextType = {
  play: (count: number) => void;
};

export const SuccessContext = createContext<SuccessContextType | undefined>(
  undefined
);

export const SuccessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, { on, off }] = useBoolean();

  const play = (count: number) => {
    on();
    setTimeout(off, count * 3000);
  };

  return (
    <SuccessContext.Provider value={{ play }}>
      {children}
      {isOpen && (
        <DotLottieReact
          src="/lottie/success.lottie"
          loop
          autoplay
          className="fixed inset-0 z-[99999999] w-[100vw] h-[100vh] top-0 left-0"
        />
      )}
    </SuccessContext.Provider>
  );
};
