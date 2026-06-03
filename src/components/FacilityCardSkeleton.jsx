import React from "react";

export default function FacilityCardSkeleton() {
  return (
    <div className="bg-white/[0.01] backdrop-blur-md rounded-3xl p-5 border border-white/5 animate-pulse flex flex-col h-full">
      
      <div className="w-full h-48 bg-white/5 rounded-2xl mb-4" />

     
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-white/5 w-1/4 rounded-full" />
        <div className="h-4 bg-white/5 w-12 rounded-full" />
      </div>

     
      <div className="h-6 bg-white/5 w-3/4 rounded-full mb-3" />

     
      <div className="h-4 bg-white/5 w-1/2 rounded-full mb-6" />

    
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="h-5 bg-white/5 w-20 rounded-full" />
        <div className="h-10 bg-white/5 w-28 rounded-xl" />
      </div>
    </div>
  );
}