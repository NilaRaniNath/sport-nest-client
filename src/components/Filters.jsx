"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sportType, setSportType] = useState(searchParams.get("sportType") || "");

  
  const sports = ["Football", "Cricket", "Badminton", "Tennis", "Gym","Basketball","Volleyball"];

 
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (sportType) params.set("sportType", sportType);

      
      router.push(`/facilities?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search, sportType, router]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 bg-white/[0.02] backdrop-blur-md border border-white/5 p-4 sm:p-5 rounded-2xl max-w-4xl mx-auto">
      
      
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search facilities by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all"
        />
      </div>

    
      <div className="w-full md:w-auto flex flex-wrap gap-2 items-center">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1 hidden sm:flex">
          <SlidersHorizontal size={14} className="text-teal-400" /> Filter:
        </div>
        
        
        <button
          onClick={() => setSportType("")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
            sportType === ""
              ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/10"
              : "bg-white/[0.03] border border-white/5 text-slate-300 hover:bg-white/[0.08]"
          }`}
        >
          All Sports
        </button>

        
        {sports.map((sport) => {
          
          const currentSportValue = sport; 

          return (
            <button
              key={sport}
              onClick={() => setSportType(currentSportValue)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all ${
                sportType === currentSportValue
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md shadow-teal-500/10"
                  : "bg-white/[0.03] border border-white/5 text-slate-300 hover:bg-white/[0.08]"
              }`}
            >
              {sport}
            </button>
          );
        })}
      </div>

    </div>
  );
}