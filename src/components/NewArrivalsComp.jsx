"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import ProductCard from "@/components/ui/ProductCard";

const SKELETON_COUNT = 4;
const REVEAL_BASE_MS = 0;
const HEADER_STAGGER = [100, 220, 340, 450];
const CARD_STAGGER_OFFSET = 380;
const CARD_STAGGER_STEP = 110;

export default function NewArrivalsComp({ onProductClick }) {
  const [products, setProducts] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/Products.json");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        if (cancelled) return;
        setProducts(data.filter((p) => p.category === "new"));
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load products:", error);
        setProducts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLoading = products === null;
  const items = products ?? [];
  const hasItems = !isLoading && items.length > 0;

  const revealCls = `transition-all duration-700 ease-out ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const delay = (ms) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={sectionRef}
      id="new-arrivals"
      aria-labelledby="new-arrivals-heading"
      className="relative bg-white"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div
              className={revealCls}
              style={delay(REVEAL_BASE_MS + HEADER_STAGGER[0])}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-10 bg-[#ff8800] sm:w-12"
                  aria-hidden
                />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                  Just Dropped
                </span>
              </div>
            </div>

            <h2
              id="new-arrivals-heading"
              className={`mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-6xl ${revealCls}`}
              style={delay(REVEAL_BASE_MS + HEADER_STAGGER[1])}
            >
              <span className="shimmer-heading">New Arrivals</span>
            </h2>

            <p
              className={`mt-4 text-base font-light leading-relaxed text-gray-600 sm:text-lg ${revealCls}`}
              style={delay(REVEAL_BASE_MS + HEADER_STAGGER[2])}
            >
              Handpicked silhouettes from this season&apos;s freshest drops.
            </p>
          </div>

          <Link
            href="/shop"
            className={`group hidden items-center gap-2 self-start text-[11.5px] font-bold uppercase tracking-[0.22em] text-gray-900 transition-colors hover:text-[#ff8800] lg:inline-flex lg:self-end ${revealCls}`}
            style={delay(REVEAL_BASE_MS + HEADER_STAGGER[3])}
          >
            <span className="border-b border-gray-900 pb-0.5 transition-colors duration-300 group-hover:border-[#ff8800]">
              View All
            </span>
            <HiArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} />
              ))
            : items.map((product, i) => (
                <StaggerCard
                  key={product.id}
                  inView={inView}
                  delay={CARD_STAGGER_OFFSET + i * CARD_STAGGER_STEP}
                >
                  <ProductCard
                    product={product}
                    onProductClick={onProductClick}
                  />
                </StaggerCard>
              ))}
        </div>

        {!isLoading && items.length === 0 && (
          <div className="mt-4 rounded border border-dashed border-gray-200 py-16 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
              No new arrivals at the moment
            </p>
            <p className="mt-2 text-sm font-light text-gray-400">
              Check back soon for the next drop.
            </p>
          </div>
        )}

        {hasItems && (
          <div
            className={`mt-12 flex justify-center lg:hidden ${revealCls}`}
            style={delay(700)}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#ff8800] hover:text-black active:scale-[0.97]"
            >
              Shop All Sneakers
              <HiArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        aria-hidden
      />
    </section>
  );
}

function StaggerCard({ inView, delay, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const shown = mounted && inView;

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="flex animate-pulse flex-col gap-3 rounded bg-white p-3"
      aria-hidden
    >
      <div className="h-[150px] w-full rounded bg-gray-100" />
      <div className="mx-auto h-3 w-3/5 rounded bg-gray-100" />
      <div className="mx-auto h-3 w-1/4 rounded bg-gray-100" />
      <div className="mx-auto mt-2 h-7 w-7 rounded-full bg-gray-100" />
    </div>
  );
}
