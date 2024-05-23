"use client";

import React from "react";
import { RecoilRoot } from "recoil";

function RecoilRootWrapper({ children }: React.PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
export default RecoilRootWrapper;
