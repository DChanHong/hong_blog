import React, { useRef } from "react";
import useElementObserve from "@/hooks/useElementObserve";

const Section1 = () => {
  const targetRef = useRef<HTMLHeadingElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);

  return (
    <>
      <div
        className={`
          flex items-center justify-center font-bold text-center 
          text-[36px]  xs:text-[46px] md:text-[70px]  bg-[#010118] mt-[100px] text-white
          h-[25vh] md:h-[40vh] lg:h-[50vh] 2xl:h-[70vh]
        `}
      >
        <h2 ref={targetRef} className={` ${flagClass}`}>
          Hong Developer
        </h2>
      </div>
    </>
  );
};

export default Section1;
