"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  Plus,
  Minus,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Wind,
  Droplets,
  ArrowRight
} from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/LikeContext';
import { useProducts } from '@/app/context/ProdContext';
import WishlistBtn from '@/app/Components/WishlistBtn';
import { slugify } from '@/app/utils';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, likedItems } = useWishlist();
  const { products } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to map our high-quality images to products
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

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          // If not found, maybe lookup in context by slugified name as fallback
          const found = products.find(p => slugify(p.name) === slug);
          if (found) setProduct(found);
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug, products]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p._id !== product._id && p.category === product.category)
      .slice(0, 4);
  }, [product, products]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-[#e5e2e1] space-y-6 px-6">
        <h1 className="font-headline text-4xl">Product Not Found</h1>
        <p className="opacity-60 text-center max-w-md italic">The olfactory narrative you are seeking has drifted away. Explore our other signatures.</p>
        <Link href="/shop" className="px-10 py-4 bg-accent text-[#131313] font-bold uppercase text-xs tracking-widest rounded-full">
          Return to Atelier
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const normalized = { ...product, _id: product._id ?? product.id };
    addToCart(normalized, quantity);
  };

  // Parse notes: typically "Top & Heart & Base"
  const notes = product.note?.split('&').map(n => n.trim()) || ["Aromatic", "Woody", "Musk"];

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-accent selection:text-[#131313] font-body pt-32 pb-24 transition-colors duration-700">
      <main className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 mb-20">
          <Link href="/shop" className="font-label text-[0.7rem] uppercase tracking-[0.3em] text-[#e5e2e1]/40 hover:text-accent transition-colors">Collection</Link>
          <span className="text-[#e5e2e1]/20">/</span>
          <span className="font-label text-[0.7rem] uppercase tracking-[0.3em] text-accent font-bold">{product.name}</span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-32 items-start mb-40">
          {/* Left: Product Visuals */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group overflow-hidden rounded-[3rem] border border-[#353535] bg-[#20201f] shadow-2xl aspect-[4/5]">
               <img 
                  src={getProductImage(product.name)} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                
                {/* Visual Accent */}
                <div className="absolute bottom-10 left-10 hidden xl:block">
                  <div className="bg-[#131313]/60 backdrop-blur-xl border border-accent/20 px-8 py-4 rounded-2xl">
                    <span className="text-accent text-[0.6rem] uppercase tracking-[0.4em] font-bold block mb-1">Concentration</span>
                    <span className="text-[#e5e2e1] text-xs font-headline italic">Extrait de Parfum / 22% Vol.</span>
                  </div>
                </div>
            </div>

            {/* Secondary Image Placeholder Style if needed, otherwise clean layout */}
            <div className="grid grid-cols-2 gap-8 invisible lg:visible">
                <div className="aspect-square rounded-[2rem] border border-[#353535] bg-[#1a1a19] overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <img src={getProductImage(product.name)} className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 scale-125 translate-y-10" />
                </div>
                <div className="aspect-square rounded-[2rem] border border-[#353535] bg-[#1a1a19] overflow-hidden flex items-center justify-center p-12 text-center">
                    <p className="text-[#e5e2e1]/40 text-sm font-headline italic leading-relaxed">
                        "Each bottle is macerated for 18 months, allowing every molecule to find its narrative balance."
                    </p>
                </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-10 flex justify-between items-start">
              <div className="space-y-4">
                <span className="text-accent text-sm uppercase tracking-[0.5em] font-bold block">Noir Atelier Signature</span>
                <h1 className="font-headline text-5xl md:text-8xl tracking-tighter leading-[0.85] text-[#e5e2e1]">
                    {product.name.split(' ')[0]} <br/> 
                    <span className="italic font-light opacity-80 pl-8">{product.name.split(' ').slice(1).join(' ')}</span>
                </h1>
              </div>
              <div className="pt-2">
                <WishlistBtn
                    isFavorite={likedItems.some(item => (item._id || item.id) === product._id)}
                    onClick={() => addToWishlist(product)}
                    className="!w-16 !h-16 !bg-[#1a1a19] !border-[#353535] hover:!border-accent/50"
                />
              </div>
            </div>

            <p className="text-[#e5e2e1]/60 leading-relaxed text-xl font-headline italic mb-12 border-l-2 border-accent/20 pl-8">
              "{product.description || "An enigmatic composition that captures the duality of light and shadow."}"
            </p>

            {/* Price & Actions */}
            <div className="space-y-10 mb-20">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-headline text-accent font-bold tracking-tight">{product.price} <small className="text-sm uppercase tracking-widest font-body">PKR</small></span>
                <span className="text-[#e5e2e1]/30 text-xs uppercase tracking-widest">Inclusive of boutique duties</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center bg-[#1a1a19] border border-[#353535] rounded-2xl px-2 py-1 h-16 w-full sm:w-44 justify-between">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-[#e5e2e1]/40 hover:text-accent transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg tabular-nums">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-[#e5e2e1]/40 hover:text-accent transition-colors">
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-accent text-[#131313] h-16 rounded-2xl font-bold uppercase text-xs tracking-[0.3em] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-2xl shadow-accent/10"
                >
                  Acquire Signature
                </button>
              </div>

              <div className="flex items-center gap-6 text-[#e5e2e1]/40 text-[0.65rem] uppercase tracking-widest font-bold">
                <div className="flex items-center gap-2"><Truck size={14} className="text-accent" /> Complimentary Shipping</div>
                <div className="w-1 h-1 rounded-full bg-[#353535]"></div>
                <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-accent" /> Secure Authenticity</div>
              </div>
            </div>

            {/* Composition Details */}
            <div className="space-y-12 pt-12 border-t border-[#353535]">
              <h3 className="font-headline text-2xl tracking-tighter italic text-[#e5e2e1]">The Composition</h3>
              
              <div className="space-y-10">
                {/* Top Notes */}
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent/60 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500 shrink-0">
                    <Droplets size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-accent text-[0.65rem] uppercase tracking-[0.3em] font-bold mb-2">Opening Notes</h4>
                    <p className="text-[#e5e2e1]/80 text-sm leading-relaxed">{notes[0] || "Fresh Bergamot, Subtle Pepper"}</p>
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent/60 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500 shrink-0">
                    <Wind size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-accent text-[0.65rem] uppercase tracking-[0.3em] font-bold mb-2">Heart Narrative</h4>
                    <p className="text-[#e5e2e1]/80 text-sm leading-relaxed">{notes[1] || "Damask Rose, Midnight Jasmine"}</p>
                  </div>
                </div>

                {/* Base Notes */}
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center text-accent/60 group-hover:bg-accent/10 group-hover:text-accent transition-all duration-500 shrink-0">
                    <Zap size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-accent text-[0.65rem] uppercase tracking-[0.3em] font-bold mb-2">Base Resonance</h4>
                    <p className="text-[#e5e2e1]/80 text-sm leading-relaxed">{notes[2] || "Sandalwood, White Musk, Resin"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-[#1a1a19] rounded-[4rem] px-8 md:px-20 py-24 mb-40 border border-[#353535] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <span className="text-accent text-[0.65rem] uppercase tracking-[0.5em] font-bold">The Atelier Experience</span>
                    <h2 className="font-headline text-4xl md:text-6xl tracking-tighter text-[#e5e2e1] leading-tight max-w-lg">
                        A sensory encounter <br/> with <span className="italic font-light">The Invisible</span>
                    </h2>
                    <div className="space-y-6 text-[#e5e2e1]/60 text-lg font-headline italic border-l border-accent/20 pl-10 max-w-xl leading-relaxed">
                        <p>
                            Each Avoire creation is more than a scent; it is a meticulously captured moment. We harvest our primary essences by moonlight to preserve their volatile molecular structure.
                        </p>
                        <p>
                            The evolution of {product.name} on the skin is designed to be a slow revelation, transforming from initial crystalline clarity to a deep, resonant narrative that lasts until dawn.
                        </p>
                    </div>
                </div>
                <div className="relative aspect-square">
                    <img 
                        src={getProductImage(product.name)} 
                        className="w-full h-full object-cover rounded-[3rem] grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                    />
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#131313] border border-[#353535] rounded-3xl p-6 hidden lg:flex items-center justify-center text-center shadow-2xl">
                        <p className="text-accent text-[0.6rem] font-bold tracking-[0.3em] uppercase">Hand-Poured in Small Batches</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Related Products */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-accent text-[0.65rem] uppercase tracking-[0.4em] font-bold block mb-4">Curated Ritual</span>
              <h2 className="font-headline text-4xl md:text-5xl tracking-tighter text-[#e5e2e1]">You might also <span className="italic font-light">love</span></h2>
            </div>
            <Link href="/shop" className="text-accent text-[0.7rem] uppercase tracking-widest font-bold flex items-center gap-3 group">
              Explore All Signatures
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {relatedProducts.length > 0 ? (
                relatedProducts.map((p) => (
                    <div key={p._id} className="group flex flex-col">
                        <Link href={`/shop/${slugify(p.name)}`} className="relative aspect-[3/4] overflow-hidden bg-[#1a1a19] mb-6 rounded-3xl border border-[#353535] group-hover:border-accent/40 transition-all duration-700 shadow-lg block">
                            <img 
                                src={getProductImage(p.name)} 
                                alt={p.name} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />
                        </Link>
                        <div className="space-y-2">
                            <Link href={`/shop/${slugify(p.name)}`} className="font-headline text-xl text-[#e5e2e1] hover:text-accent transition-colors block">{p.name}</Link>
                            <p className="text-accent font-bold text-xs tracking-widest">{p.price} PKR</p>
                        </div>
                    </div>
                ))
            ) : (
                // Fallback for non-matching categories
                products.slice(0, 4).map((p) => (
                    <div key={p._id} className="group flex flex-col">
                        <Link href={`/shop/${slugify(p.name)}`} className="relative aspect-[3/4] overflow-hidden bg-[#1a1a19] mb-6 rounded-3xl border border-[#353535] group-hover:border-accent/40 transition-all duration-700 shadow-lg block">
                            <img 
                                src={getProductImage(p.name)} 
                                alt={p.name} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />
                        </Link>
                        <div className="space-y-2 text-center md:text-left">
                            <Link href={`/shop/${slugify(p.name)}`} className="font-headline text-xl text-[#e5e2e1] hover:text-accent transition-colors block">{p.name}</Link>
                            <p className="text-accent font-bold text-xs tracking-widest">{p.price} PKR</p>
                        </div>
                    </div>
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}