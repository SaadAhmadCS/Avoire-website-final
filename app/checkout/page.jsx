"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ChevronRight,
  Lock,
  Banknote,
  Truck,
  CheckCircle2,
  Upload,
  X,
  Image as ImageIcon,
  ArrowLeft,
  ShieldLock
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartCard from "../Components/CartCard";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ─── Bank Details ───
const BANK_DETAILS = {
  accountTitle: "RAZI SHOAIB",
  accountNumber: "03128555929",
  bankName: "Easypaisa",
  iban: "PK70 EASO 0000 0003 1285 5592 9" // Added example IBAN for filler
};

/**
 * StepIndicator - Refined for Noir Atelier
 */
const StepIndicator = ({ number, title, active, completed }) => (
  <div className={`flex items-center space-x-4 transition-all duration-700 ${active || completed ? "opacity-100" : "opacity-30"}`}>
    <div className={`w-6 h-6 flex items-center justify-center transition-all duration-500 ${
      active ? "text-accent" : completed ? "text-accent" : "text-[#d1c4ba]"
    }`}>
      {completed ? <CheckCircle2 size={18} /> : <span className="font-label text-xs font-bold tracking-tighter">{number}</span>}
    </div>
    <span className={`font-label text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap ${active ? "text-accent" : "text-[#e5e2e1]"}`}>
      {title}
    </span>
  </div>
);

/**
 * Premium Input Field
 */
const InputField = ({ type = "text", label, placeholder, value, onChange, className = "", required = false }) => (
  <div className={`relative group ${className}`}>
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="peer w-full bg-transparent border-b border-[#353535] py-4 text-sm text-[#e5e2e1] placeholder-transparent focus:outline-none focus:border-accent transition-all duration-500 font-body"
    />
    <label className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-accent transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#4d453e] peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-accent pointer-events-none">
      {label} {required && "*"}
    </label>
    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-700 group-hover:w-full peer-focus:w-full"></div>
  </div>
);

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // "cod" or "bank_transfer"
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || session.user.name?.split(" ")[0] || "",
        lastName: prev.lastName || session.user.name?.split(" ").slice(1).join(" ") || "",
        email: prev.email || session.user.email || "",
      }));
    }
  }, [session]);

  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty ?? 1),
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]{7,}$/;

    if (!nameRegex.test(formData.firstName)) return "First name must be at least 2 characters.";
    if (!nameRegex.test(formData.lastName)) return "Last name must be at least 2 characters.";
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    if (!phoneRegex.test(formData.phone)) return "Please enter a valid phone number.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.city.trim()) return "City is required.";
    if (!formData.postCode.trim()) return "Post code is required.";
    return null;
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("File too large", "Please upload an image under 5MB.", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentScreenshot(reader.result);
      setScreenshotPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    if (total === 0) {
      setLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Cart Empty",
        text: "Please add items to your selection.",
        confirmButtonText: "Return to Boutique",
        confirmButtonColor: "#000",
      }).then(() => router.push("/shop"));
    }

    if (!paymentMethod) {
      setLoading(false);
      return Swal.fire("Payment Method", "Please select a preferred payment method.", "warning");
    }

    if (paymentMethod === "bank_transfer" && !paymentScreenshot) {
      setLoading(false);
      return Swal.fire("Verification Required", "Please upload a transfer receipt for verification.", "warning");
    }

    try {
      const orderData = {
        items: cartItems.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          qty: i.qty || 1,
        })),
        total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postCode,
          country: formData.country,
        },
        paymentMethod,
        paymentScreenshot: paymentMethod === "bank_transfer" ? paymentScreenshot : "",
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Order Secured",
          text: paymentMethod === "cod" 
            ? "Your Avoire collection is confirmed. Payment requested upon delivery." 
            : "Verification in progress. Your order is secured.",
          confirmButtonColor: "#131313",
          confirmButtonText: "Continue Discovery",
        });

        clearCart();
        router.push("/");
      } else {
        Swal.fire("Error", result.error || "Failed to secure order.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Atelier Error",
        text: "Our systems encountered a brief interruption. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (total === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 border border-[#353535] flex items-center justify-center text-[#4d453e] mb-10">
          <ShoppingBag size={40} strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-headline italic mb-4">The Bag is Silent</h2>
        <p className="text-[#d1c4ba]/60 font-body max-w-xs mb-10 leading-relaxed italic">
          Your collection is currently empty. Discovery awaits in our boutique.
        </p>
        <Link
          href="/shop"
          className="px-12 h-16 flex items-center justify-center bg-accent text-[#131313] uppercase font-label font-bold tracking-[0.4em] text-[11px] hover:bg-[#dac2ac] transition-all duration-700"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131313] font-body text-[#e5e2e1] selection:bg-accent/30 selection:text-accent py-24">
      <main className="max-w-7xl mx-auto px-6 py-16 md:px-12">
        
        {/* Guest Authentication Nudge */}
        {status !== "authenticated" && (
          <div className="mb-20 p-8 border border-accent/10 bg-[#1c1b1b]/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-[#1c1b1b] group">
            <div className="text-center md:text-left">
              <p className="font-headline text-lg italic group-hover:text-accent transition-colors">Already part of the Atelier?</p>
              <p className="font-body text-xs text-[#d1c4ba]/60 mt-1">Sign in for a tailored checkout experience.</p>
            </div>
            <button
              onClick={() => signIn("google")}
              className="px-8 py-4 border border-[#353535] text-[10px] font-bold uppercase tracking-[0.3em] text-[#e5e2e1] hover:bg-white hover:text-black transition-all flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="currentColor" opacity="0.7" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" opacity="0.5" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" opacity="0.3" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Account
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Left: Interactive Multi-Step Flow */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Step Breadcrumbs */}
            <div className="flex items-center space-x-8 pb-12 border-b border-[#353535]/30 overflow-x-auto no-scrollbar">
              <StepIndicator number="01" title="Address" active={step === 1} completed={step > 1} />
              <ChevronRight size={12} className="text-[#353535] flex-shrink-0" />
              <StepIndicator number="02" title="Payment" active={step === 2} completed={step > 2} />
              <ChevronRight size={12} className="text-[#353535] flex-shrink-0" />
              <StepIndicator number="03" title="Validation" active={step === 3} />
            </div>

            {/* ── Step 1: Address Details ── */}
            <section className={`transition-all duration-700 ${step !== 1 ? "hidden opacity-0" : "animate-in fade-in slide-in-from-bottom-10"}`}>
              <header className="mb-10">
                   <h2 className="text-4xl font-headline tracking-tight mb-2">Shipping <span className="italic">Locus</span></h2>
                   <p className="font-body text-sm text-[#d1c4ba]/50 italic text-[13px]">Specify the sanctuary for your new fragrance selection.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <InputField label="First Name" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                <InputField label="Last Name" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                <InputField label="Email Detail" type="email" placeholder="Email Detail" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="md:col-span-2" required />
                <InputField label="Contact Number" type="tel" placeholder="Contact Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="md:col-span-2" required />
                <InputField label="Physical Address" placeholder="Physical Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="md:col-span-2" required />
                <InputField label="City" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                <InputField label="Postal Code" placeholder="Postal Code" value={formData.postCode} onChange={(e) => setFormData({ ...formData, postCode: e.target.value })} required />
              </div>
              
              <div className="mt-16">
                <button
                  onClick={() => {
                    const errorMsg = validateForm();
                    if (errorMsg) return Swal.fire("Atelier Notice", errorMsg, "warning");
                    setStep(2);
                  }}
                  className="w-full md:w-auto px-16 h-16 bg-accent text-[#131313] font-label font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-[#dac2ac] transition-all duration-700 flex items-center justify-center group"
                >
                  Proceed to Payment
                  <ChevronRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>

            {/* ── Step 2: Payment Acquisition ── */}
            <section className={`transition-all duration-700 ${step !== 2 ? "hidden opacity-0" : "animate-in fade-in slide-in-from-bottom-10"}`}>
              <header className="mb-10 flex items-center justify-between">
                   <div>
                        <h2 className="text-4xl font-headline tracking-tight mb-2">Currency of <span className="italic">Exchange</span></h2>
                        <p className="font-body text-sm text-[#d1c4ba]/50 italic text-[13px]">Select your preferred method of settlement.</p>
                   </div>
                   <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest text-accent font-bold hover:underline">Back to Shipping</button>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* COD Option */}
                <button
                  onClick={() => { setPaymentMethod("cod"); removeScreenshot(); }}
                  className={`p-10 border transition-all duration-700 flex flex-col items-center text-center space-y-6 group ${
                    paymentMethod === "cod" ? "border-accent bg-accent/[0.03]" : "border-[#353535] hover:border-[#d1c4ba]/50"
                  }`}
                >
                  <div className={`w-16 h-16 flex items-center justify-center transition-colors duration-700 ${paymentMethod === "cod" ? "text-accent" : "text-[#4d453e] group-hover:text-[#d1c4ba]"}`}>
                    <Truck size={32} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-headline text-xl">Settlement on Arrival</p>
                    <p className="font-body text-xs text-[#d1c4ba]/50 tracking-wide px-4">Pay in person upon the arrival of your signature scent.</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 transition-all ${paymentMethod === "cod" ? "bg-accent border-accent" : "border-[#353535]"}`} />
                </button>

                {/* Bank Transfer Option */}
                <button
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`p-10 border transition-all duration-700 flex flex-col items-center text-center space-y-6 group ${
                    paymentMethod === "bank_transfer" ? "border-accent bg-accent/[0.03]" : "border-[#353535] hover:border-[#d1c4ba]/50"
                  }`}
                >
                  <div className={`w-16 h-16 flex items-center justify-center transition-colors duration-700 ${paymentMethod === "bank_transfer" ? "text-accent" : "text-[#4d453e] group-hover:text-[#d1c4ba]"}`}>
                    <Banknote size={32} strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-headline text-xl">Electronic Transfer</p>
                    <p className="font-body text-xs text-[#d1c4ba]/50 tracking-wide px-4">Direct transfer via banking portals for priority orchestration.</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 transition-all ${paymentMethod === "bank_transfer" ? "bg-accent border-accent" : "border-[#353535]"}`} />
                </button>
              </div>

              {/* Bank Details & Receipt Upload */}
              {paymentMethod === "bank_transfer" && (
                <div className="mt-12 space-y-12 animate-in fade-in duration-1000">
                  <div className="p-8 border border-[#353535] bg-[#1c1b1b]/30">
                    <h4 className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-8">Atelier Bank Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#4d453e]">Account Title</p>
                        <p className="font-headline text-lg mt-1 italic">{BANK_DETAILS.accountTitle}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#4d453e]">Service / Provider</p>
                        <p className="font-headline text-lg mt-1 italic">{BANK_DETAILS.bankName}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#4d453e]">Standard Identifier (Phone/Acc)</p>
                        <p className="font-headline text-2xl mt-1 tracking-widest text-accent">{BANK_DETAILS.accountNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-label text-[10px] uppercase tracking-[0.3em] font-bold text-accent">Receipt Verification</h4>
                    {!screenshotPreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-56 border border-dashed border-[#353535] group cursor-pointer hover:bg-accent/[0.02] hover:border-accent/40 transition-all duration-700">
                        <Upload size={24} strokeWidth={1} className="text-[#4d453e] group-hover:text-accent transition-colors mb-4" />
                        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-[#d1c4ba]">Upload Verification Capture</p>
                        <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
                      </label>
                    ) : (
                      <div className="relative border border-[#353535] overflow-hidden group">
                        <img src={screenshotPreview} alt="Receipt" className="w-full max-h-80 object-contain bg-[#0e0e0e] py-4" />
                        <button onClick={removeScreenshot} className="absolute top-4 right-4 p-3 bg-red-950/20 backdrop-blur-md text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-16">
                <button
                  onClick={() => {
                    if (paymentMethod === "bank_transfer" && !paymentScreenshot) {
                      return Swal.fire("Verify Transaction", "Please upload your capture before finalizing.", "warning");
                    }
                    setStep(3);
                  }}
                  disabled={!paymentMethod}
                  className="w-full md:w-auto px-16 h-16 bg-accent text-[#131313] font-label font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-[#dac2ac] transition-all duration-700 flex items-center justify-center group disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Review Order Selection
                  <ChevronRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>

            {/* ── Step 3: Final Consensus ── */}
            <section className={`transition-all duration-700 ${step !== 3 ? "hidden opacity-0" : "animate-in fade-in slide-in-from-bottom-10"}`}>
               <header className="mb-10 flex items-center justify-between">
                   <div>
                        <h2 className="text-4xl font-headline tracking-tight mb-2">Final <span className="italic">Consensus</span></h2>
                        <p className="font-body text-sm text-[#d1c4ba]/50 italic text-[13px]">Review your transaction before it is permanently architected.</p>
                   </div>
                   <button onClick={() => setStep(2)} className="text-[10px] uppercase tracking-widest text-accent font-bold hover:underline">Revise Payment</button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="p-8 border border-[#353535] space-y-4">
                  <h4 className="font-label text-[9px] uppercase tracking-[0.3em] font-bold text-[#4d453e]">Destination</h4>
                  <p className="font-headline text-lg">{formData.firstName} {formData.lastName}</p>
                  <p className="font-body text-sm text-[#d1c4ba]/70 leading-relaxed">{formData.address}, {formData.city}, {formData.postCode}</p>
                  <p className="font-label text-[11px] tracking-wider pt-2 opacity-50">{formData.phone}</p>
                </div>
                
                <div className="p-8 border border-[#353535] space-y-4">
                  <h4 className="font-label text-[9px] uppercase tracking-[0.3em] font-bold text-[#4d453e]">Settlement</h4>
                  <div className="flex items-center space-x-3">
                    {paymentMethod === "cod" ? <Truck size={18} className="text-accent" /> : <Banknote size={18} className="text-accent" />}
                    <span className="font-headline text-lg italic">{paymentMethod === "cod" ? "Pay on Delivery" : "Bank Transfer Verified"}</span>
                  </div>
                  {paymentMethod === "bank_transfer" && (
                    <div className="text-[10px] text-accent/60 uppercase font-bold tracking-[0.1em] border-t border-accent/10 pt-4">Receipt Attached — Verification Pending</div>
                  )}
                </div>
              </div>

              {/* Free Shipping Nudge */}
              {subtotal < 5000 && (
                <Link href="/shop" className="block w-full text-center py-5 border border-accent/10 bg-accent/[0.02] mb-8 font-label text-[10px] uppercase tracking-[0.3em] text-accent hover:bg-accent/[0.05] transition-all">
                  Inscribe {(5000 - subtotal).toLocaleString()} PKR more for <span className="font-bold">Complimentary Shipping</span>
                </Link>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-20 bg-accent text-[#131313] font-label font-bold uppercase tracking-[0.5em] text-[12px] flex items-center justify-center hover:bg-[#dac2ac] transition-all duration-700 active:scale-[0.99] disabled:opacity-30 gap-4 group"
              >
                {loading ? (
                   <span className="w-5 h-5 border-2 border-[#131313] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldLock size={18} className="group-hover:scale-110 transition-transform" />
                    <span>Confirm Order — {total.toLocaleString()} PKR</span>
                  </>
                )}
              </button>
              
              <div className="mt-8 flex items-center justify-center space-x-3 text-[10px] text-[#4d453e] font-bold uppercase tracking-[0.3em]">
                <Lock size={12} strokeWidth={3} />
                <span>Atelier Level Security Encryption</span>
              </div>
            </section>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-36">
            <CartCard
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              className="w-full"
              isCheckoutPage={true}
            />
            
            <div className="mt-8 p-6 bg-[#1c1b1b]/30 border border-[#353535]/50">
               <div className="flex items-center space-x-3 text-accent mb-4">
                  <ShieldCheck size={18} strokeWidth={1.5} />
                  <span className="font-label text-[11px] uppercase tracking-[0.2em] font-bold">Assurance</span>
               </div>
               <p className="font-body text-[11px] leading-relaxed text-[#d1c4ba]/50 italic">
                  Ordering from Avoire.com is architected to be as intimate as the scents themselves. All transactions are securely processed via state-of-the-art encryption protocols.
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
