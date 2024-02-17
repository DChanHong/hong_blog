// import { useState, useEffect } from "react";

// const useBrowser = () => {
//   const [dimensions, setDimensions] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 0,
//     height: typeof window !== "undefined" ? window.innerHeight : 0,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: typeof window !== "undefined" ? window.innerWidth : 0,
//         height: typeof window !== "undefined" ? window.innerHeight : 0,
//       });
//     };

//     // 창의 크기가 변경될 때 handleResize 함수를 호출하기 위해 'resize' 이벤트에 리스너 추가
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return dimensions;
// };

// export default useBrowser;
