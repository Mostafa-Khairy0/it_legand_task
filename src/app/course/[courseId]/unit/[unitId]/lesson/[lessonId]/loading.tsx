"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <DotLottieReact
      src="/lottie/loading.lottie"
      loop
      autoplay
      segment={[120, 320]}
    />
  );
};

export default Loading;
