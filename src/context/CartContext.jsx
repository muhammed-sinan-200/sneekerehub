"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const CartContext = createContext(null);
const PERSIST_DEBOUNCE_MS = 300;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItemsRef = useRef(cartItems);
  const isHydratedRef = useRef(isHydrated);

  cartItemsRef.current = cartItems;
  isHydratedRef.current = isHydrated;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (saved) setCartItems(JSON.parse(saved));
    } catch {
      setCartItems([]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const timeoutId = window.setTimeout(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, PERSIST_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [cartItems, isHydrated]);

  useEffect(() => {
    return () => {
      if (!isHydratedRef.current) return;
      localStorage.setItem("cartItems", JSON.stringify(cartItemsRef.current));
    };
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      isHydrated,
    }),
    [cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, isHydrated],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
