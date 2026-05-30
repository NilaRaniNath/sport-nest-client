"use client";
import React from "react";

export default function TipsSection() {
  // স্ট্যাটিক টিপস ডাটা
  const tips = [
    {
      id: 1,
      category: "Fitness",
      title: "5 Essential Warm-Up Exercises Before Hitting the Court",
      description: "Prevent injuries and boost your performance with these quick dynamic stretches tailored for athletes.",
      duration: "5 min read",
      author: "Coach Rahman",
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20", 
    },
    {
      id: 2,
      category: "Football",
      title: "Mastering the Perfect Stamina: Midfielder Edition",
      description: "Discover the secrets of professional midfielders to maintain high-intensity running for a full 90-minute match.",
      duration: "8 min read",
      author: "Asif Zaman",
      iconColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      id: 3,
      category: "Cricket",
      title: "Line and Length: The Ultimate Bowling Guide",
      description: "Learn how to consistently hit the corridor of uncertainty and trouble the batsmen with subtle variations.",
      duration: "6 min read",
      author: "Kapil Dev",
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
     {
      id: 4,
      category: "Nutrition",
      title: "Pre-Game Meal Ideas: Fueling for Success",
      description: "Optimize your energy levels with balanced meals before your big match. Learn what to eat and when.",
      duration: "7 min read",
      author: "Dietitian Meem",
      iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1528] via-slate-950 to-slate-950 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (ডিজাইনকে ডায়নামিক করার জন্য) */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 📢 সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-extrabold text-xs uppercase tracking-widest block mb-2">
              Get Better Every Day
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Expert Sports & <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">Fitness Tips</span>
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl text-sm sm:text-base font-light leading-relaxed">
              Boost your game, maintain peak fitness, and learn exclusive strategies directly from verified coaches.
            </p>
          </div>
          
          {/* View All Button */}
          <button className="mt-6 md:mt-0 inline-flex items-center gap-2 text-teal-400 font-semibold hover:text-teal-300 transition-colors text-sm group border border-teal-500/20 bg-teal-500/5 px-5 py-2.5 rounded-xl hover:bg-teal-500/10">
            See All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 🎴 টিপস কার্ড গ্রিড (৪ কলাম) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <article 
              key={tip.id} 
              className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 border border-white/[0.05] hover:border-white/[0.12] shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col group relative hover:-translate-y-1"
            >
              {/* ক্যাটাগরি ব্যাজ ও আইকন */}
              <div className="flex items-center justify-between mb-5">
                <div className={`h-10 w-10 rounded-2xl border flex items-center justify-center ${tip.iconColor}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0114 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="bg-white/5 text-slate-300 border border-white/5 font-semibold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                  {tip.category}
                </span>
              </div>

              {/* কন্টেন্ট এরিয়া */}
              <div className="flex flex-col grow">
                {/* টাইটেল */}
                <h3 className="text-base font-bold text-slate-100 leading-snug group-hover:text-teal-400 transition-colors mb-2 line-clamp-2">
                  {tip.title}
                </h3>

                {/* ডেসক্রিপশন */}
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                  {tip.description}
                </p>

                {/* ডিউরেশন, লেখক ও Read More লিঙ্ক */}
                <div className="mt-auto pt-4 border-t border-white/[0.05] space-y-4">
                  {/* ডিউরেশন ও লেখক */}
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tip.duration}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">By {tip.author}</span>
                  </div>

                  {/* Read More লিঙ্ক */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                      Read Full Guide
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-white/5 group-hover:bg-linear-to-r group-hover:from-teal-400 group-hover:to-emerald-400 flex items-center justify-center text-slate-400 group-hover:text-slate-950 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}