"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function LoadingAnimation() {
  const spinnerRef = useRef(null);

  useGSAP(() => {
    gsap.to(spinnerRef.current, {
      rotate: 360,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <div
      ref={spinnerRef}
      className="rounded-full border-2 border-border size-8"
      style={{
        borderTopColor: "hsl(var(--primary))",
        borderRightColor: "hsl(var(--primary))",
      }}
    />
  );
}
