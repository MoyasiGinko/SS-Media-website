"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FullscreenLoading from "./LoadingBar";

const PageRedirectLoading = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect after showing the loading state
    const redirectTimeout = setTimeout(() => {
      router.push("/work/videos");
    }, 1000); // Small delay to show the loading animation

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return <FullscreenLoading />;
};

export default PageRedirectLoading;
