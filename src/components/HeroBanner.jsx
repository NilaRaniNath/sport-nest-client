"use client";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";


const MotionLink = motion.create ? motion.create(Link) : motion(Link);

const HeroBanner = () => {

  const slides = [
    { src: "/sportImage1.jpg", alt: "Handball Turf" },
    { src: "/sportImage2.jpg", alt: "Volleyball Court" },
    { src: "/sportImage3.jpg", alt: "Indoor Cricket" },
    { src: "/sportImage4.jpg", alt: "Badminton Court" },
    { src: "/sportImage5.jpg", alt: "Tennis" },
    { src: "/sportImage6.jpg", alt: "Football Court" },
  ];

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-[90vh] lg:h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0B1528] to-slate-900">
      
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 lg:py-0">
        
    
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 space-y-6 text-left"
        >
         
          <motion.div variants={itemVariants}>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 inline-block animate-pulse">
              Your Ultimate Sports Hub
            </span>
          </motion.div>
          
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            Book Your Perfect <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
              Sports Facility Instantly
            </span>
          </motion.h1>
          
         
          <motion.p 
            variants={itemVariants}
            className="text-slate-300 text-base sm:text-lg font-light tracking-wide leading-relaxed max-w-lg"
          >
            Discover and reserve premium turf, courts, and stadiums around you. Elevate your game with SportNest seamless booking system.
          </motion.p>

          
          <motion.div variants={itemVariants} className="pt-2">
            <MotionLink 
              href="/facilities" 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 group cursor-pointer"
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
            </MotionLink>
          </motion.div>
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-7 w-full h-[350px] sm:h-[450px] lg:h-[500px] relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
        >
          <Swiper
            spaceBetween={0}
            effect={"fade"} 
            centeredSlides={true}
            autoplay={{
              delay: 2000, 
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, EffectFade, Pagination]}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="relative w-full h-full">
                <Image 
                  src={slide.src} 
                  alt={slide.alt}
                  fill
                  priority={index === 0} 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                
                <span className="absolute bottom-6 left-6 bg-slate-950/60 backdrop-blur-md text-teal-400 text-xs font-semibold px-4 py-2 rounded-xl border border-white/10">
                  {slide.alt}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroBanner;