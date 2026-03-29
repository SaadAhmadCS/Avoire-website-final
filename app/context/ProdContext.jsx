

// app/context/ProdContext.js 
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProdContext = createContext();

export function ProdProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    load();
  }, []);

  // Provide both products and setter
  return (
    <ProdContext.Provider value={{ products, setProducts }}>
      {children}
    </ProdContext.Provider>
  );
}

// Hook to use in components
export function useProducts() {
  return useContext(ProdContext);
}