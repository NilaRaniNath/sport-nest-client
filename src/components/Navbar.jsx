"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = {
    name: "Nila",
    email: "nila@example.com",
    avatar: "/avatar.jpg" 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
   
    <nav className="bg-[#0B1528]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
         
          <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
            <span className="text-xl font-black tracking-wider text-white">
              Sport<span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:text-teal-300 transition-colors">Nest</span>
            </span>
          </Link>

         
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200">
              Home
            </Link>
            <Link href="/facilities" className="text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200">
              All Facilities
            </Link>
            
            {isLoggedIn && (
              <>
                <Link href="/my-bookings" className="text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200">
                  My Bookings
                </Link>
                <Link href="/add-facility" className="text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200">
                  Add Facility
                </Link>
                <Link href="/manage-facilities" className="text-slate-300 hover:text-teal-400 font-medium text-sm tracking-wide transition-colors duration-200">
                  Manage Facilities
                </Link>
              </>
            )}
          </div>

         
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-2 pr-3 py-1 transition-all"
                >
                  <Image 
                    className="h-7 w-7 rounded-full object-cover border border-teal-500/30" 
                    src={user.avatar} 
                    alt="User profile" 
                    height={32} 
                    width={32} 
                  />
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

              
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2.5 w-56 rounded-2xl shadow-2xl bg-slate-900 border border-white/10 divide-y divide-white/5 focus:outline-none z-50">
                    <div className="px-4 py-3 bg-white/[0.02] rounded-t-2xl">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        My Bookings
                      </Link>
                      <Link href="/add-facility" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        Add Facility
                      </Link>
                      <Link href="/manage-facilities" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
                        Manage Facilities
                      </Link>
                    </div>
                    <div className="py-1">
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-b-2xl">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
             
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/10 hover:opacity-90 transition duration-150"
              >
                Login
              </button>
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
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            Home
          </Link>
          <Link href="/facilities" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-teal-400 transition-colors">
            All Facilities
          </Link>
          
          {isLoggedIn ? (
            <div className="pt-4 mt-4 border-t border-white/5">
              <div className="flex items-center px-3 mb-4">
                <Image className="h-9 w-9 rounded-full object-cover border border-teal-500/30" src={user.avatar} alt="User Avatar" height={36} width={36}/>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-slate-200">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                </div>
              </div>
              <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-teal-400 transition-colors">
                My Bookings
              </Link>
              <Link href="/add-facility" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-teal-400 transition-colors">
                Add Facility
              </Link>
              <Link href="/manage-facilities" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-teal-400 transition-colors">
                Manage Facilities
              </Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 mt-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 mt-4 border-t border-white/5">
              <button onClick={() => { setIsLoggedIn(true); setIsMobileMenuOpen(false); }} className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-center px-4 py-2.5 rounded-xl font-bold transition-all shadow-md">
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;