"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StoryBanner from "./StoryBanner";

const SECTIONS = [
  {
    id: "story",
    chapter: "01",
    eyebrow: "The Beginning",
    heading: "On 1959",
    image: "/about-img/about-img-old.jpg",
    reversed: false,
    text: "In 1959, our journey began with a simple idea: to create footwear that combined style, comfort, and innovation. Starting from a small workshop, our founders poured passion into every pair, establishing a brand that would eventually redefine sneaker culture. Every step we took laid the foundation for the community and legacy we celebrate today.",
  },
  {
    id: "history",
    chapter: "02",
    eyebrow: "The Journey",
    heading: "History & Milestones",
    image: "/about-img/about-img2.jpg",
    reversed: true,
    text: "Over the decades, we've achieved remarkable milestones that shaped our brand. From our first limited edition release in 1975 to collaborating with legendary athletes and designers in the 1990s, each moment reflects our dedication to quality and authenticity. These pivotal experiences not only expanded our reach but also strengthened our connection with sneaker enthusiasts worldwide.",
  },
  {
    id: "vision",
    chapter: "03",
    eyebrow: "The Future",
    heading: "Our Vision & Legacy",
    image: "/about-img/about-img1.webp",
    reversed: false,
    text: "Today, we continue to honor our roots while pushing boundaries in design and innovation. Our vision is to craft sneakers that inspire self-expression and celebrate culture. From iconic collaborations to limited-edition drops, every creation tells a story — a story of heritage, creativity, and the enduring love for sneakers that unites our global community.",
  },
];

function useInViewOnce(options) {
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
      options ?? { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

export default function AboutComp() {
  return (
    <div className="w-full bg-white">
      <StoryBanner />
      <div className="divide-y divide-black/5">
        {SECTIONS.map((section, index) => (
          <AboutSection key={section.id} {...section} index={index} />
        ))}
      </div>
    </div>
  );
}



function AboutSection({ chapter, eyebrow, heading, text, image, reversed }) {
  const [ref, inView] = useInViewOnce();
  const cls = `transition-all duration-700 ease-out ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const imgCls = `transition-all duration-1000 ease-out ${
    inView ? "translate-x-0 opacity-100" : "opacity-0 " + (reversed ? "translate-x-4" : "-translate-x-4")
  }`;
  const delay = (ms) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={ref}
      className={`flex flex-col items-stretch bg-white md:flex-row ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
      aria-labelledby={`about-section-${heading.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div
        className={`group relative h-[420px] w-full shrink-0 overflow-hidden bg-gray-100 sm:h-[480px] md:h-auto md:min-h-[560px] md:w-1/2 lg:min-h-[640px] ${imgCls}`}
      >
        <Image
          src={image}
          alt={heading}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 md:w-1/2 md:px-12 md:py-20 lg:px-16 lg:py-24">
        <div className="max-w-xl">
          <div className={cls} style={delay(120)}>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-[-0.04em] text-[#ff8800] sm:text-4xl">
                {chapter}
              </span>
              <span className="h-px w-10 bg-[#ff8800]/50 sm:w-12" aria-hidden />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                {eyebrow}
              </span>
            </div>
          </div>

          <h2
            id={`about-section-${heading.replace(/\s+/g, "-").toLowerCase()}`}
            className={`mt-5 text-3xl font-black uppercase leading-tight tracking-[-0.02em] text-gray-900 sm:text-4xl lg:text-5xl ${cls}`}
            style={delay(260)}
          >
            {heading}
          </h2>

          <p
            className={`mt-6 text-base font-light leading-relaxed text-gray-700 sm:text-lg ${cls}`}
            style={delay(400)}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
