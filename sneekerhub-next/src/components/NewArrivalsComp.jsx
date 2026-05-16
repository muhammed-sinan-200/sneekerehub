"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

export default function NewArrivalsComp({ onProductClick }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Products.json");
        const data = await response.json();
        setProducts(data.filter((p) => p.category === "new"));
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        <span className="shimmer-heading">NEW ARRIVALS</span>
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
}
