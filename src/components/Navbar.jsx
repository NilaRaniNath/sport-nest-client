"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const Navbar = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  const user = {
    name: "nila",
    email: "nila@example.com",
    avatar: "/public/avatar.jpg"
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
   
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
        
          <div className="flex items-center space-x-2 cursor-pointer">
           
            <span className="text-xl font-bold text-gray-800 tracking-tight">Sport<span className="text-indigo-600">Nest</span></span>
          </div>

    
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Home</a>
            <a href="#facilities" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">All Facilities</a>
            
           
            {isLoggedIn && (
              <>
                <a href="#my-bookings" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">My Bookings</a>
                <a href="#add-facility" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Add Facility</a>
                <a href="#manage-facilities" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150">Manage My Facilities</a>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
            
              <div className="relative ml-3">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
                >
                  <Image className="h-9 w-9 rounded-full object-cover border border-gray-300" src={user.avatar} alt="User profile" height={40} width={40} />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

             
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <a href="#my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</a>
                      <a href="#add-facility" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add Facility</a>
                      <a href="#manage-facilities" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage My Facilities</a>
                    </div>
                    <div className="py-1">
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium shadow-sm hover:bg-indigo-700 transition duration-150"
              >
                Login
              </button>
            )}
          </div>

      
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
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
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 pt-2 pb-4 space-y-1">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">Home</a>
          <a href="#facilities" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">All Facilities</a>
          
          {isLoggedIn ? (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 mb-3">
                <Image className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="" height={40} width={40}/>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <a href="#my-bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">My Bookings</a>
              <a href="#add-facility" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">Add Facility</a>
              <a href="#manage-facilities" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">Manage My Facilities</a>
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 mt-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <button onClick={() => setIsLoggedIn(true)} className="w-full bg-indigo-600 text-white text-center px-4 py-2 rounded-md font-medium">Login</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;