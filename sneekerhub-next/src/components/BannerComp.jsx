"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const HERO_BG = "/homebanner.webp";

const META_ITEMS = [
  "100% Authentic",
  "Free delivery over $150",
  "EU 36 — 47",
];

export default function BannerComp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const revealCls = `transition-all duration-1000 ease-out ${
    mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;
  const revealDelay = (ms) => ({
    transitionDelay: mounted ? `${ms}ms` : "0ms",
  });

  return (
    <section
      className="relative isolate overflow-hidden bg-gray-950 text-white"
      aria-label="SneekerHub featured collection"
    >
      <div
        className={`absolute inset-0 -z-10 bg-cover bg-center transition-transform duration-[2400ms] ease-out ${
          mounted ? "scale-100" : "scale-110"
        }`}
        style={{ backgroundImage: `url("${HERO_BG}")` }}
        aria-hidden
      />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-12">
        <div className="flex min-h-[78vh] flex-col justify-center py-20 sm:min-h-[82vh] sm:py-24 lg:min-h-[88vh] lg:py-28">
          <div className={revealCls} style={revealDelay(150)}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-[11.5px]">
                Latest Drop — 2026
              </span>
            </div>
          </div>

          <h1
            className={`mt-5 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] ${revealCls}`}
            style={revealDelay(280)}
          >
            <span className="block">Step Into</span>
            <span className="block">
              Style<span className="text-[#ff8800]">.</span>
            </span>
          </h1>

          <p
            className={`mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:mt-7 sm:text-lg ${revealCls}`}
            style={revealDelay(450)}
          >
            Discover the latest Sneekers that define comfort and fashion.
          </p>

          <div
            className={`mt-9 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4 ${revealCls}`}
            style={revealDelay(600)}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.2em] text-black shadow-[0_10px_40px_rgba(255,255,255,0.18)] transition-all duration-300 hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_45px_rgba(255,136,0,0.45)] active:scale-[0.97] sm:text-[12px]"
            >
              Shop Now
              <HiArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.04] px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:bg-white/[0.08] sm:text-[12px]"
            >
              Our Story
              <span
                aria-hidden
                className="text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
              >
                →
              </span>
            </Link>
          </div>

          <div
            className={`mt-auto hidden flex-wrap items-center gap-x-6 gap-y-2 pt-16 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/55 sm:flex ${revealCls}`}
            style={revealDelay(800)}
          >
            {META_ITEMS.map((item, idx) => (
              <div key={item} className="flex items-center gap-x-6">
                <span>{item}</span>
                {idx < META_ITEMS.length - 1 && (
                  <span
                    className="h-1 w-1 rounded-full bg-white/30"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
    </section>
  );
}
