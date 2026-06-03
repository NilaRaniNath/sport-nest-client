import FacilityCardSkeleton from "@/components/FacilityCardSkeleton";
import React from "react";


export default function Loading() {
  
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1528] via-slate-950 to-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
       
        <div className="text-center max-w-3xl mx-auto mb-12 animate-pulse">
          <div className="h-4 bg-white/5 w-24 rounded-full mx-auto mb-3" />
          <div className="h-10 bg-white/5 w-64 sm:w-80 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-white/5 w-full max-w-md rounded-full mx-auto mb-2" />
          <div className="h-4 bg-white/5 w-2/3 max-w-xs rounded-full mx-auto" />
        </div>

       
        <div className="h-14 bg-white/[0.02] border border-white/5 rounded-2xl mb-12 animate-pulse w-full max-w-md mx-auto" />

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletons.map((_, index) => (
            <FacilityCardSkeleton key={index} />
          ))}
        </div>

      </div>
    </div>
  );
}