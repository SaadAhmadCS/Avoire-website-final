"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const BottomNav = () => {
  const { cartItems } = useCart();
  const total_items = cartItems.reduce((t, i) => t + (i.qty || 0), 0);

  const phrases = [
    "Timeless Elegance",
    "Signature Scents",
    "Luxury Fragrance",
    "Pure Essence"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState("opacity-100");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade("opacity-0");
      setTimeout(() => {
        setIndex((p) => (p + 1) % phrases.length);
        setFade("opacity-100");
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full px-6 py-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-widest">
          AVOIRE
        </Link>

        {/* Tagline */}
        <h2 className="text-sm md:text-lg italic text-center">
          Discover&nbsp;
          <span className={`font-semibold transition-opacity duration-500 ${fade}`}>
            {phrases[index]}
          </span>
        </h2>

        {/* Cart */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {total_items > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {total_items}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
};

export default BottomNav;