"use client";

import Image from "next/image";
import { TbShoppingBagPlus } from "react-icons/tb";

export default function ProductCard({ product, onProductClick }) {
  return (
    <article
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded border border-transparent bg-white text-center transition-colors hover:border-black"
      onClick={() => onProductClick?.(product)}
    >
      {/* Fixed-height container lets next/image fill optimise + lazy-load the asset */}
      <div className="relative h-[150px] overflow-hidden">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between px-3 py-4">
        <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
          {product.name}
        </p>
        <p className="mb-3 text-sm font-semibold text-gray-900">
          ${product.price}
        </p>
        <TbShoppingBagPlus
          size={30}
          className="text-[rgba(78,75,75,0.88)] transition-colors hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            onProductClick?.(product);
          }}
          aria-label={`View ${product.name}`}
        />
      </div>
    </article>
  );
}
