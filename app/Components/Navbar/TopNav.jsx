"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Info,
  Truck,
  Undo2,
  HelpCircle,
  User,
  LogIn,
} from 'lucide-react';

const UtilityLink = ({ href, icon: Icon, children }) => (
  <Link
    href={href}
    className="flex items-center gap-1.5 text-sm font-medium text-text-inverse transition-opacity hover:opacity-80"
  >
    <Icon size={16} aria-hidden="true" />
    <span>{children}</span>
  </Link>
);

const TopNavbar = () => {
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(status === "authenticated");
  }, [status]);

  return (
    <div className="bg-[#1a1a1a] text-[#f4f1ea] py-3 md:py-2 text-center text-[8px]  md:text-[10px] tracking-[0.2em] uppercase font-medium">
      Complimentary Shipping on all orders over 5000 PKR
    </div>
    // <nav
    //   className="w-full bg-text-primary px-4 py-2 sm:px-6 lg:px-8"
    // >
    //   <div className="container mx-auto flex flex-col items-center justify-between gap-y-2 gap-x-4 md:flex-row">

    //     {/* Left Section */}
    //     <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 md:justify-start">
    //       <UtilityLink href="/about" icon={Info}>About Us</UtilityLink>
    //       <UtilityLink href="/terms_conditions#shipping" icon={Truck}>Free Delivery</UtilityLink>
    //       <UtilityLink href="/terms_conditions#returns" icon={Undo2}>Return Policy</UtilityLink>
    //     </div>

    //     {/* Right Section */}
    //     <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 md:justify-start">
    //       <UtilityLink href="/helpCenter" icon={HelpCircle}>Help Center</UtilityLink>
    //       {!isLogin ? (
    //         <UtilityLink href="/login" icon={LogIn}>Login/Register</UtilityLink>
    //       ) : (
    //         <UtilityLink href="/account" icon={User}>My Account</UtilityLink>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default TopNavbar;