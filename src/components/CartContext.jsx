import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : []
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {

      const existingItem = prevItems.find((item) =>
        item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);

      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
