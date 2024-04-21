// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const handleRouterChange = (loadingSetter: (isLoading: boolean) => void) => {
//   const start = () => {
//     loadingSetter(true);
//   };
//   const end = () => {
//     loadingSetter(false);
//   };

//   return {
//     start,
//     end,
//   };
// };

// export const RouteChangeLoader = (
//   loadingSetter: (isLoading: boolean) => void
// ) => {
//   const router = useRouter();

//   useEffect(() => {
//     const { start, end } = handleRouterChange(loadingSetter);

//     router.events.on("routeChangeStart", start);
//     router.events.on("routeChangeComplete", end);
//     router.events.on("routeChangeError", end);

//     return () => {
//       router.events.off("routeChangeStart", start);
//       router.events.off("routeChangeComplete", end);
//       router.events.off("routeChangeError", end);
//     };
//   }, []);
// };
