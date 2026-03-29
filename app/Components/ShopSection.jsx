"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
     Heart,
     Star,
     ShoppingBag,
} from 'lucide-react';
import { useProducts } from "@/app/context/ProdContext"; 
import { slugify } from '../utils';

/**
 * Noir Atelier Shop Section
 * Consistently Dark/Premium theme for the Fragrance Compendium
 */
const ShopSection = () => {
     const [wishlist, setWishlist] = useState([]);
     const { products } = useProducts();
     
     // Helper to map our high-quality images to products (Consistent across site)
     const getProductImage = (name) => {
          if (!name) return "/avoire.jpg";
          const normalizedName = name.toLowerCase().trim();
          const map = {
               "azure legend": "/imgs/Azure Legend.jpeg",
               "eternal oud": "/imgs/Eternal Oud.jpeg",
               "infinite noir": "/imgs/Infinite Noir.jpeg",
               "libre essence": "/imgs/Libre Essence.jpeg",
               "lumine romance": "/imgs/Lumine Romance.jpeg",
               "noctura black": "/imgs/Noctura Black.jpeg",
               "veloura bloom": "/imgs/Veloura Bloom.jpeg",
               "verde silver": "/imgs/Verde Silver.jpeg"
          };
          return map[normalizedName] || "/avoire.jpg";
     };

     if (!products.length) return <p className="p-10 text-accent/40 animate-pulse">Loading the Atelier...</p>;

     const productKey = (p) => String(p._id ?? p.id ?? p.slug ?? p.name);

     const toggleWishlist = (id) => {
          setWishlist((prev) =>
               prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          );
     };

     // Noir Atelier Theme Colors
     const colors = {
          bg: 'bg-transparent',
          card: 'bg-[#1a1a19]',
          border: 'border-[#353535]',
          text: 'text-[#e5e2e1]',
          accent: 'text-accent',
          muted: 'text-[#e5e2e1]/40'
     };

     return (
          <div className={`${colors.bg} selection:bg-accent selection:text-[#131313] font-sans ${colors.text}`}>
               <div className="max-w-7xl mx-auto px-4 md:px-0">
                    
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                         {products.slice(0, 4).map((perfume) => {
                              const pid = productKey(perfume);
                              const isWishlisted = wishlist.includes(pid);
                              
                              return (
                              <div key={pid} className="group flex flex-col h-full">
                                   {/* Image Container */}
                                   <div className={`relative aspect-[3/4] ${colors.card} border ${colors.border} rounded-[2rem] overflow-hidden group-hover:border-accent/40 transition-all duration-700 shadow-xl`}>
                                        <Link href={`/shop/${slugify(perfume.name)}`} className="block w-full h-full relative z-10">
                                             <img
                                                  src={getProductImage(perfume.name)}
                                                  alt={perfume.name}
                                                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                             />
                                             <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
                                        </Link>

                                        {/* Wishlist Button */}
                                        <button
                                             onClick={() => toggleWishlist(pid)}
                                             className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border border-white/10 transition-all duration-500 z-20 ${isWishlisted ? 'bg-accent text-[#131313]' : 'bg-[#131313]/40 text-white hover:bg-accent hover:text-[#131313]'}`}
                                        >
                                             <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                                        </button>

                                        {/* Floating Quick Add (Desktop only overlay) */}
                                        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex justify-center">
                                            <div className="bg-[#131313]/80 backdrop-blur-xl border border-accent/20 px-4 py-2 rounded-full flex items-center space-x-2">
                                                <Star size={10} className="text-accent" fill="currentColor" />
                                                <span className="text-[9px] uppercase tracking-widest font-bold">Signature Scent</span>
                                            </div>
                                        </div>
                                   </div>

                                   {/* Product Info */}
                                   <div className="mt-8 flex flex-col flex-1 items-center text-center space-y-4">
                                        <div className="space-y-2">
                                             <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent block opacity-80 mb-2">{perfume.note || 'Collection'}</span>
                                             <Link href={`/shop/${slugify(perfume.name)}`}
                                                  className="text-2xl font-headline italic hover:text-accent transition-colors block text-[#e5e2e1]">
                                                  {perfume.name}
                                             </Link>
                                             <p className="text-lg font-light tracking-tight opacity-60">{perfume.price} PKR</p>
                                        </div>

                                        <div className="w-full pt-4 mt-auto">
                                             <button
                                                  onClick={() => {}}
                                                  className="w-full h-12 border border-[#353535] text-[#e5e2e1] text-[10px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-accent hover:text-[#131313] hover:border-accent transition-all duration-500 flex items-center justify-center space-x-4 group/btn"
                                             >
                                                  <span>Add to Bag</span>
                                                  <ShoppingBag size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500" />
                                             </button>
                                        </div>
                                   </div>
                              </div>
                              );
                         })}
                    </div>

               </div>
          </div>
     );
}

export default ShopSection
