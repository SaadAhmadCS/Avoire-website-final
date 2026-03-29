import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

/**
 * CartCard - Premium Order Summary Component
 * Aligned with the Noir Atelier design system.
 */
const CartCard = ({ total, subtotal, shipping, cartItems, className, isCheckoutPage = false }) => {
     return (
          <div className={`w-full sticky top-32 ${className || "lg:w-[40%]"}`}>
               <div className="bg-[#1c1b1b] border border-[#353535] rounded-none p-10 shadow-2xl">
                    <h3 className="font-headline text-2xl text-[#e5e2e1] mb-10 border-b border-[#353535]/30 pb-6 tracking-tight">
                         Order Summary
                    </h3>

                    {/* Scrollable Cart Items - Subdued list for summary */}
                    {cartItems && cartItems.length > 0 && (
                         <div className="mb-10 max-h-64 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                              {cartItems.map(item => (
                                   <div key={item._id} className="flex justify-between items-start group">
                                        <div className="space-y-1">
                                             <p className="font-headline text-sm text-[#e5e2e1] group-hover:text-accent transition-colors">
                                                  {item.name}
                                             </p>
                                             <p className="font-label text-[10px] uppercase tracking-widest text-[#d1c4ba]">
                                                  Qty: {item.qty} — {item.price} PKR
                                             </p>
                                        </div>
                                        <span className="font-headline text-sm text-[#e5e2e1]">
                                             {(item.qty * item.price).toLocaleString()} PKR
                                        </span>
                                   </div>
                              ))}
                         </div>
                    )}

                    {/* Financial Breakdown */}
                    <div className="space-y-5 mb-10">
                         <div className="flex justify-between items-center text-sm">
                              <span className="font-label text-[#d1c4ba] uppercase tracking-widest text-[10px]">Subtotal</span>
                              <span className="font-headline text-[#e5e2e1]">{Number(subtotal).toLocaleString()} PKR</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                              <span className="font-label text-[#d1c4ba] uppercase tracking-widest text-[10px]">Shipping</span>
                              <span className="font-label text-accent uppercase tracking-[0.2em] text-[10px] font-bold">
                                   {Number(shipping) === 0 ? "Complimentary" : `${Number(shipping).toLocaleString()} PKR`}
                              </span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                              <span className="font-label text-[#d1c4ba] uppercase tracking-widest text-[10px]">Est. Taxes</span>
                              <span className="font-headline text-[#e5e2e1]">0 PKR</span>
                         </div>
                    </div>

                    {/* Grand Total */}
                    <div className="pt-8 border-t border-[#353535] mb-12">
                         <div className="flex justify-between items-end">
                              <span className="font-label text-[11px] uppercase tracking-[0.3em] text-[#d1c4ba]">Total Amount</span>
                              <span className="text-3xl font-headline text-[#e5e2e1] tracking-tighter">
                                   {Number(total).toLocaleString()} PKR
                              </span>
                         </div>
                    </div>

                    {/* CTA - Only show if not already on checkout page */}
                    {!isCheckoutPage && (
                         <Link 
                              href="/checkout" 
                              className="w-full bg-accent text-[#131313] h-16 flex items-center justify-center group hover:bg-[#dac2ac] transition-all duration-500 active:scale-[0.98] relative overflow-hidden shadow-lg shadow-accent/5"
                         >
                              <span className="font-label text-[11px] uppercase tracking-[0.4em] font-bold z-10">Proceed to Checkout</span>
                              <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform duration-500 z-10" />
                              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                         </Link>
                    )}

                    {/* Secure Badge */}
                    <div className="mt-10 flex flex-col items-center space-y-4">
                         <div className="flex items-center space-x-3 text-[9px] text-[#4d453e] uppercase tracking-[0.3em] font-bold">
                              <Lock size={12} className="text-accent/40" />
                              <span>Encrypted Secure Checkout</span>
                         </div>
                    </div>
               </div>

               {/* Luxury Reassurance */}
               <div className="mt-8 px-4 text-center">
                    <p className="font-body italic text-xs text-[#d1c4ba]/50 leading-relaxed">
                         Each selection is meticulously packaged in our signature Noir atelier boxes, designed for the ultimate olfactory revelation.
                    </p>
               </div>
          </div>
     )
}

export default CartCard