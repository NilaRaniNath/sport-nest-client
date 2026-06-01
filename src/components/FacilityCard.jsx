'use client'; 
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';


const FacilityCard = ({ facility }) => {
 
  const { _id, name, image, facility_type, location, price_per_hour, description } = facility;
  const router = useRouter();

  const handleBookNow = async () => {
   
    const { data: session } = await authClient.getSession(); 
    
    if (session) {
      router.push(`/facilities/${_id}`);
    } else {
      router.push('/signin');
    }
 
  };

  return (
   
    <div className="bg-[#0D1B2A]/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-teal-500/30 shadow-xl hover:shadow-teal-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <Image 
          src={image || "/placeholder.jpg"} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          priority
        />
     
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent opacity-60" />
        
        <span className="absolute top-3 right-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
          {facility_type}
        </span>
      </div>

      <div className="p-5 flex flex-col grow">
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-teal-400 transition-colors duration-200">
          {name}
        </h3>
        
        <p className="text-slate-400 text-xs flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="line-clamp-1">{location}</span>
        </p>

        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 grow">
          {description}
        </p>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              ৳{price_per_hour}
            </span>
            <span className="text-slate-500 text-xs"> / hour</span>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-bold text-white rounded-xl group bg-gradient-to-br from-teal-400 to-emerald-500 group-hover:from-teal-400 group-hover:to-emerald-500 hover:text-slate-950 focus:ring-2 focus:outline-none focus:ring-teal-800 transition-all active:scale-95 shadow-lg shadow-teal-500/10"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-[10px] group-hover:bg-opacity-0 font-bold tracking-wide">
              Book Now
            </span>
          </button>
        </div>

      </div>
    </div>);

};

export default FacilityCard;