"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ হুককে useEffect এর ভেতর নিয়ে আসা হয়েছে, এতে রানটাইম এরর আসার সব রাস্তা বন্ধ
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await authClient.getSession();
        setSession(res?.data || null);
      } catch (error) {
        console.error("Session fetch error:", error);
      } finally {
        setIsPending(false);
      }
    };
    checkSession();
  }, []);

  // লগইন করা ইউজারের ডাটা স্ট্রাকচার
  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "/avatar.jpg" 
  };

  // লগআউটের পর সরাসরি লগইন পেজে রিডাইরেক্ট করবে
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signin";
        }
      }
    });
  };

  // নেভবার লিংকের কমন স্টাইল
  const navLinkStyle = "text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer";

  return (
    <nav className="bg-[#0B1528]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo + Site Name Section */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
            <span className="text-xl font-black tracking-wider text-white">
              Sport<span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:text-teal-300 transition-colors">Nest</span>
            </span>
          </Link>

          {/* Main Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className={navLinkStyle}>
              Home
            </Link>
            <Link href="/facilities" className={navLinkStyle}>
              All Facilities
            </Link>

            {/* 🔒 কন্ডিশনাল লিংক লজিক */}
            <Link href={session ? "/my-bookings" : "/signin"} className={navLinkStyle}>
              My Bookings
            </Link>
            <Link href={session ? "/add-facility" : "/signin"} className={navLinkStyle}>
              Add Facility
            </Link>
            <Link href={session ? "/manage-facilities" : "/signin"} className={navLinkStyle}>
              Manage My Facilities
            </Link>
          </div>

          {/* Desktop Right Side Content */}
          <div className="hidden md:flex items-center">
            {isPending ? (
              // লোডিং স্টেট স্পিনার
              <div className="w-6 h-6 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
            ) : session ? (
              /* ✅ ইউজার লগইন থাকলে প্রোফাইল ইমেজ ড্রপডাউন */
              <div className="relative ml-3">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-1 pr-3 transition-all duration-200"
                >
                  <Image 
                    className="h-8 w-8 rounded-full object-cover border border-teal-400/40 shadow-inner" 
                    src={user.avatar} 
                    alt="User profile" 
                    height={32} 
                    width={32} 
                  />
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-3 w-60 rounded-2xl shadow-2xl bg-slate-900 border border-white/10 divide-y divide-white/5 focus:outline-none z-50">
                    
                    <div className="px-4 py-3 bg-white/[0.02] rounded-t-2xl">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-teal-400 truncate mt-0.5">{user.name}</p>
                      <p className="text-xs font-medium text-slate-300 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1.5">
                      <Link href="/my-bookings" className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        My Bookings
                      </Link>
                      <Link href="/add-facility" className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        Add Facility
                      </Link>
                      <Link href="/manage-facilities" className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        Manage My Facilities
                      </Link>
                    </div>

                    <div className="py-1">
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-b-2xl">
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
            
              <Link 
                href="/signin"
                className="bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/10 hover:opacity-95 transition-all duration-150 active:scale-[0.98] inline-block"
              >
                Login
              </Link>
            )}
          </div>

         
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

    
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/5 px-4 pt-2 pb-6 space-y-1">
          <Link href="/" className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            Home
          </Link>
          <Link href="/facilities" className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            All Facilities
          </Link>
          
          <Link href={session ? "/my-bookings" : "/signin"} className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            My Bookings
          </Link>
          <Link href={session ? "/add-facility" : "/signin"} className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            Add Facility
          </Link>
          <Link href={session ? "/manage-facilities" : "/signin"} className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            Manage My Facilities
          </Link>
          
          {!isPending && session ? (
            <div className="pt-4 mt-4 border-t border-white/5">
              <div className="flex items-center px-3 mb-4">
                <Image className="h-9 w-9 rounded-full object-cover border border-teal-500/30" src={user.avatar} alt="User Avatar" height={36} width={36}/>
                <div className="ml-3">
                  <div className="text-sm font-bold text-teal-400">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
                Logout
              </button>
            </div>
          ) : !isPending && (
            <div className="pt-4 mt-4 border-t border-white/5">
              <Link href="/signin" className="block w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-center px-4 py-2.5 rounded-xl font-bold transition-all shadow-md">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;