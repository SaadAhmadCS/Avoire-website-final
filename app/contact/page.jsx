

"use client"

import React, { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Twitter, Facebook, ChevronDown, Sparkles } from 'lucide-react';

const ContactPage = () => {
     const [loading, setLoading] = useState(false)
     const [formState, setFormState] = useState({
          name: '',
          email: '',
          subject: '',
          message: ''
     });
     const [submitted, setSubmitted] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
               const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formState)
               });

               if (res.ok) {
                    setSubmitted(true);
                    setTimeout(() => setSubmitted(false), 5000);
               }
          } finally {
               setLoading(false);
          }
          setFormState({
               name: '',
               email: '',
               subject: '',
               message: ''
          })
     };

     return (
          <div className="min-h-screen bg-[#131313] selection:bg-accent/30 selection:text-accent font-body text-[#e5e2e1] py-24">
               <main className="max-w-7xl mx-auto px-6 pt-28 pb-12 md:pt-40 md:pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                         {/* Left Side: Editorial Content */}
                         <div className="space-y-16">
                              <header className="space-y-8">
                                   <div className="flex items-center space-x-4">
                                        <Sparkles size={14} className="text-accent" />
                                        <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold text-accent">L'Atelier Concierge</span>
                                   </div>
                                   <h2 className="text-7xl md:text-8xl font-headline leading-[0.85] tracking-tighter">
                                        Refined <br />
                                        <span className="italic font-normal text-accent">Connection.</span>
                                   </h2>
                                   <p className="max-w-md text-lg leading-relaxed text-[#d1c4ba]/60 font-body italic">
                                        Our advisors are available to assist you with fragrance architectures, collection curation, or private boutique appointments.
                                   </p>
                              </header>

                              <div className="space-y-10 pt-16 border-t border-[#353535]/30">
                                   <div className="group flex items-center space-x-8">
                                        <div className="w-14 h-14 border border-accent/20 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:bg-accent/[0.03] transition-all duration-700">
                                             <MapPin size={20} strokeWidth={1} />
                                        </div>
                                        <div>
                                             <h4 className="font-label font-bold uppercase tracking-[0.3em] text-[10px] mb-2 text-accent/40">Parisian Atelier</h4>
                                             <p className="font-headline text-2xl italic tracking-tight">122 Champs-Élysées, Paris</p>
                                        </div>
                                   </div>

                                   <div className="group flex items-center space-x-8">
                                        <div className="w-14 h-14 border border-accent/20 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:bg-accent/[0.03] transition-all duration-700">
                                             <Mail size={20} strokeWidth={1} />
                                        </div>
                                        <div>
                                             <h4 className="font-label font-bold uppercase tracking-[0.3em] text-[10px] mb-2 text-accent/40">Digital Inquiries</h4>
                                             <p className="font-headline text-2xl italic tracking-tight">concierge@avoire.com</p>
                                        </div>
                                   </div>
                              </div>

                              <div className="flex space-x-8 pt-8">
                                   {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                                        <button key={idx} className="w-12 h-12 border border-[#353535]/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-700 text-[#d1c4ba]/40">
                                             <Icon size={18} strokeWidth={1.5} />
                                        </button>
                                   ))}
                              </div>
                         </div>

                         {/* Right Side: Contact Form */}
                         <div className="relative">
                              <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                              
                              <div className="p-10 md:p-16 bg-[#1c1b1b] border border-[#353535]/10 shadow-2xl relative overflow-hidden group">
                                   <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                                   
                                   {submitted ? (
                                        <div className="text-center py-24 space-y-8 animate-in fade-in zoom-in duration-1000">
                                             <div className="inline-flex items-center justify-center w-24 h-24 border border-accent/30 text-accent rounded-full mb-4">
                                                  <Send size={32} strokeWidth={1} />
                                             </div>
                                             <div className="space-y-4">
                                                  <h3 className="text-4xl font-headline italic tracking-tight text-accent">Merci Beaucoup</h3>
                                                  <p className="text-[#d1c4ba]/50 font-body italic max-w-xs mx-auto">Your message has been safely delivered to our Parisian atelier.</p>
                                             </div>
                                             <button
                                                  onClick={() => setSubmitted(false)}
                                                  className="mt-12 font-label text-[10px] tracking-[0.4em] uppercase font-bold text-accent hover:text-white transition-colors"
                                             >
                                                  Return to Form
                                             </button>
                                        </div>
                                   ) : (
                                        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                                             <div className="space-y-12">
                                                  <div className="relative group/field">
                                                       <input
                                                            required
                                                            type="text"
                                                            id="name"
                                                            className="peer w-full bg-transparent border-b border-[#353535] py-4 focus:border-accent transition-all duration-700 placeholder-transparent font-body outline-none italic text-lg"
                                                            placeholder="Name"
                                                            value={formState.name}
                                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                       />
                                                       <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#d1c4ba]/20 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent">
                                                            Master / Madame
                                                       </label>
                                                  </div>

                                                  <div className="relative group/field">
                                                       <input
                                                            required
                                                            type="email"
                                                            id="email"
                                                            className="peer w-full bg-transparent border-b border-[#353535] py-4 focus:border-accent transition-all duration-700 placeholder-transparent font-body outline-none italic text-lg"
                                                            placeholder="Email"
                                                            value={formState.email}
                                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                       />
                                                       <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#d1c4ba]/20 peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent">
                                                            Electronic Address
                                                       </label>
                                                  </div>

                                                  <div className="relative group/field">
                                                       <select
                                                            className="peer w-full bg-transparent border-b border-[#353535] py-4 focus:border-accent transition-all duration-700 appearance-none cursor-pointer font-body italic text-lg text-[#d1c4ba]/20 focus:text-[#e5e2e1] outline-none"
                                                            value={formState.subject}
                                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                       >
                                                            <option value="" className='bg-[#1c1b1b]'>The Nature of Inquiry</option>
                                                            <option value="Eternal Oud" className='bg-[#1c1b1b]'>Collection Curation</option>
                                                            <option value="Bespoke" className='bg-[#1c1b1b]'>Bespoke Fragrance</option>
                                                            <option value="Event" className='bg-[#1c1b1b]'>Event Partnership</option>
                                                       </select>
                                                       <ChevronDown size={14} className="absolute right-0 top-6 pointer-events-none text-accent/20 group-hover/field:text-accent/60 transition-colors" />
                                                  </div>

                                                  <div className="relative group/field">
                                                       <textarea
                                                            required
                                                            rows="3"
                                                            id="message"
                                                            className="peer w-full bg-transparent border-b border-[#353535] py-4 focus:border-accent transition-all duration-700 resize-none placeholder-transparent font-body outline-none italic text-lg"
                                                            placeholder="Message"
                                                            value={formState.message}
                                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                       ></textarea>
                                                       <label htmlFor="message" className="absolute left-0 -top-4 text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-[#d1c4ba]/20 peer-placeholder-shown:top-10 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent">
                                                            Correspondence
                                                       </label>
                                                  </div>
                                             </div>

                                             <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="group relative w-full h-20 bg-accent text-[#131313] font-label text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-white transition-all duration-700 active:scale-[0.98] flex items-center justify-center overflow-hidden disabled:opacity-50"
                                             >
                                                  <div className="relative z-10 flex items-center space-x-4">
                                                       {loading ? (
                                                            <>
                                                                 <span>Archiving</span>
                                                                 <div className="w-1.5 h-1.5 bg-[#131313] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                                 <div className="w-1.5 h-1.5 bg-[#131313] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                                 <div className="w-1.5 h-1.5 bg-[#131313] rounded-full animate-bounce" />
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <span>Transmit Message</span>
                                                                 <Send size={14} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-700" />
                                                            </>
                                                       )}
                                                  </div>
                                             </button>
                                        </form>
                                   )}
                              </div>
                         </div>
                    </div>
               </main>
          </div>
     );
};

export default ContactPage;