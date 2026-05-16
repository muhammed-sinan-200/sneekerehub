"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

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
      <HeroHeader />
      <div className="divide-y divide-black/5">
        {SECTIONS.map((section, index) => (
          <AboutSection key={section.id} {...section} index={index} />
        ))}
      </div>
      <ClosingCTA />
    </div>
  );
}

function HeroHeader() {
  const [ref, inView] = useInViewOnce();
  const cls = `transition-all duration-700 ease-out ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const delay = (ms) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={ref}
      className="relative bg-gray-50"
      aria-labelledby="about-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className={cls} style={delay(100)}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                About SneekerHub
              </span>
            </div>
          </div>

          <h1
            id="about-hero-heading"
            className={`mt-5 text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] text-gray-900 sm:text-6xl lg:text-7xl xl:text-[5.5rem] ${cls}`}
            style={delay(240)}
          >
            <span className="block">Our</span>
            <span className="block">
              Story<span className="text-[#ff8800]">.</span>
            </span>
          </h1>

          <p
            className={`mt-6 max-w-xl text-base font-light leading-relaxed text-gray-600 sm:text-lg ${cls}`}
            style={delay(380)}
          >
            From a small workshop in 1959 to a global sneaker culture brand —
            discover the heritage, craftsmanship, and community that define
            SneekerHub.
          </p>
        </div>
      </div>
    </section>
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

function ClosingCTA() {
  const [ref, inView] = useInViewOnce();
  const cls = `transition-all duration-700 ease-out ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const delay = (ms) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={ref}
      className="relative bg-gray-50"
      aria-labelledby="about-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <div className={cls} style={delay(100)}>
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                Continue the Story
              </span>
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
            </div>
          </div>

          <h2
            id="about-cta-heading"
            className={`mt-5 text-4xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-6xl ${cls}`}
            style={delay(240)}
          >
            Step Into
            <br />
            the Story
            <span className="text-[#ff8800]">.</span>
          </h2>

          <p
            className={`mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-gray-600 sm:text-lg ${cls}`}
            style={delay(380)}
          >
            Every great story deserves a next chapter. Discover the collection
            that carries it forward.
          </p>

          <div
            className={`mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 ${cls}`}
            style={delay(520)}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_40px_rgba(255,136,0,0.35)] active:scale-[0.97] sm:text-[12px]"
            >
              Shop Collection
              <HiArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-900 transition-all duration-300 hover:border-black hover:bg-black hover:text-white sm:text-[12px]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
