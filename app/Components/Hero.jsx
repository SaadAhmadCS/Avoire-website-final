"use client";
import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

/**
 * Premium "Noir Atelier" Hero Section
 * Focuses on editorial typography, high-contrast imagery, and atmospheric depth.
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#131313] selection:bg-accent selection:text-[#131313]">
      
      {/* ─── Atmospheric Layer ─── */}
      <div className="absolute inset-0">
        {/* Subtle radial glow behind everything */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-accent/5 to-transparent opacity-50 pointer-events-none"></div>
        {/* Grain overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* ─── Left: Editorial Content ─── */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12 mb-16 xl:mb-0">
            <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-reveal-down stagger-1">
                    <span className="w-12 h-[1px] bg-accent/30"></span>
                    <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">The Invisible Signature</span>
                </div>
                
                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] xl:text-[7.5vw] font-bold font-headline leading-[0.85] tracking-tighter text-[#e5e2e1]">
                    <div className="animate-reveal-up stagger-2">Scent as</div>
                    <div className="italic font-light text-accent flex items-baseline gap-4 mt-2 animate-reveal-up stagger-3">
                        Identity<span className="not-italic text-[4vw] font-bold">.</span>
                    </div>
                </h1>
            </div>

            <div className="max-w-xl animate-reveal-up stagger-4">
                <p className="text-[#e5e2e1]/60 text-lg md:text-xl font-headline italic leading-relaxed mb-12 border-l border-accent/20 pl-8">
                    "At Avoire, we don't just create perfumes. We craft the intimate ghost of who you are, distilled into glass."
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                    <Link
                        href="/shop"
                        className="group relative inline-flex items-center justify-center px-12 py-5 bg-accent text-[#131313] text-xs uppercase tracking-[0.3em] font-bold rounded-full overflow-hidden transition-all duration-700 hover:pr-16 active:scale-95 shadow-[0_20px_40px_-5px_rgba(232,207,184,0.3)]"
                    >
                        <span className="relative z-10">Explore Collection</span>
                        <ArrowUpRight className="absolute right-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" size={18} />
                    </Link>

                    <div className="flex items-center gap-4 text-[#e5e2e1]/40 text-[10px] uppercase tracking-widest font-bold border-b border-[#e5e2e1]/10 pb-2">
                        <span>Small Batches</span>
                        <span className="w-1 h-1 bg-accent/40 rounded-full"></span>
                        <span>Hand-Poured</span>
                    </div>
                </div>
            </div>
          </div>

          {/* ─── Right: Immersive Visual ─── */}
          <div className="lg:col-span-12 xl:col-span-5 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] xl:aspect-[3/4.5] group animate-reveal-up stagger-5">
                {/* Image Border/Frame Effect */}
                <div className="absolute -inset-4 border border-accent/10 rounded-[3rem] -z-10 transition-transform duration-1000 group-hover:scale-105"></div>
                
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#353535] relative shadow-2xl">
                    <img
                        src="/imgs/Eternal Oud.jpeg"
                        alt="Signature Avoire Scent"
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0 brightness-90 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/80 via-transparent to-transparent"></div>
                    
                    {/* Floating Product Tag */}
                    <div className="absolute bottom-10 right-10 flex flex-col items-end space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                        <span className="text-accent text-[8px] uppercase tracking-widest font-bold">Featured Piece</span>
                        <h4 className="text-[#e5e2e1] font-headline italic text-xl">Eternal Oud</h4>
                    </div>
                </div>

                {/* Ornamental markers */}
                <div className="absolute -top-6 -right-6 w-24 h-24 border-t border-r border-accent/20 rounded-tr-3xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b border-l border-accent/20 rounded-bl-3xl"></div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Footer Markers ─── */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-center space-x-12 animate-reveal-up stagger-5">
        <div className="hidden sm:block text-[#e5e2e1]/30 text-[9px] uppercase tracking-[0.4em] font-medium leading-loose">
            Paris &nbsp;&bull;&nbsp; London &nbsp;&bull;&nbsp; Tokyo <br/>
            Est. 1924 &nbsp; Organic Heritage
        </div>
        
        {/* Coordinates/Detail */}
        <div className="flex flex-col space-y-1">
            <span className="text-accent text-[9px] font-bold tracking-widest">48.8566&deg; N, 2.3522&deg; E</span>
            <span className="text-[#e5e2e1]/20 text-[8px] tracking-[0.3em] uppercase">Manufacturing Atelier</span>
        </div>
      </div>

      {/* ─── Interaction Hints ─── */}
      <div className="absolute bottom-12 right-6 md:right-12 lg:right-24 flex flex-col items-center space-y-8">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent/30 to-accent animate-pulse"></div>
        <div className="flex flex-col items-center space-y-4">
            <span className="text-accent text-[9px] uppercase tracking-[0.4em] font-bold vertical-text" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
            <ArrowDown size={14} className="text-accent animate-bounce" />
        </div>
      </div>

    </section>
  );
};

export default Hero;
