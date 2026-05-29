
import React from 'react';

import FacilityCard from './FacilityCard'; 

const FeaturedFacilities = async () => {
 

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Featured
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Top Sports Facilities
          </h2>
        </div>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFacilities?.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedFacilities;