"use client";
import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    shop: [
      { label: "All Collections", href: "/shop" },
      { label: "Signature Scents", href: "/shop?category=signature" },
      { label: "The Noir Series", href: "/shop?category=noir" },
      { label: "Limited Editions", href: "/shop?category=limited" },
    ],
    story: [
      { label: "Our Heritage", href: "/about#heritage" },
      { label: "The Atelier", href: "/about#atelier" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Journal", href: "/journal" },
    ],
    connect: [
      { label: "Instagram", href: "https://instagram.com/avoire" },
      { label: "Twitter", href: "https://twitter.com/avoire" },
      { label: "Facebook", href: "https://facebook.com/avoire" },
      { label: "Contact Us", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-[#131313] pt-32 pb-12 border-t border-[#353535]">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mb-32">
          {/* Brand Story Column */}
          <div className="flex flex-col space-y-8">
            <h3 className="text-accent font-headline text-lg uppercase tracking-widest">Brand Story</h3>
            <p className="text-text-primary/60 font-headline italic text-lg leading-relaxed max-w-xs">
              "Crafting olfactory poetry since 1924. Each bottle of Avoire is a symphony of rare botanicals."
            </p>
          </div>

          {/* Shop Column */}
          <FooterColumn title="Shop" links={footerLinks.shop} />

          {/* Story Column */}
          <FooterColumn title="Story" links={footerLinks.story} />

          {/* Connect Column */}
          <FooterColumn title="Connect" links={footerLinks.connect} />
        </div>

        {/* Huge Logo Section */}
        <div className="relative overflow-hidden mb-16">
          <h2 className="text-[15vw] font-bold text-accent font-headline tracking-tighter leading-none opacity-5 select-none pointer-events-none text-center">
            AVOIRE
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#353535] gap-8">
          <div className="text-text-primary/40 text-xs uppercase tracking-[0.2em]">
            © 2024 AVOIRE ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-12">
            <Link href="/privacy" className="text-text-primary/40 text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-text-primary/40 text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-3 text-accent uppercase tracking-widest text-xs font-bold"
          >
            <span>Back to Top</span>
            <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:text-inverse-surface transition-all">
              <ArrowUpRight size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col space-y-8">
    <h3 className="text-accent font-headline text-lg uppercase tracking-widest">{title}</h3>
    <ul className="flex flex-col space-y-4">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            href={link.href}
            className="text-text-primary/60 hover:text-accent transition-all duration-500 font-headline tracking-tight text-lg group flex items-center space-x-2"
          >
            <span>{link.label}</span>
            <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
;