"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ArrowUpRight,
  Play,
  Quote
} from "lucide-react";
import Hero from "./Components/Hero";
import { slugify } from "./utils";
import { useProducts } from "./context/ProdContext";

export default function Home() {
  const { products: perfumes } = useProducts();

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

  const signatureScents = perfumes.slice(0, 3);
  const collections = perfumes.slice(3, 7);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] selection:bg-accent selection:text-[#131313]">
      <Hero />

      {/* ─── The Signature Edit ─── */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-accent text-sm uppercase tracking-[0.4em] font-bold">The Edit</span>
            <h2 className="text-6xl md:text-[5rem] font-bold font-headline tracking-tighter leading-none">
              Signature <span className="italic font-light text-accent/80">Edits</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center space-x-6 text-accent hover:text-[#f7dec7] transition-all duration-500"
          >
            <span className="text-sm uppercase tracking-[0.3em] font-bold">View Full Collection</span>
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:text-[#131313] transition-all">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {signatureScents.map((perfume, idx) => (
            <div key={perfume._id} className={`group relative ${idx === 1 ? 'md:-translate-y-12' : ''} transition-transform duration-1000`}>
              <Link href={`/shop/${slugify(perfume.name)}`} className="block relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#353535] group-hover:border-accent/40 transition-colors duration-500 shadow-2xl">
                <img
                  src={getProductImage(perfume.name)}
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-10 left-10 right-10 space-y-4">
                    <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 border border-accent/20 rounded-full backdrop-blur-md">
                        {perfume.category || 'Parfum'}
                    </span>
                    <h3 className="text-3xl font-bold font-headline text-[#e5e2e1] group-hover:text-accent transition-colors">
                        {perfume.name}
                    </h3>
                    <p className="text-sm text-[#e5e2e1]/60 font-headline italic line-clamp-1 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        {perfume.description || 'A journey through rare essences.'}
                    </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── The Narrative Section ─── */}
      <section className="relative py-48 bg-[#181818] overflow-hidden">
        {/* Background Narrative Text */}
        <div className="absolute top-[10%] right-[-10%] opacity-5 select-none pointer-events-none">
            <h2 className="text-[30vw] font-bold text-accent font-headline tracking-tighter leading-none">NOIR</h2>
        </div>

        <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <span className="text-accent text-sm uppercase tracking-[0.4em] font-bold flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-accent/40"></div>
                    Olfactory Narrative
                </span>
                <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter leading-[1] text-[#e5e2e1]">
                  Born from <br />
                  <span className="italic font-light text-accent">French Heritage.</span>
                </h2>
              </div>
              <p className="text-xl md:text-2xl font-headline italic text-[#e5e2e1]/60 leading-relaxed max-w-xl border-l border-accent/20 pl-8">
                "We don't just extract scents. We harvest emotions. From the iris fields of Grasse to the lab in Paris, every drop is a chapter of a story yet to be written on your skin."
              </p>
              <div className="flex items-center space-x-12">
                <Link href="/about" className="group flex items-center space-x-4 text-accent text-sm uppercase tracking-widest font-bold">
                    <span>Read The Journal</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <button className="flex items-center space-x-3 text-[#e5e2e1]/60 hover:text-accent transition-colors">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                        <Play size={16} fill="currentColor" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">Watch The Process</span>
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative group">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#353535] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                    <img
                        src="/avoire.jpg"
                        alt="The Avoire Atelier"
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-accent/10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                </div>
                {/* Layered Content Detail */}
                <div className="absolute -bottom-12 -left-12 bg-[#20201f] p-10 rounded-[2rem] border border-[#353535] shadow-2xl max-w-xs hidden md:block group-hover:-translate-y-4 transition-transform duration-700">
                    <Quote className="text-accent/40 mb-4" size={32} />
                    <p className="text-lg font-headline italic text-accent leading-snug">
                        "The scent is the last thing you put on, and the first thing they remember."
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Atelier Grid ─── */}
      <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="text-center space-y-4 mb-24">
            <span className="text-accent text-sm uppercase tracking-[0.4em] font-bold">Collections</span>
            <h2 className="text-6xl md:text-[5rem] font-bold font-headline tracking-tighter leading-none">
              The <span className="italic font-light text-accent">Atelier</span> Choice
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((perfume, idx) => (
                <Link key={perfume._id} href={`/shop/${slugify(perfume.name)}`} className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#353535] bg-[#20201f] hover:border-accent/40 transition-all duration-500 hover:-translate-y-2">
                    <img
                        src={getProductImage(perfume.name)}
                        alt={perfume.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h4 className="text-xl font-bold font-headline group-hover:text-accent transition-colors">{perfume.name}</h4>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-accent text-[10px] uppercase tracking-widest font-bold">
                                {perfume.price} PKR
                            </span>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-[#131313] transition-all">
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* ─── Newsletter / Circle ─── */}
      <section className="py-48 px-6 bg-[#131313] border-t border-[#353535]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
                <span className="text-accent text-sm uppercase tracking-[0.4em] font-bold">Membership</span>
                <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter leading-tight">
                    Enter <br />
                    <span className="italic font-light text-accent">The Avoire Circle.</span>
                </h2>
                <p className="text-xl text-[#e5e2e1]/60 font-headline italic tracking-tight">
                    Register below to receive early access to seasonal drops and atelier private events.
                </p>
            </div>
            
            <form className="relative max-w-2xl mx-auto group">
                <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full bg-transparent border-b border-[#353535] py-6 px-4 text-2xl font-headline tracking-widest focus:outline-none focus:border-accent transition-all placeholder:text-[#e5e2e1]/20"
                />
                <button type="submit" className="absolute right-0 bottom-6 text-accent hover:text-[#f7dec7] transition-colors p-2 underline decoration-accent/30 underline-offset-8 decoration-1">
                    SUBSCRIBE
                </button>
            </form>
            
            <div className="flex justify-center items-center space-x-12 pt-12">
                <div className="text-center">
                    <div className="text-3xl font-bold font-headline text-accent leading-none">50K+</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-primary/40 mt-2">Members</div>
                </div>
                <div className="w-[1px] h-12 bg-[#353535]"></div>
                <div className="text-center">
                    <div className="text-3xl font-bold font-headline text-accent leading-none">40+</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-primary/40 mt-2">Countries</div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
