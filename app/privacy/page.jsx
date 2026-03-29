
"use client"
import React, { useState, useEffect } from 'react';
import {
     ChevronRight,
     FileText,
     ShieldCheck,
     Lock,
     Scale,
     Printer,
     Download
} from 'lucide-react';

const TermsAndPrivacy = () => {
     const [activeTab, setActiveTab] = useState('privacy');

     const navigation = [
          { id: 'terms', label: 'Terms of Service', icon: Scale },
          { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
        
     ];
     useEffect(() => {
          const hash = window.location.hash.replace("#", "");
          if (hash === "privacy") setActiveTab("privacy");
     }, []);
     return (
          <div className="bg-bg-page min-h-screen font-sans text-text-body py-24">
               {/* Editorial Header */}
               <header className="bg-accent text-text-inverse py-20 px-page-x text-center border-b border-white/10">
                    <div className="max-w-3xl mx-auto space-y-4">
                         <span className="text-ui uppercase tracking-[0.3em] opacity-60">Legal & Transparency</span>
                         <h1 className="text-headline-xl font-headline italic tracking-tight">
                              Our <span className="not-italic font-bold">Commitment</span>
                         </h1>
                         <p className="text-body-sm opacity-70 max-w-xl mx-auto leading-relaxed">
                              At Avoire a Perfume, we believe in clarity and trust. Below you will find detailed information
                              regarding how we protect your data and the terms of our service.
                         </p>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto py-16 px-page-x grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sticky Sidebar Navigation */}
                    <aside className="lg:col-span-3">
                         <nav className="sticky top-8 space-y-1">
                              {navigation.map((item) => (
                                   <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${activeTab === item.id
                                                  ? 'bg-accent text-text-inverse shadow-lg'
                                                  : 'hover:bg-bg-subtle text-text-muted'
                                             }`}
                                   >
                                        <div className="flex items-center gap-3">
                                             <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
                                             <span className="text-ui font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        <ChevronRight
                                             size={14}
                                             className={`transition-transform duration-300 ${activeTab === item.id ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                                        />
                                   </button>
                              ))}

                              <div className="mt-8 pt-8 border-t border-border-default space-y-4">
                                   <button className="flex items-center gap-2 text-caption text-text-muted hover:text-accent transition-colors px-4">
                                        <Printer size={14} />
                                        <span>Print Document</span>
                                   </button>
                                   <button className="flex items-center gap-2 text-caption text-text-muted hover:text-accent transition-colors px-4">
                                        <Download size={14} />
                                        <span>Download PDF</span>
                                   </button>
                              </div>
                         </nav>
                    </aside>

                    {/* Content Area */}
                    <section className="lg:col-span-9 bg-bg-card border border-border-subtle rounded-3xl p-8 md:p-12 shadow-sm">
                         <div className="max-w-none prose prose-slate">

                              {activeTab === 'terms' && (
                                   <div id="terms" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <header className="space-y-2 pb-6 border-b border-border-subtle">
                                             <h2 className="text-headline font-headline text-accent uppercase tracking-widest">Terms of Service</h2>
                                             <p className="text-caption text-text-disabled">Last Updated: October 24, 2024</p>
                                        </header>

                                        <div className="space-y-8">
                                             <section className="space-y-4">
                                                  <h3 className="text-subheading font-bold text-text-primary">1. Agreement to Terms</h3>
                                                  <p className="text-body-sm leading-relaxed text-text-muted">
                                                       By accessing the Avoire a Perfume website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                                                  </p>
                                             </section>

                                             <section className="space-y-4">
                                                  <h3 className="text-subheading font-bold text-text-primary">2. Luxury Standards & Authenticity</h3>
                                                  <p className="text-body-sm leading-relaxed text-text-muted">
                                                       All products sold through Avoire are guaranteed authentic. We maintain the highest standards of craftsmanship. Please note that natural variations in botanical ingredients may result in slight color differences between batches.
                                                  </p>
                                                  <ul className="list-disc pl-5 text-body-sm text-text-muted space-y-2">
                                                       <li>Products are for personal use only and not for unauthorized resale.</li>
                                                       <li>Intellectual property rights for all scent formulations remain with Avoire.</li>
                                                       <li>We reserve the right to limit quantities of specific limited edition releases.</li>
                                                  </ul>
                                             </section>

                                             <section className="space-y-4 bg-bg-subtle p-6 rounded-2xl border border-border-strong/20">
                                                  <h3 className="text-ui font-bold text-accent">3. Limitations of Liability</h3>
                                                  <p className="text-body-sm leading-relaxed text-text-muted italic">
                                                       In no event shall Avoire or its suppliers be liable for any damages arising out of the use or inability to use the materials on Avoire's website, even if Avoire has been notified orally or in writing of the possibility of such damage.
                                                  </p>
                                             </section>
                                        </div>
                                   </div>
                              )}
                              {activeTab === 'privacy' && (
                                   <div id="privacy" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <header className="space-y-2 pb-6 border-b border-border-subtle">
                                             <h2 className="text-headline font-headline text-accent uppercase tracking-widest">Privacy Policy</h2>
                                             <p className="text-caption text-text-disabled">Last Updated: October 24, 2024</p>
                                        </header>

                                        <div className="space-y-8">
                                             <section className="space-y-4">
                                                  <h3 className="text-subheading font-bold text-text-primary">Data We Collect</h3>
                                                  <p className="text-body-sm leading-relaxed text-text-muted">
                                                       To provide our bespoke olfactory experience, we collect information that allows us to personalize your journey. This includes:
                                                  </p>
                                                  <div className="grid md:grid-cols-2 gap-4">
                                                       <div className="p-4 bg-bg-page rounded-xl border border-border-subtle">
                                                            <h4 className="text-ui font-bold mb-1">Identity Data</h4>
                                                            <p className="text-caption text-text-muted">Name, email, and fragrance preferences.</p>
                                                       </div>
                                                       <div className="p-4 bg-bg-page rounded-xl border border-border-subtle">
                                                            <h4 className="text-ui font-bold mb-1">Transaction Data</h4>
                                                            <p className="text-caption text-text-muted">Purchase history and billing addresses.</p>
                                                       </div>
                                                  </div>
                                             </section>

                                             <section className="space-y-4">
                                                  <h3 className="text-subheading font-bold text-text-primary">How We Use Your Data</h3>
                                                  <p className="text-body-sm leading-relaxed text-text-muted">
                                                       Your privacy is paramount. We use your data exclusively to process orders, improve our formulations, and send tailored invitations to the Avoire Circle. We never sell your data to third parties.
                                                  </p>
                                             </section>
                                        </div>
                                   </div>
                              )}

                              {/* Placeholder for other tabs */}
                              {(activeTab === 'shipping' || activeTab === 'cookies') && (
                                   <div className="py-20 text-center space-y-4 animate-pulse">
                                        <FileText size={48} className="mx-auto text-border-strong" />
                                        <p className="text-ui text-text-disabled uppercase tracking-widest">Document Loading...</p>
                                   </div>
                              )}

                         </div>
                    </section>
               </main>

               {/* Simple Footer Link back to main site */}
               <footer className="max-w-7xl mx-auto py-12 px-page-x border-t border-border-default text-center">
                    <p className="text-caption text-text-disabled">
                         Questions regarding our policies? Contact our <a href="/contact" className="text-accent underline underline-offset-4 font-medium">Concierge Team</a>.
                    </p>
               </footer>
          </div>
     );
};

export default TermsAndPrivacy;