"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BANNER_IMG = "/Banner2.avif";

function useInViewOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function BannerComp2() {
  const [bannerRef, bannerInView] = useInViewOnce();
  const [textRef, textInView] = useInViewOnce();

  const reveal = (inView) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`;
  const delay = (inView, ms) => ({
    transitionDelay: inView ? `${ms}ms` : "0ms",
  });

  return (
    <section aria-label="Featured release">
      <div
        ref={bannerRef}
        className="group relative isolate overflow-hidden bg-gray-950 text-white"
      >
        <div className="relative h-[46vh] min-h-[340px] sm:h-[52vh] lg:h-[58vh] lg:max-h-[640px]">
          <Image
            src={BANNER_IMG}
            alt="Adidas Samba featured release"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
              <div className={reveal(bannerInView)} style={delay(bannerInView, 120)}>
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-10 bg-[#ff8800] sm:w-12"
                    aria-hidden
                  />
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-[11.5px]">
                    Now Available
                  </span>
                </div>
              </div>

              <h2
                className={`mt-4 max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] sm:text-4xl md:text-5xl lg:text-6xl ${reveal(bannerInView)}`}
                style={delay(bannerInView, 260)}
              >
                Adidas-Samba is Back
                <span className="text-[#ff8800]">.</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={textRef}
        className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <p
            className={`max-w-prose text-base font-light leading-relaxed text-gray-700 sm:text-lg ${reveal(textInView)}`}
            style={delay(textInView, 120)}
          >
            Searching for your perfect sneaker? At The SneekerHub, you can
            explore thousands of styles from Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Odit, a, obcaecati cupiditate sint
            pariatur, ab iure animi quia recusandae saepe veniam ullam
            doloremque vero incidunt veritatis officiis nobis sequi iste?!
          </p>
          <p
            className={`max-w-prose text-base font-light leading-relaxed text-gray-700 sm:text-lg ${reveal(textInView)}`}
            style={delay(textInView, 260)}
          >
            Stay up to date with upcoming sneaker releases with our sneaker
            release calendar and Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptate quo possimus alias aperiam,
            exercitationem animi maxime cum consectetur. Quia quae quas sint
            suscipit laborum, iure magnam placeat veniam expedita aliquam.
          </p>
        </div>
      </div>
    </section>
  );
}
