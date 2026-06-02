import React from "react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Inline optimization: Token tracking matrix logic handle korar jonno ekahnei fetch logic nilam
async function getFacilityDetails(id, token) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/facilities/${id}`;
    
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token || ""}`,
        "Content-Type": "application/json"
      },
      cache: "no-store", // SSR data re-fetching guarantee configuration
    });

    if (!res.ok) {
      console.error(`[Fetch System] Server responded with code matrix status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("[Fetch System] Critical connection crash logging error:", error.message);
    return null;
  }
}

export default async function FacilityDetailsPage({ params }) {
  // params runtime extraction layer check
  const solveId = await params;
  const facilityId = solveId.id;
  
  let token = null;
  let facility = null;

  try {
    // Better Auth API reference extraction validation engine context
    const sessionContext = await auth.api.getToken({
      headers: await headers(),
    });
    
    token = sessionContext?.token || null;
    console.log("-----------------------------------------");
    console.log("Extracted Token Key String Vector:", token ? `${token.substring(0, 15)}...` : "TOKEN_NULL_EMPTY");
    console.log("-----------------------------------------");
  } catch (authError) {
    console.error("Better Auth matrix key handshake execution crashed:", authError.message);
  }

  // Final validation target routing call
  if (facilityId) {
    facility = await getFacilityDetails(facilityId, token);
  }

  // Data missing state layout error boundary handler
  if (!facility) {
    return (
      <div className="min-h-screen bg-[#0B1528] flex flex-col items-center justify-center text-white space-y-4">
        <p className="text-xl font-semibold text-slate-400">Facility metadata load failed!</p>
        <p className="text-xs text-slate-500 bg-red-950/40 px-4 py-2 border border-red-500/20 rounded-md">
          Status: 403 Forbidden or Invalid Facility MongoDB Object ID
        </p>
        <Link href="/facilities" className="text-xs font-bold text-teal-400 hover:underline">
          &larr; Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1528] via-slate-950 to-slate-950 text-white py-12 sm:py-20 relative overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Link */}
        <Link 
          href="/facilities" 
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-teal-400 mb-8 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Facilities</span>
        </Link>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Pane */}
          <div className="lg:col-span-7 bg-[#0D1B2A]/30 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-64 sm:h-96 w-full">
              <Image 
                src={facility.image || "/placeholder.jpg"} 
                alt={facility.name} 
                fill 
                className="object-cover"
                priority
              />
              <span className="absolute top-4 right-4 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {facility.facility_type}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-4">
                {facility.name}
              </h1>
              
              <div className="flex items-center text-slate-400 text-sm mb-6 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{facility.location}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-200 mb-2">Description</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {facility.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-center">
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <span className="text-xs text-slate-500 block mb-1">Price / Hour</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">৳{facility.price_per_hour}</span>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <span className="text-xs text-slate-500 block mb-1">Max Capacity</span>
                  <span className="text-2xl font-black text-white">{facility.capacity || "N/A"} Persons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Processing Sidebar Panel */}
          <div className="lg:col-span-5 sticky top-24">
            <BookingForm key={facility._id} facility={facility} />
          </div>

        </div>
      </div>
    </div>
  );
}