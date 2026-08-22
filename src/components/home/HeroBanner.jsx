"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const HERO_BG = "/homebanner.webp";

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const heroRevealCls = `opacity-100 transition-all duration-1000 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 ${
    mounted ? "translate-y-0" : "translate-y-5"
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
        className={`absolute inset-0 -z-10 overflow-hidden transition-transform duration-[2400ms] ease-out ${
          mounted ? "scale-100" : "scale-110"
        }`}
        aria-hidden
      >
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

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
          <div className={heroRevealCls} style={revealDelay(150)}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-[11.5px]">
                SneekerHub
              </span>
            </div>
          </div>

          <h1
            className={`mt-5 max-w-4xl text-balance text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] ${heroRevealCls}`}
            style={revealDelay(280)}
          >
            <span className="block">Step Into</span>
            <span className="block">
              Style<span className="text-[#ff8800]">.</span>
            </span>
          </h1>

          <p
            className={`mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:mt-7 sm:text-lg ${heroRevealCls}`}
            style={revealDelay(450)}
          >
            Discover the latest Sneekers that define comfort and fashion.
          </p>

          <div
            className={`mt-9 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4 ${heroRevealCls}`}
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
