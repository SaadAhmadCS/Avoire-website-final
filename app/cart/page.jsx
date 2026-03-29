

"use client";
import React from "react";
import {
     ShoppingBag,
     X,
     Plus,
     Minus,
     ArrowRight,
     Trash2
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import CartCard from "../Components/CartCard";

/**
 * Noir Atelier Cart Page
 * A luxury shopping bag experience with refined typography and dark aesthetics.
 */
const CartPage = () => {
     const { cartItems, removeFromCart, updateQty } = useCart();
     
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

     const updateQuantity = (_id, delta) => {
          const item = cartItems.find((i) => i._id === _id);
          if (!item) return;
          const newQty = Math.max(1, (item.qty ?? 1) + delta);
          updateQty(_id, newQty);
     };

     const subtotal = cartItems.reduce(
          (acc, item) => acc + (item.price * (item.qty ?? 1)),
          0
     );
     const shipping = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 500;
     const total = subtotal + shipping;

     return (
          <div className="min-h-screen bg-[#131313] font-body text-[#e5e2e1] selection:bg-accent/30 selection:text-accent py-24">
               <main className="max-w-7xl mx-auto px-6 py-16 md:px-12">
                    {cartItems.length > 0 ? (
                         <>
                              <header className="mb-20 space-y-4">
                                   <div className="inline-block px-3 py-1 border border-accent/20 rounded-full">
                                        <span className="uppercase tracking-[0.3em] text-[9px] font-bold text-accent/80">Your Selection</span>
                                   </div>
                                   <h1 className="text-5xl md:text-7xl font-headline leading-tight tracking-tight">
                                        The <span className="italic">Shopping Bag</span>
                                   </h1>
                              </header>

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                                   {/* Left: Item List */}
                                   <div className="lg:col-span-8 space-y-2">
                                        {cartItems.map((item) => (
                                             <div
                                                  key={item._id}
                                                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-10 border-b border-[#353535]/30 group transition-all duration-500 hover:bg-white/[0.01] px-4 -mx-4"
                                             >
                                                  {/* Product Info */}
                                                  <div className="col-span-1 md:col-span-7 flex items-center space-x-8">
                                                       {/* Image Container */}
                                                       <div className="w-28 h-36 bg-[#1c1b1b] border border-[#353535] relative flex-shrink-0 overflow-hidden group/img">
                                                            <img
                                                                 src={getProductImage(item.name)}
                                                                 alt={item.name}
                                                                 className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110 opacity-90 group-hover:opacity-100"
                                                            />
                                                            {/* Overlay for depth */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                                       </div>

                                                       {/* Product Details */}
                                                       <div className="space-y-2">
                                                            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-accent/60 font-bold">
                                                                 {item.note || "Signature Collection"}
                                                            </p>
                                                            <h3 className="text-2xl font-headline tracking-tight group-hover:text-accent transition-colors duration-500">
                                                                 {item.name}
                                                            </h3>
                                                            <div className="flex items-center space-x-4">
                                                                 <span className="font-label text-[11px] text-[#d1c4ba] uppercase tracking-widest border border-[#d1c4ba]/20 px-2 py-0.5">
                                                                      {item.size || "100ml"}
                                                                 </span>
                                                                 <button 
                                                                      onClick={() => removeFromCart(item._id)}
                                                                      className="text-[9px] uppercase tracking-[0.2em] text-[#4d453e] hover:text-red-400 transition-colors flex items-center gap-1.5 font-bold group/del"
                                                                 >
                                                                      <Trash2 size={12} className="group-hover/del:scale-110 transition-transform" />
                                                                      Remove
                                                                 </button>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {/* Quantity Controller */}
                                                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                                                       <div className="flex items-center border border-[#353535] h-12 w-32 justify-between bg-[#131313] px-2 group/qty">
                                                            <button
                                                                 onClick={() => updateQuantity(item._id, -1)}
                                                                 className="w-8 h-8 flex items-center justify-center text-[#d1c4ba] hover:text-accent transition-colors disabled:opacity-30"
                                                                 disabled={item.qty <= 1}
                                                            >
                                                                 <Minus size={14} />
                                                            </button>
                                                            <span className="font-headline text-lg text-accent">{item.qty ?? 1}</span>
                                                            <button
                                                                 onClick={() => updateQuantity(item._id, 1)}
                                                                 className="w-8 h-8 flex items-center justify-center text-[#d1c4ba] hover:text-accent transition-colors"
                                                            >
                                                                 <Plus size={14} />
                                                            </button>
                                                       </div>
                                                  </div>

                                                  {/* Price */}
                                                  <div className="col-span-1 md:col-span-3 text-left md:text-right">
                                                       <p className="text-2xl font-headline text-[#e5e2e1] group-hover:text-accent transition-colors duration-500">
                                                            {(item.price * (item.qty ?? 1)).toLocaleString()} <span className="text-[10px] font-label text-[#d1c4ba]">PKR</span>
                                                       </p>
                                                       <p className="font-label text-[10px] text-[#4d453e] font-bold tracking-[0.15em] uppercase mt-1">
                                                            {item.price.toLocaleString()} PKR Unit
                                                       </p>
                                                  </div>
                                             </div>
                                        ))}

                                        {/* Complimentary Gift Wrap Reassurance */}
                                        <div className="pt-12 px-4">
                                             <div className="p-8 border border-[#353535]/40 bg-[#1c1b1b]/30 flex flex-col md:flex-row items-center gap-6">
                                                  <div className="w-12 h-12 flex-shrink-0 border border-accent/30 flex items-center justify-center text-accent">
                                                       <ShoppingBag size={20} strokeWidth={1.5} />
                                                  </div>
                                                  <div className="text-center md:text-left space-y-1">
                                                       <h4 className="font-headline text-lg italic">Complimentary Art of Gifting</h4>
                                                       <p className="text-sm font-body text-[#d1c4ba]/70">Each order is elegantly hand-wrapped in our signature obsidian packaging with a personalized message option at checkout.</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Right: Summary Box */}
                                   <div className="lg:col-span-4 lg:sticky lg:top-32">
                                        <CartCard
                                             cartItems={cartItems}
                                             subtotal={subtotal}
                                             shipping={shipping}
                                             total={total}
                                             className="w-full"
                                        />
                                        
                                        <div className="mt-8 text-center">
                                             <Link href="/shop" className="group inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.3em] text-[#d1c4ba] hover:text-accent transition-colors">
                                                  <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                                                  <span>Continue Discovery</span>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </>
                    ) : (
                         <div className="text-center py-32 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                              {/* Empty State Icon */}
                              <div className="relative w-32 h-32 mx-auto">
                                   <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
                                   <div className="relative w-full h-full border border-[#353535] flex items-center justify-center text-[#4d453e] group">
                                        <ShoppingBag size={48} strokeWidth={1} className="group-hover:text-accent transition-colors duration-700" />
                                   </div>
                              </div>

                              {/* Text */}
                              <div className="space-y-4 max-w-md mx-auto">
                                   <h3 className="text-4xl font-headline italic tracking-tight">An Empty Vellum</h3>
                                   <p className="text-[#d1c4ba]/60 font-body text-base leading-relaxed italic">
                                        Your olfactory journey has yet to begin. Discovery awaits among our rare essences and architected memories.
                                   </p>
                              </div>

                              {/* Button */}
                              <div className="pt-6">
                                   <Link
                                        href="/shop"
                                        className="inline-flex items-center justify-center h-16 px-12 bg-accent text-[#131313] text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#dac2ac] transition-all duration-500 active:scale-95 shadow-xl shadow-accent/5"
                                   >
                                        Explore Collections
                                   </Link>
                              </div>
                         </div>
                    )}
               </main>
          </div>
     );
};

export default CartPage;

