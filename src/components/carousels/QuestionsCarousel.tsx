"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  QuestionCard,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { selectExamById } from "@/store";
import { useState } from "react";

export const QuestionsCarousel = ({ examId }: { examId: number }) => {
  const exam = useAppSelector(selectExamById(examId));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  api?.on("select", (api) => {
    setCurrent(api?.selectedScrollSnap());
  });

  const next = () => {
    if (api?.canScrollNext()) api.scrollNext();
  };

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi}>
      <div className="flex flex-row justify-center items-center gap-[10px]">
        {exam?.questions?.map((_, index) => (
          <Nav
            current={current}
            index={index}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
      <CarouselContent>
        {exam?.questions?.map((questionId, index) => (
          <CarouselItem key={index}>
            <QuestionCard questionId={questionId} index={index} next={next} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Nav = ({
  current,
  index,
  onClick,
}: {
  current: number;
  index: number;
  onClick: () => void;
}) => {
  const isSelected = current == index;
  return (
    <div
      onClick={onClick}
      key={index}
      className={`font-${isSelected ? "bold" : "normal"} bg-${
        isSelected ? "primary" : "card"
      } text-${
        isSelected ? "primary-foreground" : "card-foreground"
      } border-border border-[2px] text-[18px] rounded-full p-[10px] w-[50px] h-[50px] text-center cursor-pointer mt-[5px] mb-[20px]`}
    >
      {index + 1}
    </div>
  );
};
