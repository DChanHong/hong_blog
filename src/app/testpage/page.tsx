"use client";

import React, { useEffect, useState } from "react";
import Box from "../components/testdir/Box";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/errorboundary/ErrorFallback";

const Page = () => {
  return (
    <section className="w-full m-auto">
      sss
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Box />
      </ErrorBoundary>
    </section>
  );
};

export default Page;
