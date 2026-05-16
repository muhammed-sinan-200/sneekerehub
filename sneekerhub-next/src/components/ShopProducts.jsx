"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import ProductCard from "@/components/ui/ProductCard";
import { useModal } from "@/context/ModalContext";

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name: A–Z" },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "new", label: "New Arrivals" },
];

const SKELETON_COUNT = 8;

export default function ShopProducts() {
  const { openModal } = useModal();
  const [products, setProducts] = useState(null);
  const [filterId, setFilterId] = useState("all");
  const [sortId, setSortId] = useState("featured");
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
        setProducts(data);
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
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLoading = products === null;
  const items = products ?? [];

  const visibleItems = useMemo(() => {
    let list = items;
    if (filterId === "new") {
      list = list.filter((p) => p.category === "new");
    }

    if (sortId === "featured") return list;

    const sorter =
      sortId === "price-asc"
        ? (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
        : sortId === "price-desc"
          ? (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
          : sortId === "name"
            ? (a, b) => String(a.name).localeCompare(String(b.name))
            : null;

    return sorter ? [...list].sort(sorter) : list;
  }, [items, filterId, sortId]);

  const totalCount = visibleItems.length;
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.id === sortId)?.label ?? "Featured";

  const revealCls = `transition-all duration-700 ease-out ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;
  const delay = (ms) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={sectionRef}
      id="shop-products"
      aria-labelledby="shop-products-heading"
      className="relative bg-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <div className={revealCls} style={delay(100)}>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                Shop Collection
              </span>
            </div>
          </div>

          <h3
            id="shop-products-heading"
            className={`mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-6xl ${revealCls}`}
            style={delay(220)}
          >
            <span className="shimmer-heading">Sneekers</span>
          </h3>

          <p
            className={`mt-4 text-base font-light leading-relaxed text-gray-600 sm:text-lg ${revealCls}`}
            style={delay(340)}
          >
            Every silhouette, every drop — handpicked for the SneekerHub
            collection.
          </p>
        </div>

        <div
          className={`mt-10 flex flex-col gap-5 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${revealCls}`}
          style={delay(450)}
        >
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter products"
          >
            {FILTERS.map((f) => {
              const isActive = filterId === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilterId(f.id)}
                  className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.2em] transition-all duration-200 active:scale-95 sm:text-[11px] ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:text-black hover:ring-gray-300"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:justify-end">
            {!isLoading && (
              <p
                className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gray-500"
                aria-live="polite"
              >
                <span className="text-gray-900">{totalCount}</span>{" "}
                {totalCount === 1 ? "product" : "products"}
              </p>
            )}

            <label className="relative inline-flex items-center">
              <span className="sr-only">Sort products</span>
              <span
                className="pointer-events-none inline-flex items-center rounded-full bg-white py-2 pl-4 pr-9 text-[10.5px] font-bold uppercase tracking-[0.18em] text-gray-900 ring-1 ring-gray-200 sm:text-[11px]"
                aria-hidden
              >
                Sort · {currentSortLabel}
              </span>
              <HiOutlineChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
              <select
                value={sortId}
                onChange={(e) => setSortId(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0 focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonCard key={`sk-${i}`} />
              ))
            : visibleItems.map((product, i) => (
                <StaggerCard
                  key={product.id}
                  inView={inView}
                  delay={500 + i * 75}
                >
                  <ProductCard
                    product={product}
                    onProductClick={openModal}
                  />
                </StaggerCard>
              ))}
        </div>

        {!isLoading && visibleItems.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
              No products match this filter
            </p>
            <p className="mt-2 text-sm font-light text-gray-400">
              Try a different category or check back soon.
            </p>
          </div>
        )}
      </div>
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
