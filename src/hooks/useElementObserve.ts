import { useState, useEffect } from "react";
import style from "@/components/main/main.module.css";

const useElementObserve = (targetRef: any) => {
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    // threshold는 교차 비율을 나타내는 배열로, [0.1]로 설정되었다.
    // 10% 이상이 화면에 보일 떄 콜백 함수를 실행하도록 설정한다는 의미.
    const options: IntersectionObserverInit = {
      threshold: [0.1],
    };

    //콜백함수 정의 ,
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          //컴포넌트가 화면에 보일 때의 처리를 여기에 작성한다.

          //화면 비율이 10%이사일떄 ,flag를 trueㄹ 바꿔준다.
          if (entry.intersectionRatio >= 0.1) {
            setFlag(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return { flag, flagClass: flag ? style.scroll_fade_in : "opacity-0" };
};
export default useElementObserve;
