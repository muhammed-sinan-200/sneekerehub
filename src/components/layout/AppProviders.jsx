"use client";

import dynamic from "next/dynamic";
import { CartProvider } from "@/context/CartContext";
import { ModalProvider, useModal } from "@/context/ModalContext";

const ProductModal = dynamic(() => import("@/components/product/ProductModal"), {
  ssr: false,
});

function ProductModalGate() {
  const { showModal, selectedProduct } = useModal();

  if (!showModal && !selectedProduct) return null;

  return <ProductModal />;
}

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      <ModalProvider>
        {children}
        <ProductModalGate />
      </ModalProvider>
    </CartProvider>
  );
}
