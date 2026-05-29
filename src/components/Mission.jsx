"use client";
import React from "react";

export default function MissionVision() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-[#0B1528] to-slate-950 relative overflow-hidden">
      
     
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
      
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-extrabold text-xs uppercase tracking-widest block mb-2">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Our <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">Mission & Vision</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-light leading-relaxed">
            We are dedicated to building a healthier, more active community by breaking down the barriers to sports and fitness access.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 🎯 ১. Our Mission */}
          <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/[0.05] hover:border-teal-500/30 shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 group-hover:text-slate-950 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-teal-400 transition-colors">Our Mission</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Our mission is to leverage cutting-edge technology to make sports arenas, turfs, and indoor courts instantly accessible. We aim to remove scheduling friction so every sports enthusiast can focus entirely on playing the game they love.
            </p>
          </div>

          {/* 👁️ ২. Our Vision */}
          <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/[0.05] hover:border-sky-500/30 shadow-2xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6 group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-indigo-400 group-hover:text-slate-950 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-sky-400 transition-colors">Our Vision</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We envision a future where an active, healthy lifestyle is a natural part of daily routine for everyone. We strive to establish ourselves as the nations largest and most reliable sports ecosystem, connecting players and facilities seamlessly.
            </p>
          </div>

          {/* 💎 ৩. Our Core Values */}
          <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/[0.05] hover:border-amber-500/30 shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col group hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-linear-to-r group-hover:from-amber-400 group-hover:to-orange-400 group-hover:text-slate-950 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-amber-400 transition-colors">Our Core Values</h3>
            <ul className="text-slate-400 text-sm font-light space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-2 shrink-0 shadow-[0_0_6px_#2dd4bf]" />
                <span><strong className="text-slate-200 font-semibold">Accessibility:</strong> Keeping sports open and easily reachable for everyone.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-2 shrink-0 shadow-[0_0_6px_#2dd4bf]" />
                <span><strong className="text-slate-200 font-semibold">Trust & Safety:</strong> Ensuring 100% verified, secure, and accurate bookings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-2 shrink-0 shadow-[0_0_6px_#2dd4bf]" />
                <span><strong className="text-slate-200 font-semibold">Community:</strong> Empowering local athletes by building a robust digital network.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}