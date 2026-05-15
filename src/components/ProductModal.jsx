"use client";

import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { useModal } from "@/context/ModalContext";
import { useCart } from "@/context/CartContext";

export default function ProductModal() {
  const { showModal, selectedProduct, closeModal } = useModal();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  // Reset size selection each time a new product opens.
  useEffect(() => {
    if (showModal) setSelectedSize(null);
  }, [showModal, selectedProduct]);

  // Lock body scroll while the modal is open.
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

  // Close on Escape key.
  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showModal, closeModal]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("select your size");
      return;
    }
    addToCart({ ...selectedProduct, selectedSize });
    closeModal();
  };

  // Keep the product data while the closing animation plays out.
  if (!selectedProduct) return null;

  return (
    // z-[100] sits above the sticky navbar (z-50).
    <div
      role="dialog"
      aria-modal="true"
      aria-label={selectedProduct.name}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        showModal ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded bg-white shadow-xl">
        <div className="flex justify-end p-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded p-1 text-gray-500 transition-colors hover:text-gray-900"
            aria-label="Close"
          >
            <HiX size={22} />
          </button>
        </div>

        <div className="grid gap-6 px-6 pb-8 sm:grid-cols-2 sm:items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="w-full rounded object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedProduct.name}
            </h3>
            <p className="mt-2 text-gray-600">
              green output /dolor sit amet, consectetur
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              ${selectedProduct.price}
            </p>

            <h5 className="mt-5 text-base font-medium text-gray-900">
              Shoe Size (UK)
            </h5>
            <div className="mt-3 flex flex-wrap gap-3">
              {selectedProduct.sizes.map((size, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[2.5rem] rounded-none border px-3 py-1.5 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-gray-900 bg-black text-white"
                      : "border-gray-900 bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-none border border-black bg-white px-5 py-2 text-sm text-gray-900 transition-colors hover:bg-black hover:text-white"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="rounded-none border border-black bg-white px-5 py-2 text-sm text-gray-900 transition-colors hover:bg-black hover:text-white"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
