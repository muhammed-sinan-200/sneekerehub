"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  HiOutlineXMark,
  HiOutlineCheckBadge,
  HiOutlineLockClosed,
  HiOutlineArrowPath,
  HiOutlineExclamationCircle,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { useModal } from "@/context/ModalContext";
import { useCart } from "@/context/CartContext";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatPrice = (value) => CURRENCY_FORMATTER.format(Number(value) || 0);

export default function ProductModal() {
  const { showModal, selectedProduct, closeModal } = useModal();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [addState, setAddState] = useState("idle");

  useEffect(() => {
    if (showModal) {
      setSelectedSize(null);
      setSizeError(false);
      setAddState("idle");
    }
  }, [showModal, selectedProduct]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal, closeModal]);

  useEffect(() => {
    if (selectedSize) setSizeError(false);
  }, [selectedSize]);

  const handleAddToCart = () => {
    if (addState !== "idle") return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart({ ...selectedProduct, selectedSize });
    setAddState("added");
    setTimeout(() => {
      closeModal();
    }, 700);
  };

  if (!selectedProduct) return null;

  const eyebrow =
    selectedProduct.category === "new" ? "Just Dropped" : "SneekerHub Curated";
  const isAdded = addState === "added";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={selectedProduct.name}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 transition-opacity duration-200 ease-out sm:p-6 ${
        showModal ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        className={`relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] transition-all duration-200 ease-out ${
          showModal
            ? "translate-y-0 scale-100"
            : "translate-y-2 scale-[0.97]"
        }`}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm transition-all duration-200 hover:bg-black hover:text-white active:scale-90 sm:right-5 sm:top-5"
          aria-label="Close"
        >
          <HiOutlineXMark className="h-5 w-5" />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="group relative aspect-square overflow-hidden bg-gray-50 sm:aspect-auto sm:min-h-full sm:rounded-l-2xl">
            <Image
              src={selectedProduct.img}
              alt={selectedProduct.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent sm:hidden"
              aria-hidden
            />
          </div>

          <div className="flex flex-col px-6 py-7 sm:px-8 sm:py-10 lg:px-10">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8 bg-[#ff8800] sm:w-10"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11px]">
                {eyebrow}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[-0.02em] text-gray-900 sm:text-3xl lg:text-[2.125rem]">
              {selectedProduct.name}
            </h3>

            <p className="mt-3 text-sm font-light leading-relaxed text-gray-600 sm:text-base">
              Premium silhouette crafted for everyday wear — engineered comfort,
              refined finish.
            </p>

            <p className="mt-5 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              {formatPrice(selectedProduct.price)}
            </p>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-900">
                  Select Size
                  <span className="ml-2 font-medium text-gray-400">UK</span>
                </h4>
                <button
                  type="button"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 underline-offset-4 transition-colors hover:text-black hover:underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {selectedProduct.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={isSelected}
                      className={`relative flex h-11 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-200 active:scale-95 ${
                        isSelected
                          ? "border-black bg-black text-white shadow-[0_4px_14px_rgba(15,23,42,0.18)]"
                          : sizeError
                            ? "border-red-300 bg-red-50/40 text-gray-700 hover:border-black hover:bg-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-black hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {sizeError && (
                <p
                  role="alert"
                  className="mt-3 inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-red-600"
                >
                  <HiOutlineExclamationCircle
                    className="h-4 w-4"
                    aria-hidden
                  />
                  Please select a size to continue
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 active:scale-[0.98] disabled:cursor-default ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-black text-white hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_40px_rgba(255,136,0,0.35)]"
              }`}
            >
              {isAdded ? (
                <>
                  <HiOutlineCheckBadge className="h-4 w-4" aria-hidden />
                  Added to Bag
                </>
              ) : (
                <>
                  <HiOutlineShoppingBag className="h-4 w-4" aria-hidden />
                  Add to Bag
                </>
              )}
            </button>

            <ul className="mt-7 grid grid-cols-3 gap-3 border-t border-black/5 pt-5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              <li className="flex flex-col items-center gap-1.5 text-center">
                <HiOutlineLockClosed
                  className="h-4 w-4 text-gray-400"
                  aria-hidden
                />
                <span>Secure</span>
              </li>
              <li className="flex flex-col items-center gap-1.5 text-center">
                <HiOutlineArrowPath
                  className="h-4 w-4 text-gray-400"
                  aria-hidden
                />
                <span>10-Day Returns</span>
              </li>
              <li className="flex flex-col items-center gap-1.5 text-center">
                <HiOutlineCheckBadge
                  className="h-4 w-4 text-gray-400"
                  aria-hidden
                />
                <span>Authentic</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
