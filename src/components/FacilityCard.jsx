'use client'; 
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const FacilityCard = ({ facility }) => {
  const { _id, name, image, facility_type, location, price_per_hour, description } = facility;
  const router = useRouter();

  const handleBookNow = () => {
    // সরাসরি ডাইনামিক আইডি অনুযায়ী ডিটেইলস পেজে নিয়ে যাবে
    router.push(`/facilities/${_id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
          {facility_type}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {name}
        </h3>
        
        {/* Location */}
        <p className="text-gray-500 text-sm flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="line-clamp-1">{location}</span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-2 grow">
          {description}
        </p>

        {/* Price and Book Now Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-extrabold text-blue-600">৳{price_per_hour}</span>
            <span className="text-gray-400 text-xs"> / hour</span>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;