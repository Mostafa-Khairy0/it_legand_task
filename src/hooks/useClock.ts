"use client";
import { useEffect, useRef, useState } from "react";

export const useClock = ({
  durationInSeconds,
  onFinish = () => {},
}: {
  durationInSeconds: number;
  onFinish?: () => void;
}) => {
  const [clock, setClock] = useState(durationInSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setClock(durationInSeconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (durationInSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setClock((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [durationInSeconds]);

  useEffect(() => {
    if (clock <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onFinish();
    }
  }, [clock, onFinish]);

  return clock;
};
