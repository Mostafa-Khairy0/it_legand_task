"use client";
import { useState, useCallback } from "react";

export type UseBooleanReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  }
];

export const useBoolean = (initial = false): UseBooleanReturnType => {
  const [value, setValue] = useState(initial);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, { on, off, toggle }];
};
