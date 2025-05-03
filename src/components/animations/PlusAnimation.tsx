export const PlusAnimatinos = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <div
      onClick={toggle}
      className="w-[20px] h-[20px] flex justify-center items-center relative"
    >
      <div className="absolute rotate-0 w-[20px] h-[3px] rounded-full bg-ring"></div>
      <div
        className={`absolute rotate-${
          isOpen ? 90 : 0
        } w-[20px] h-[3px] rounded-full bg-ring transition-all duration-300`}
      ></div>
    </div>
  );
};
