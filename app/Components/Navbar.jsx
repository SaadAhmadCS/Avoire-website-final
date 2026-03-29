// "use client";
// import React, { useState, useEffect } from "react";
// import { Search, ShoppingBag, Menu, X } from "lucide-react";
// import Link from "next/link";

// const Navbar = ({ variant = "transparent" }) => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const isLight = variant === "transparent" && !scrolled;

//   const textClass = isLight ? "text-white" : "text-[#1a1a1a]";
//   const linkClass = `hidden md:block text-[11px] uppercase tracking-widest font-semibold transition-opacity hover:opacity-50 ${textClass}`;

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isLight
//           ? "bg-transparent py-5"
//           : "bg-[#f3eadf]/95 backdrop-blur-md border-b border-[#dccab8] py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//         {/* Left */}
//         <div className="flex items-center space-x-8">
//           <button
//             aria-label="Search"
//             className={`transition-opacity hover:opacity-50 ${textClass}`}
//           >
//             <Search size={20} />
//           </button>
//           <Link href="/shop" className={linkClass}>
//             Collections
//           </Link>
//           <Link href="/about" className={linkClass}>
//             About
//           </Link>
//         </div>

//         {/* Center wordmark */}
//         <Link
//           href="/"
//           className={`text-2xl font-display tracking-[0.4em] uppercase font-bold transition-colors duration-500 ${textClass}`}
//         >
//           AVOIRE
//         </Link>

//         {/* Right */}
//         <div className="flex items-center space-x-8">
//           <Link href="/contact" className={linkClass}>
//             Contact
//           </Link>
//           <button
//             aria-label="Shopping bag"
//             className={`relative transition-opacity hover:opacity-50 ${textClass}`}
//           >
//             <ShoppingBag size={20} />
//             <span
//               className={`absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold ${
//                 isLight
//                   ? "bg-white text-[#1a1a1a]"
//                   : "bg-[#1a1a1a] text-white"
//               }`}
//             >
//               0
//             </span>
//           </button>
//           <button
//             aria-label="Menu"
//             className={`md:hidden transition-opacity hover:opacity-50 ${textClass}`}
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile drawer */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ${
//           mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <nav className="bg-[#f3eadf] border-t border-[#dccab8] px-6 py-8 space-y-5">
//           {[
//             { href: "/shop", label: "Collections" },
//             { href: "/about", label: "About" },
//             { href: "/contact", label: "Contact" },
//           ].map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               onClick={() => setMobileOpen(false)}
//               className="block text-[12px] uppercase tracking-widest font-semibold text-[#1a1a1a] hover:opacity-50 transition-opacity"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
