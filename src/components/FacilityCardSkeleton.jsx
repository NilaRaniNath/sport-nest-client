import React from "react";

export default function FacilityCardSkeleton() {
  return (
    <div className="bg-white/[0.01] backdrop-blur-md rounded-3xl p-5 border border-white/5 animate-pulse flex flex-col h-full">
      {/* ইমেজ এরিয়া স্কেলেটন */}
      <div className="w-full h-48 bg-white/5 rounded-2xl mb-4" />

      {/* ক্যাটাগরি ও রেটিং লাইনের স্কেলেটন */}
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-white/5 w-1/4 rounded-full" />
        <div className="h-4 bg-white/5 w-12 rounded-full" />
      </div>

      {/* টাইটেল স্কেলেটন */}
      <div className="h-6 bg-white/5 w-3/4 rounded-full mb-3" />

      {/* লোকেশন স্কেলেটন */}
      <div className="h-4 bg-white/5 w-1/2 rounded-full mb-6" />

      {/* বাটন ও প্রাইস এরিয়া স্কেলেটন */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="h-5 bg-white/5 w-20 rounded-full" />
        <div className="h-10 bg-white/5 w-28 rounded-xl" />
      </div>
    </div>
  );
}