"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Menu, X, Heart, Search } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/LikeContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const { likedItems } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + (item.qty || 0), 0);
  const totalLiked = likedItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-[#131313]/80 backdrop-blur-xl shadow-[0_40px_40px_-15px_rgba(229,226,225,0.04)] py-4"
            : "bg-transparent py-8"
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-accent font-headline transition-transform duration-500 hover:scale-105"
          >
            Avoire
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-primary opacity-80 font-headline tracking-tight leading-relaxed hover:text-accent hover:opacity-100 transition-all duration-500 text-sm uppercase tracking-widest relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent/40 transition-all duration-500 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/wishlist" className="text-accent hover:scale-110 transition-transform relative">
              <Heart size={22} strokeWidth={1.5} />
              {totalLiked > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-inverse-surface text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalLiked}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-accent hover:scale-110 transition-transform relative">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-inverse-surface text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/account" className="hidden sm:block text-accent hover:scale-110 transition-transform">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-accent"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#131313]/90 backdrop-blur-md transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-12">
          <div className="flex justify-between items-center mb-24">
            <span className="text-2xl font-bold tracking-tight text-accent font-headline">Avoire</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-accent">
              <X size={32} strokeWidth={1} />
            </button>
          </div>
          <nav className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-headline italic text-text-primary/40 hover:text-accent hover:not-italic transition-all duration-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-12 border-t border-border-subtle">
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-headline text-accent flex items-center gap-4"
            >
              <User size={20} /> Account Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
