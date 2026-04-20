import { ReactNode } from "react";

interface ProcessCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ProcessCard({
  icon,
  title,
  description,
}: ProcessCardProps) {
  return (
    <div className=" w-full
  lg:max-w-[250px]
  bg-[#F2F6FF]
  rounded-lg
  p-4
  border border-[#C5D9FF]
  hover:border-blue-300
  transition-colors">
      <div className="text-2xl md:text-3xl flex-shrink-0 mb-2 text-white bg-[#1956C9] rounded-full w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 text-start">
        <h4 className="font-semibold font-arima leading-[150%] text-[#000000] text-sm sm:text-base  md:text-xl mb-2">
          {title}
        </h4>
        <p className="text-xs sm:text-sm md:text-base font-normal font-roboto text-[#000000] leading-[150%]">
          {description}
        </p>
      </div>
    </div>
  );
}
