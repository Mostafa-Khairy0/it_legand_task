"use client";

import { useCallback, useState } from "react";

type UseCountUpReturnType = [number, (target: number) => void];

export const useCountUp = (
  init: number,
  duration = 1000
): UseCountUpReturnType => {
  const [value, setValue] = useState(init);

  const setTarget = useCallback(
    (target: number) => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newValue = Math.floor(progress * target);
        setValue(newValue);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    },
    [duration]
  );

  return [value, setTarget];
};
