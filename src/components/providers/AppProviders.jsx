"use client";

import { CartProvider } from "@/context/CartContext";
import { ModalProvider } from "@/context/ModalContext";
import ProductModal from "@/components/ProductModal";

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      <ModalProvider>
        {children}
        <ProductModal />
      </ModalProvider>
    </CartProvider>
  );
}
