"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let tween: any;

    const initGsap = async () => {
      try {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const data = { current: 0 };
        tween = gsap.to(data, {
          current: value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => setDisplay(Math.round(data.current)),
        });
      } catch (err) {
        setDisplay(value);
      }
    };

    initGsap();

    return () => {
      if (tween) {
        tween.kill();
      }
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
