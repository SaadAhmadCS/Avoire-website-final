
"use client";

import React, { useState } from "react";
import {
  Heart,
  ShoppingBag,
  X,
  ArrowRight,
  Plus,
  Sparkles,
  Trash2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/app/context/LikeContext";
import AddCart from "../Components/AddCart";
import { useCart } from "../context/CartContext";
import ShopSection from "../Components/ShopSection";

const WishlistPage = () => {
  const [itemQuantity, setItemQuantity] = useState(1);
  const { addToCart } = useCart();
  const { likedItems, removeFromWishlist } = useWishlist();
  
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

  const handleAddToCart = (product) => {
    const normalized = {
      ...product,
      _id: product._id ?? product.id ?? product.title,
    };
    addToCart(normalized, itemQuantity);
  };

  return (
    <div className="min-h-screen bg-[#131313] font-body text-[#e5e2e1] selection:bg-accent/30 selection:text-accent py-24">
      <main className="max-w-7xl mx-auto px-6 py-16 md:px-12 lg:py-24">
        
        {/* Header Section */}
        <div className="mb-24 md:flex justify-between items-end gap-12 border-b border-[#353535]/30 pb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-accent transition-all duration-700 animate-in fade-in slide-in-from-left-4">
              <Sparkles size={14} strokeWidth={1.5} />
              <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold">The Private Archive</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-headline leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Personal <br />
              <span className="italic">Curations</span>
            </h2>
          </div>
          <div className="mt-10 md:mt-0 max-w-sm animate-in fade-in duration-1000 delay-300">
            <p className="text-[#d1c4ba]/60 font-body text-[13px] leading-relaxed italic border-l border-accent/20 pl-6">
              A meticulously gathered anthology of your most desired olfactory discoveries. Each selection reflects a fragment of your signature space.
            </p>
          </div>
        </div>

        {likedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {likedItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="aspect-[3/4] bg-[#1c1b1b] border border-[#353535]/50 overflow-hidden relative mb-8 group-hover:border-accent/30 transition-all duration-700">
                  {/* Product Image */}
                  <img
                    src={getProductImage(item.name)}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0"
                  />

                  {/* Visual Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />

                  {/* Actions Overlay */}
                  <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex flex-col gap-3">
                     <button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full h-14 bg-accent text-[#131313] font-label text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-white transition-all duration-500"
                     >
                        <ShoppingBag size={14} />
                        <span>Add To Archive</span>
                     </button>
                     <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-full h-14 bg-[#1c1b1b]/80 backdrop-blur-md border border-white/10 text-white font-label text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-red-950/40 hover:text-red-400 hover:border-red-950 transition-all duration-500"
                     >
                        <Trash2 size={14} />
                        <span>Withdraw</span>
                     </button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">{item.collection || "Signature"}</p>
                      <h3 className="text-2xl font-headline tracking-tight group-hover:text-accent transition-colors duration-500">{item.name}</h3>
                    </div>
                    <p className="font-label text-sm text-accent font-bold tracking-tight pt-1">
                       {item.price.toLocaleString()} PKR
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-[11px] text-[#d1c4ba]/50 font-body italic">
                    <span className="truncate max-w-[150px]">{item.note}</span>
                    <span className="w-1 h-1 bg-accent/30 rounded-full flex-shrink-0" />
                    <span className="text-[9px] uppercase tracking-widest not-italic font-bold text-[#d1c4ba]/70">
                        {item.status || "In Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Premium Add More CTA Slot */}
            <Link 
              href="/shop"
              className="aspect-[3/4] border border-dashed border-[#353535] bg-transparent flex flex-col items-center justify-center p-12 text-center group hover:bg-accent/[0.02] hover:border-accent/40 transition-all duration-700"
            >
              <div className="w-16 h-16 rounded-full border border-[#353535] flex items-center justify-center mb-8 group-hover:border-accent group-hover:bg-accent group-hover:text-[#131313] transition-all duration-700">
                <Plus size={24} strokeWidth={1} />
              </div>
              <p className="font-label text-[11px] uppercase tracking-[0.3em] font-bold text-[#d1c4ba] group-hover:text-accent transition-colors">Expand Collection</p>
              <p className="font-body text-[10px] text-[#4d453e] mt-2 italic">Contingent on selection</p>
            </Link>
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center text-center space-y-12 animate-in fade-in zoom-in duration-1000">
            <div className="w-32 h-32 border border-[#353535] flex items-center justify-center text-[#4d453e]">
              <Heart size={48} strokeWidth={1} />
            </div>
            <div className="max-w-md space-y-4">
              <h3 className="text-4xl font-headline italic">The Archive is Void</h3>
              <p className="text-[#d1c4ba]/50 font-body text-sm leading-relaxed italic">
                Your private collection has not yet been architected. Begin your journey through our sensory explorations.
              </p>
            </div>
            <Link 
              href="/shop"
              className="px-16 h-16 bg-accent text-[#131313] font-label text-[11px] uppercase font-bold tracking-[0.4em] flex items-center justify-center hover:bg-[#dac2ac] transition-all duration-700 group"
            >
              <span>Explore Boutique</span>
              <ChevronRight size={14} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        )}

        {/* Dynamic Recommendations */}
        <section className="mt-48 pt-24 border-t border-[#353535]/30">
          <div className="flex flex-col items-center mb-20 space-y-4">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-accent">Compendium</span>
            <h3 className="text-4xl font-headline text-center italic">Desirable Additions</h3>
          </div>
          <ShopSection />
        </section>
      </main>
    </div>
  );
};

export default WishlistPage;