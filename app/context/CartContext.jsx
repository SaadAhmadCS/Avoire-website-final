
//CartContext
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // normalize product id
  const normalizeProduct = (product) => ({
    ...product,
    _id: product._id ?? product.id ?? product.slug,
  });

  const addToCart = (product, qty = 1) => {
    const normalized = normalizeProduct(product);

    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === normalized._id);

      if (exists) {
        return prev.map((i) =>
          i._id === normalized._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [...prev, { ...normalized, qty }];
    });
  };

  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== _id));
  };

  const updateQty = (_id, qty) => {
    setCartItems((prev) =>
      prev.map((i) => (i._id === _id ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

