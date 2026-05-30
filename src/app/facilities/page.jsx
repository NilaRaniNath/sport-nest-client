import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/facilities/data";
import React from "react";




export default async function FacilitiesPage() {
  
  const facilities = await getFacilities();
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1528] via-slate-950 to-slate-950 text-white py-16 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-extrabold text-xs uppercase tracking-widest block mb-2">
            Discover & Book
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            All Available <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">Facilities</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Explore premium turfs, badminton courts, cricket nets, and meeting spaces in Sylhet. Find the perfect spot for your next game or event.
          </p>
        </div>

        {facilities.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-3xl max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-slate-400 font-medium">No facilities found at the moment.</p>
            <p className="text-slate-600 text-xs mt-1">Please check your backend connection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities?.map((facility) => (
              <FacilityCard 
                key={facility._id} 
                facility={facility} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}