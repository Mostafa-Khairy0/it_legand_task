"use client";

import { useCountUp, useInView, useProgress } from "@/hooks";
import { Progress } from "../ui";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export const ProgressAnimation = ({ lessonId }: { lessonId: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { progress } = useProgress({ lessonId });
  const [value, setValue] = useState(0);
  const [target, setTarget] = useCountUp(0, 500);

  useEffect(() => {
    const id = setTimeout(() => setValue(isInView ? progress : 0), 300);
    return () => clearTimeout(id);
  }, [progress, isInView]);

  useEffect(() => {
    setTarget(value);
  }, [setTarget, value]);

  return (
    <div
      ref={ref}
      className="relative flex justify-center items-center my-[60px]"
    >
      <Progress value={value} duration={800} className="w-full" />
      <div
        className={`transition-all duration-[800ms] w-[40px] justify-between items-center absolute top-[-42px] flex flex-col h-[75px]`}
        style={{ left: `calc(${value}% - 20px)` }}
      >
        <div className="flex flex-col justify-center items-center">
          <div
            className={`w-[30px] h-[30px] p-[5px] border-border border-2 rounded-full text-[10px] flex justify-center items-center`}
          >
            You
          </div>
          <ChevronDown size={10} className="text-border" />
        </div>
        <div>{target}%</div>
      </div>
    </div>
  );
};
