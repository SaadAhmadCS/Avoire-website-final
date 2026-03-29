"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LikeContext = createContext();

export const WishListProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [total_items, setTotal_items] = useState(0);

  const addToWishlist = (product, qty = 1) => {
    setLikedItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };
// act as toggle like btn
  // const addToWishlist = (product) => {
  //   setLikedItems(prev => {
  //     const exists = prev.find(item => item.id === product.id);

  //     if (exists) {
  //       return prev.filter(item => item.id !== product.id); // remove if already exists
  //     }

  //     return [...prev, product];
  //   });
  // };
  const removeFromWishlist = (id) => {
  setLikedItems((prev) => prev.filter((item) => item.id !== id));
};

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("likedItems");
    if (stored) {
      setLikedItems(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when likedItems changes
  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
    setTotal_items(likedItems.length);
  }, [likedItems]);

  return (
    <LikeContext.Provider value={{ likedItems, addToWishlist,removeFromWishlist, total_items }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useWishlist = () => useContext(LikeContext);
