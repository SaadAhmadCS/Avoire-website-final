"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Heart,
  Plus
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/LikeContext";
import WishlistBtn from "../Components/WishlistBtn";
import { useProducts } from "../context/ProdContext";
import { slugify } from "../utils";

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc

  const { addToCart } = useCart();
  const { addToWishlist, likedItems } = useWishlist();
  const { products } = useProducts();

  // Helper to map our high-quality images to products (Consistent with Homepage)
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

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category || "Parfum"));
    return ["All", ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== "All") {
      result = result.filter(p => (p.category || "Parfum") === activeCategory);
    }

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, activeCategory, sortBy]);

  const handleAddToCart = (product) => {
    const normalized = { ...product, _id: product._id ?? product.id };
    addToCart(normalized, 1);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-accent selection:text-[#131313] font-body pt-32 pb-24">
      <main className="max-w-[1920px] mx-auto px-6 md:px-12">
        {/* Hero Header */}
        <header className="mb-20">
          <div className="max-w-3xl space-y-6">
            <span className="text-accent text-sm uppercase tracking-[0.4em] font-bold block">Noir Atelier</span>
            <h1 className="font-headline text-6xl md:text-8xl tracking-tighter text-[#e5e2e1] leading-none">
                The <span className="italic font-light text-accent">Collection</span>
            </h1>
            <p className="text-[#e5e2e1]/60 leading-relaxed text-xl font-headline italic border-l border-accent/20 pl-8 max-w-2xl">
                A curated anthology of olfactory experiences. Each scent is an individual narrative, crafted in our Noir Atelier with rare essences and meticulous precision.
            </p>
          </div>
        </header>

        {/* Filter & Grid Container */}
        <div>
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 py-6 border-b border-[#353535]/30 gap-8">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-label uppercase tracking-widest text-[0.7rem] whitespace-nowrap transition-all duration-500 ${
                    activeCategory === cat ? 'text-accent border-b border-accent/30 pb-1' : 'text-[#e5e2e1]/40 hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-12 self-end md:self-auto">
              {/* Sort Dropdown Placeholder Style */}
              <div className="relative group">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 font-label uppercase tracking-widest text-[0.7rem] text-[#e5e2e1]/40 hover:text-accent transition-colors"
                >
                  <span>Sort: {sortBy === 'default' ? 'Latest' : sortBy === 'price-asc' ? 'Price Low' : 'Price High'}</span>
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-[#1a1a19] border border-[#353535] rounded-xl overflow-hidden z-50 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                      {[
                        { label: 'Latest', val: 'default' },
                        { label: 'Price: Low to High', val: 'price-asc' },
                        { label: 'Price: High to Low', val: 'price-desc' }
                      ].map(item => (
                        <button
                          key={item.val}
                          onClick={() => { setSortBy(item.val); setDropdownOpen(false); }}
                          className="px-6 py-4 text-left text-[0.7rem] uppercase tracking-widest hover:bg-accent hover:text-[#131313] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4-Column Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {filteredProducts.map((perfume) => (
              <div key={perfume._id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#20201f] mb-8 rounded-[2rem] border border-[#353535] group-hover:border-accent/40 transition-all duration-700 shadow-xl">
                  <Link href={`/shop/${slugify(perfume.name)}`} className="block w-full h-full">
                    <img 
                      src={getProductImage(perfume.name)} 
                      alt={perfume.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                    />
                    
                    {/* Hover Scent Profile Overlay */}
                    <div className="absolute inset-0 bg-[#131313]/80 backdrop-blur-md flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 pointer-events-none p-10 text-center">
                      <span className="text-accent text-[0.65rem] uppercase tracking-[0.3em] font-bold mb-6">Discovery Notes</span>
                      <p className="text-[#e5e2e1]/80 text-sm font-headline italic leading-relaxed mb-6">
                        {perfume.description || "A masterfully balanced composition of rare botanicals."}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {(perfume.note?.split('&') || ["Top", "Heart", "Base"]).map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-accent/20 text-accent text-[0.6rem] font-bold uppercase tracking-widest">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* Actions Overlay */}
                  <div className="absolute top-6 right-6 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <WishlistBtn
                      isFavorite={likedItems.some(item => (item._id || item.id) === perfume._id)}
                      onClick={() => addToWishlist(perfume)}
                      className="!bg-[#131313]/40 backdrop-blur-md !border-none !text-[#e5e2e1]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <Link href={`/shop/${slugify(perfume.name)}`} className="group/title">
                        <h3 className="font-headline text-2xl tracking-tighter text-[#e5e2e1] group-hover/title:text-accent transition-colors">
                            {perfume.name}
                        </h3>
                    </Link>
                    <span className="text-accent font-bold text-sm tracking-widest">{perfume.price} PKR</span>
                  </div>
                  <p className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-[#e5e2e1]/40 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-accent/30"></span>
                    {perfume.category || "Eau de Parfum"} / 100ml
                  </p>
                  
                  <button 
                    onClick={() => handleAddToCart(perfume)}
                    className="w-full mt-2 py-4 border border-[#353535] hover:border-accent text-accent font-bold uppercase text-[0.7rem] tracking-[0.3em] transition-all duration-500 hover:bg-accent hover:text-[#131313] rounded-xl flex items-center justify-center gap-3 group/btn"
                  >
                    Add to Bag
                    <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopPage;