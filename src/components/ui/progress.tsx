"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib";

function Progress({
  className,
  value,
  duration,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { duration: number }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      color="red"
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`bg-[green] h-full w-full flex-1 transition-all duration-[${duration}ms]`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        color="red"
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
