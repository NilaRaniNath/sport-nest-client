"use client";
import Link from "next/link";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="relative min-h-[90vh] lg:h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0B1528] to-slate-900">
      
     
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

   
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-0">
        
    
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 inline-block animate-pulse">
            Your Ultimate Sports Hub
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Book Your Perfect <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
              Sports Facility Instantly
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg font-light tracking-wide leading-relaxed max-w-lg">
            Discover and reserve premium turf, courts, and stadiums around you. Elevate your game with SportNest seamless booking system.
          </p>

          <div className="pt-2">
            <Link 
              href="/facilities" 
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl hover:opacity-90 shadow-lg shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all duration-200 group"
            >
              Explore Facilities
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

     
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[450px] sm:h-[500px] w-full items-center">
          
         
          <div className="col-span-7 h-full relative rounded-2xl overflow-hidden group border border-white/5 shadow-2xl">
            <Image 
              src="/sportImage1.jpg" 
              alt="Football Turf"
              fill
              priority
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 33vw"
              className="object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
          </div>

         
          <div className="col-span-5 flex flex-col gap-4 h-full justify-between">
            
           
            <div className="h-[48%] relative rounded-2xl overflow-hidden group border border-white/5 shadow-xl">
              <Image 
                src="/sportImage2.jpg" 
                alt="Badminton Court"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

          
            <div className="h-[48%] relative rounded-2xl overflow-hidden group border border-white/5 shadow-xl">
              <Image 
                src="/sportImage3.jpg" 
                alt="Indoor Cricket"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroBanner;