"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  ChevronRight,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/LikeContext";

const MainNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const { likedItems } = useWishlist();
  const total_items = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0,
  );
  const total_liked_items = likedItems.length;

  const phrases = [
    "Elegance in Every Drop.",
    "Luxury You Can Smell.",
    "Avoire: Pure Sensation.",
    "Scents That Inspire.",
  ];

  const [index, setIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState("opacity-100");
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp("opacity-0");
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFadeProp("opacity-100");
      }, 500);
    }, 4000);

    return () => clearInterval(timeout);
  }, []);

  const IconLink = ({ href, icon: Icon, label }) => (
    <Link
      href={href}
      aria-label={label}
      className="p-2 transition-transform duration-200 hover:scale-110 hover:opacity-80 rounded-full text-text-primary"
    >
      <Icon size={24} />
    </Link>
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  // }, [isMobileMenuOpen]);
  return (
    <nav
      className={`fixed ${isScrolled ? "top-0" : "top-[32px]"} left-0 w-full z-50 transition-all duration-500 ease-in-out  ${
        isScrolled
          ? "bg-white/80 md:backdrop-blur-md py-3 border-stone-200"
          : "bg-[#f3eadf] py-6 border border-b-[1px] "
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
        {/* Left: Desktop Links */}
        <div className="flex-1 flex justify-start">
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] uppercase tracking-[0.15em] font-medium hover:text-stone-500 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="relative group">
              <span className="text-[12px] uppercase tracking-[0.15em] font-medium cursor-pointer">
                Pages
              </span>

              <div className="absolute left-0 top-6 w-44 bg-white border border-stone-200 shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                {[
                  { name: "Wishlist", href: "/wishlist" },
                  { name: "Cart", href: "/cart" },
                  { name: "Checkout", href: "/checkout" },
                  { name: "Account", href: "/account" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-xs tracking-widest uppercase hover:bg-stone-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[20px] md:text-4xl font-serif tracking-[0.3em] uppercase transition-all duration-500">
              Avoire
            </span>
            <span className="text-[8px] tracking-[0.4em] uppercase opacity-60 mt-1">
              Perfume
            </span>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
          <a
            href="/account"
            className="p-1 hover:text-stone-500 transition-colors"
            aria-label="Account"
          >
            <User size={20} strokeWidth={1.5} />
          </a>
          <Link
            href="/wishlist"
            className="p-1 hover:text-stone-500 transition-colors relative"
          >
            <Heart size={20} strokeWidth={1.5} />
            {total_liked_items > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-800 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {total_liked_items}
              </span>
            )}
          </Link>
          <a
            href="/cart"
            className="p-1 hover:text-stone-500 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-stone-800 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {total_items}
            </span>
          </a>
          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-accent/20 backdrop-blur-sm transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px]
  bg-bg-page backdrop-blur-none
  z-[101] shadow-2xl transition-transform duration-500 ease-in-out
  ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-headline tracking-widest uppercase">
              Avoire
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          <nav className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-between text-2xl font-headline border-b border-border-subtle pb-4 group"
              >
                <span>{link.name}</span>
                <ChevronRight
                  size={18}
                  className="text-text-disabled group-hover:translate-x-1 transition-transform"
                />
              </a>
            ))}
            <div className="pt-6">
              <p className="text-2xl uppercase tracking-widest text-text-disabled mb-4">
                Pages
              </p>

              {[
                { name: "Wishlist", href: "/wishlist" },
                { name: "Cart", href: "/cart" },
                { name: "Checkout", href: "/checkout" },
                { name: "Account", href: "/account" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between text-lg font-headline border-b border-border-subtle pb-4 group"
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} />
                </a>
              ))}
            </div>
            <a
              href="#"
              className="flex items-center justify-between text-2xl font-headline border-b border-border-subtle pb-4 group"
            >
              <span>Account</span>
              <ChevronRight
                size={18}
                className="text-text-disabled group-hover:translate-x-1 transition-transform"
              />
            </a>
          </nav>

          <div className="mt-auto pb-8">
            <div className="p-6 bg-bg-subtle rounded-lg">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-4 text-center font-medium">
                Join the Avoire Circle
              </p>
              <div className="flex shadow-sm">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-bg-card border-none w-full px-4 py-3 text-sm focus:ring-1 focus:ring-border-default outline-none"
                />
                <button className="bg-accent text-text-inverse px-4 py-3 text-[10px] uppercase tracking-tighter hover:bg-accent-hover transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </nav>

    // <nav
    //   aria-label="Main navigation and search"
    //   className="w-full px-4 py-3 sm:px-6 lg:px-8 bg-primary"
    // >
    //   <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">

    //     {/* Left Section: Brand Name */}
    //     <div>
    //       <Link href="/" className="text-2xl font-logo font-extrabold tracking-wide text-text-primary">
    //         <span className="text-accent-secondary">Avoire</span>
    //       </Link>
    //     </div>

    //     {/* Middle Section: Brand Tagline */}
    //     <div className="max-w-2xl order-3 w-full md:w-auto flex flex-col items-center md:items-start justify-center px-4">
    //       <h2 className="text-lg md:text-xl lg:text-2xl font-serif italic tracking-wide text-text-inverse">
    //         Indulge Your Senses with{" "}
    //         <span className={`font-bold not-italic transition-opacity duration-500 ${fadeProp}`}>
    //           {phrases[index]}
    //         </span>
    //       </h2>
    //       <p className="text-[10px] hidden sm:flex uppercase tracking-[0.2em] text-text-inverse mt-1 font-medium">
    //         Luxury Perfumes Curated for You
    //       </p>
    //     </div>

    //     {/* Right Section: User Icons */}
    //     <div className="flex items-center space-x-4 order-4">
    //       {/* Wishlist */}
    //       <Link href="/wishlist" className="relative inline-flex items-center text-text-inverse">
    //         <Heart className="w-6 h-6" />
    //         <span className="absolute -top-2 -right-2 bg-accent-secondary text-text-inverse text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
    //           {total_liked_items}
    //         </span>
    //       </Link>

    //       {/* Cart */}
    //       <Link href="/cart" className="relative inline-flex items-center text-text-inverse">
    //         <ShoppingCart className="w-6 h-6" />
    //         <span className="absolute -top-2 -right-2 bg-accent-secondary text-text-inverse text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
    //           {total_items}
    //         </span>
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default MainNavbar;
