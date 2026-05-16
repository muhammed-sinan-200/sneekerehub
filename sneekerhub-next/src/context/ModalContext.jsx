"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Delay clearing the product so the close animation doesn't flash blank content.
    setTimeout(() => setSelectedProduct(null), 200);
  };

  return (
    <ModalContext.Provider value={{ selectedProduct, showModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}
