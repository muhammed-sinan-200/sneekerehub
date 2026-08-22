"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";

const BANNER_IN_VIEW_OPTIONS = {
  threshold: 0.15,
  rootMargin: "0px 0px -8% 0px",
};

const reveal = (inView) =>
  `opacity-100 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
    inView ? "translate-y-0" : "translate-y-4"
  }`;
const delay = (inView, ms) => ({
  transitionDelay: inView ? `${ms}ms` : "0ms",
});

export function FeaturedReleaseBannerOverlay() {
  const [bannerRef, bannerInView] = useInViewOnce(BANNER_IN_VIEW_OPTIONS);

  return (
    <div ref={bannerRef} className="absolute inset-x-0 bottom-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
        <div className={reveal(bannerInView)} style={delay(bannerInView, 120)}>
          <div className="flex items-center gap-3">
            <span
              className="h-px w-10 bg-[#ff8800] sm:w-12"
              aria-hidden
            />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-[11.5px]">
              Long waited
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
  );
}

export function FeaturedReleaseTextGrid() {
  const [textRef, textInView] = useInViewOnce(BANNER_IN_VIEW_OPTIONS);

  return (
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
  );
}
