"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const SLIDES = [
  { id: 1, img: "/Carousel-img/slide1-img.webp", alt: "Shop banner 1" },
  { id: 2, img: "/Carousel-img/slide2-img.webp", alt: "Shop banner 2" },
  { id: 3, img: "/Carousel-img/slide3-img.webp", alt: "Shop banner 3" },
];

const INTERVAL_MS = 6000;
const SWIPE_THRESHOLD = 50;

const padIndex = (value) => String(value).padStart(2, "0");

export default function ShopCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );
  const goTo = useCallback((index) => setCurrent(index), []);

  useEffect(() => {
    if (paused || !isInView) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, isInView, next]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - endX;
    if (Math.abs(diff) < SWIPE_THRESHOLD) return;
    if (diff > 0) next();
    else prev();
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8800]/60"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Shop banner carousel"
    >
      <div className="relative h-[60vh] min-h-[420px] sm:h-[68vh] lg:h-[78vh] lg:max-h-[820px]">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
              aria-hidden={!isActive || undefined}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                  transitionProperty: "transform",
                  transitionDuration: isActive ? "8000ms" : "400ms",
                  transitionTimingFunction: "ease-out",
                }}
                priority={index === 0}
              />
            </div>
          );
        })}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15"
          aria-hidden
        />

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 sm:inline-flex sm:left-6 lg:left-8"
          aria-label="Previous slide"
        >
          <HiOutlineChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 sm:inline-flex sm:right-6 lg:right-8"
          aria-label="Next slide"
        >
          <HiOutlineChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-between gap-4 px-5 sm:bottom-8 sm:px-8 lg:px-12">
          <div
            className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white sm:text-[11.5px]"
            aria-live="polite"
          >
            <span className="text-lg font-black tracking-tight sm:text-xl">
              {padIndex(current + 1)}
            </span>
            <span className="ml-2 text-white/50">
              · {padIndex(SLIDES.length)}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Slide indicators"
          >
            {SLIDES.map((_, i) => {
              const isActive = i === current;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={isActive}
                  className={`group relative h-3 transition-all duration-500 ease-out ${
                    isActive ? "w-10 sm:w-12" : "w-5 sm:w-6"
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 inset-y-[5px] rounded-full transition-colors duration-300 ${
                      isActive
                        ? "bg-[#ff8800]"
                        : "bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
