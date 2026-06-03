"use client";
import React from "react";
import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 sm:px-6 overflow-hidden relative">
      
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse delay-75"></div>

      <div className="max-w-md w-full text-center relative z-10 space-y-8">
        
        
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 border border-white/10 rounded-3xl text-teal-400 shadow-xl shadow-teal-500/5 animate-bounce">
          <HelpCircle size={40} strokeWidth={1.5} />
        </div>

        
        <div className="space-y-2">
          <h1 className="text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent select-none drop-shadow-sm">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Page Not Found
          </h2>
        </div>

       
        <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          Oops! The page you are looking for does not exist or has been moved to another arena. Let us get you back on track.
        </p>

        
        <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full mx-auto"></div>

        
        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg shadow-teal-500/10 hover:opacity-95 transition-all active:scale-95 group"
          >
            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>

      </div>

    
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}