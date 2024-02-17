import React, { useRef } from "react";
import useElementObserve from "@/hooks/useElementObserve";

const Section1 = () => {
  const targetRef = useRef<HTMLHeadingElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);

  return (
    <>
      <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
        <h2 ref={targetRef} className={` ${flagClass}`}>
          Hong Developer
        </h2>
      </div>
    </>
  );
};

export default Section1;
