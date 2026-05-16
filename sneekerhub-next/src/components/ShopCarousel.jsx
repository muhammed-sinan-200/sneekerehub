"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const SLIDES = [
  { id: 1, img: "/Carousel-img/slide1-img.webp", alt: "Shop banner 1" },
  { id: 2, img: "/Carousel-img/slide2-img.webp", alt: "Shop banner 2" },
  { id: 3, img: "/Carousel-img/slide3-img.webp", alt: "Shop banner 3" },
];

const INTERVAL_MS = 3000;

export default function ShopCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    []
  );

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="relative overflow-hidden bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Shop banner carousel"
    >
      {/* Active slide is relative (sets the 545px container height);
          inactive slides are absolute inset-0 overlays. */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
          aria-hidden={index !== current || undefined}
          className={`h-[545px] transition-opacity duration-500 ${
            index === current
              ? "relative opacity-100"
              : "pointer-events-none absolute inset-0 opacity-0"
          }`}
        >
          <Image
            src={slide.img}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
        aria-label="Previous slide"
      >
        <HiChevronLeft size={28} />
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
        aria-label="Next slide"
      >
        <HiChevronRight size={28} />
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === current}
            className={`h-2.5 w-2.5 rounded-full border border-white/40 transition-colors ${
              index === current ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
