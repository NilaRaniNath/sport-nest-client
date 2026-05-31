"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({ facility }) {
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  

  const [hours, setHours] = useState("");
  
 
  const totalPrice = facility?.price_per_hour || 0;
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!hours || Number(hours) < 1 || Number(hours) > 5) {
      setMessage({ type: "error", text: "Please enter hours between 1 and 5." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const bookingData = {
      facilityId: facility?._id || facility?.id || "", 
      facilityName: facility?.name || "",
      bookingDate,
      timeSlot,
      hours: Number(hours),
      totalPrice,
      status: "pending", 
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Booking requested successfully! Waiting for confirmation." });
        setBookingDate("");
        setTimeSlot("");
        setHours(""); 
        
        setTimeout(() => {
          router.push("/my-bookings");
        }, 2500);
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message || "Something went wrong!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to connect to the server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0D1B2A]/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24">
      <h2 className="text-xl font-black tracking-wide text-white mb-6 flex items-center space-x-2">
        <span className="w-2 h-5 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full inline-block"></span>
        <span>Book This Facility</span>
      </h2>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-medium mb-6 ${
          message.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
      
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Facility Name</label>
          <input
            type="text"
            value={facility?.name || ""}
            readOnly
            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none cursor-not-allowed font-medium"
          />
        </div>

       
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Booking Date</label>
          <input
            type="date"
            required
            value={bookingDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors dynamic-theme-input"
          />
        </div>

     
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Time Slot</label>
          <select
            required
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled hidden>Select a time slot</option>
            <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
            <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
            <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
            <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
            <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
            <option value="08:00 PM - 10:00 PM">08:00 PM - 10:00 PM</option>
          </select>
        </div>

        {/* Hours Field (Max 5 Hours) */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hours (Max 5)</label>
          <input
            type="number"
            required 
            min="1"
            max="5" 
            placeholder="Enter hours (1 to 5)" 
            value={hours}
            onChange={(e) => {
              const val = e.target.value;
             
              if (Number(val) > 5) {
                setHours(5);
              } else {
                setHours(val);
              }
            }} 
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>

   
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex justify-between items-center mt-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Price</span>
          <span className="text-2xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            ৳{totalPrice}
          </span>
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-150 active:scale-[0.98] shadow-lg shadow-teal-500/10 hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
        >
          {loading ? "Processing..." : "Confirm Book"}
        </button>
      </form>
    </div>
  );
}