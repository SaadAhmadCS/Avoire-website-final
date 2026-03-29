"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Gem,
  FlaskConical,
  Leaf,
  MapPin,
  Quote,
  Sparkles,
  ChevronRight
} from "lucide-react";

const milestones = [
  { year: "2024", text: "Avoire founded in the heart of Paris" },
  { year: "2024", text: "First collection of 12 signature scents launched" },
  { year: "2025", text: "Opened flagship atelier on the Champs-Élysées" },
  { year: "2025", text: "Expanded to worldwide shipping across 40+ countries" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-body selection:bg-accent/30 selection:text-accent py-24">

      {/* ─── Hero ─── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-hero.jpg"
            alt="Atelier Atmosphere"
            className="w-full h-full object-cover opacity-20 grayscale transition-transform duration-[10s] scale-110 animate-slow-zoom"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-transparent to-[#131313]" />
          <div className="absolute inset-0 bg-[#131313]/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl space-y-12">
          <div className="inline-flex items-center space-x-3 text-accent animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles size={14} strokeWidth={1.5} />
            <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold">The Anthology of Scent</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline leading-[0.85] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Crafting <span className="italic font-normal text-accent">Emotion</span> <br />
            In Every <span className="italic font-normal">Layer.</span>
          </h1>

          <p className="text-lg md:text-xl font-body italic text-[#d1c4ba]/60 max-w-xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-500">
            A Parisian maison devoted to the architecture of rare, unforgettable sensory experiences.
          </p>
        </div>
      </section>

      {/* ─── Origin Story ─── */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48 border-b border-[#353535]/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden group">
            <div className="absolute inset-0 bg-[#1c1b1b]">
              <img
                src="/shop.jpg"
                alt="The Avoire founder"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="absolute inset-0 border border-accent/10 group-hover:border-accent/30 transition-colors pointer-events-none" />
          </div>

          {/* Text */}
          <div className="space-y-10 lg:py-8">
            <div className="flex items-center space-x-4">
              <span className="w-12 h-px bg-accent/30" />
              <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-accent">The Genesis</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-headline leading-tight tracking-tight">
              Driven by an <br />
              <span className="italic font-normal text-accent">Inextinguishable</span> Curiosity.
            </h2>

            <div className="space-y-6 text-[#d1c4ba]/70 font-body leading-relaxed text-[17px] italic">
              <p>
                Avoire was architected from a singular, immutable conviction: that fragrance is the ultimate sanctuary of self-expression. In 2024, within a light-drenched atelier in the heart of Paris, we embarked on a journey to transcend the ordinary.
              </p>
              <p>
                Rejecting the compromises of mass-production, we turned toward the arcane. Hand-blending the rarest absolutes in limited batches, our master perfumers treat every composition as a living, breathing work of art.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 text-[#4d453e]">
              <MapPin size={16} strokeWidth={1} />
              <span className="font-label text-[10px] uppercase tracking-[0.25em] font-bold">Registered 2024 — Paris, France</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy Quote ─── */}
      <section className="py-40 px-6 bg-[#0e0e0e] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-accent/0 via-accent/10 to-accent/0" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-accent/0 via-accent/10 to-accent/0" />
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <Quote
            size={48}
            strokeWidth={0.5}
            className="mx-auto text-accent/20 mb-4"
          />
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-headline italic leading-[1.2] tracking-tight">
            "A fragrance should be a visceral state of being—invisible to the aesthetic, but <span className="text-accent underline decoration-accent/20 underline-offset-8">indelible</span> to the soul."
          </blockquote>
          <div className="flex flex-col items-center space-y-4">
            <span className="w-8 h-px bg-accent" />
            <cite className="block font-label text-[10px] uppercase tracking-[0.5em] font-bold text-accent not-italic">
              THE ATELIER MANIFESTO
            </cite>
          </div>
        </div>
      </section>

      {/* ─── The Craft / The Experience (Alternating) ─── */}
      <section className="bg-[#131313]">
        <div className="max-w-7xl mx-auto border-x border-[#353535]/20">
          {/* Craft */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative overflow-hidden min-h-[500px] lg:min-h-[700px] border-b lg:border-b-0 lg:border-r border-[#353535]/30 group">
              <img
                src="/perfumeBlending.jpg"
                alt="Atelier Craft"
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute flex items-center justify-center inset-0 bg-[#0e0e0e]/20" />
            </div>

            <div className="flex items-center px-12 md:px-20 py-24 lg:py-32">
              <div className="max-w-lg space-y-10">
                <div className="font-label text-[10px] uppercase tracking-[0.4em] font-bold text-accent">The Orchestration</div>
                <h2 className="text-5xl md:text-6xl font-headline leading-tight tracking-tight">
                  Where Science <br />
                  Becomes <span className="italic font-normal text-accent">Alchemy.</span>
                </h2>
                <div className="space-y-6 text-[#d1c4ba]/70 font-body leading-relaxed text-lg italic">
                  <p>
                    Every Avoire essence begins its sequence at the source. From the pristine saffron fields of Iran to the ancient deodar forests of India, we traverse the globe for the impossible.
                  </p>
                  <p>
                    Within our sanctuary, these raw signals are translated by perfumers who spend seasons refining each chord. We do not manufacture; we orchestrate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#353535]/30">
            <div className="flex items-center px-12 md:px-20 py-24 lg:py-32 order-2 lg:order-1">
              <div className="max-w-lg space-y-10">
                <div className="font-label text-[10px] uppercase tracking-[0.4em] font-bold text-accent">The Metamorphosis</div>
                <h2 className="text-5xl md:text-6xl font-headline leading-tight tracking-tight">
                  Evolving upon <br />
                  the <span className="italic font-normal text-accent">Pulse.</span>
                </h2>
                <div className="space-y-6 text-[#d1c4ba]/70 font-body leading-relaxed text-lg italic">
                  <p>
                    An Avoire fragrance is a living system. Designed to evolve over the passage of hours—a fleeting, luminous opening followed by an intimate heart, settling into a deep resonance that is uniquely yours.
                  </p>
                  <p>
                    We believe scent is a second architecture for the body. It should bridge spaces and seal memories, leaving a phantom presence long after you have departed.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden min-h-[500px] lg:min-h-[700px] order-1 lg:order-2 group">
              <img
                src="/fragrance.jpg"
                alt="Scent Evolution"
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-[#0e0e0e]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pillars of Integrity ─── */}
      <section className="py-32 md:py-48 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Ethos</span>
            <h2 className="text-5xl md:text-6xl font-headline tracking-tighter">
              The Avoire <span className="italic font-normal">Pillars</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                icon: Gem,
                title: "Absolute Quality",
                text: "No compromise. Every molecule is verified for its vibration and lineage before it is allowed into the atelier.",
              },
              {
                icon: FlaskConical,
                title: "Rare Batch Integrity",
                text: "We operate in fragments. Producing only in finite quantities to preserve the sanctity of the composition.",
              },
              {
                icon: Leaf,
                title: "Circular Luxury",
                text: "From ethically harvested resins to hand-finished, recyclable silhouettes, sustainability is our fundamental baseline.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="group p-10 border border-[#353535]/30 bg-[#131313] hover:border-accent/40 transition-all duration-700 space-y-8">
                <div className="w-14 h-14 border border-accent/20 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:bg-accent/[0.03] transition-all">
                  <Icon size={24} strokeWidth={1} />
                </div>
                <h3 className="font-label text-[11px] uppercase tracking-[0.3em] font-bold text-accent">
                  {title}
                </h3>
                <p className="font-body text-[15px] italic leading-relaxed text-[#d1c4ba]/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="py-32 md:py-48 px-6 bg-[#131313]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-32 space-y-4">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Continuum</span>
            <h2 className="text-5xl md:text-6xl font-headline">The <span className="italic font-normal">Trajectory</span></h2>
          </div>

          <div className="space-y-32">
            {milestones.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  i % 2 === 1 ? "md:flex-row-reverse text-center md:text-right" : "text-center md:text-left"
                }`}
              >
                <div className="w-full md:w-1/2 space-y-4 animate-in fade-in duration-1000">
                  <span className="font-label text-4xl text-accent font-bold tracking-tighter opacity-20">{item.year}</span>
                  <p className="font-headline text-2xl lg:text-3xl tracking-tight leading-snug">{item.text}</p>
                </div>
                <div className="hidden md:block w-32 h-px bg-accent/20" />
                <div className="hidden md:block w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-[#0e0e0e] py-40 md:py-56 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-16">
          <h2 className="text-5xl md:text-8xl font-headline leading-none tracking-tighter">
            Enter the <br />
            <span className="italic font-normal text-accent">Atelier.</span>
          </h2>

          <p className="font-body text-lg italic text-[#d1c4ba]/50 max-w-md mx-auto leading-relaxed">
            Begin your exploration of our sensory fragments. Your signature scent is waiting to be uncovered.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center space-x-6 px-16 h-20 bg-accent text-[#131313] font-label text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-white transition-all duration-700 active:scale-[0.98] group"
          >
            <span>Discovery Selection</span>
            <ChevronRight
              size={16}
              className="group-hover:translate-x-3 transition-transform duration-500"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
