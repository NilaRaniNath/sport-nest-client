import React from 'react';
import FacilityCard from './FacilityCard'; 
import { getFeaturedFacilities } from '@/lib/facilities/data';


const FeaturedFacilities = async () => {
  const featuredFacilities = await getFeaturedFacilities();
  
  // const featuredFacilities = allFacilities?.slice(0, 6) || [];

  return (
  
    <section className="bg-[#0B1528] py-20 relative overflow-hidden border-b border-white/5">
      
     
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
      
        <div className="text-center mb-16">
          <span className="text-teal-400 text-xs font-black uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full shadow-sm">
            Featured Facilities
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight">
            Our Top <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Sports Facilities</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Book Sylhets premium indoor & outdoor turfs and courts at your preferred time.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedFacilities;