"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_THRESHOLD = 0.12;
const DEFAULT_ROOT_MARGIN = "0px 0px -8% 0px";

export function useInViewOnce(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;
  const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
