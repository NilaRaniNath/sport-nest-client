"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, DollarSign, Trash2, Edit2, X } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function BookingCard({ booking }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const bookingId = booking._id; 

  
  const [editDate, setEditDate] = useState(booking.bookingDate || "");
  const [editSlot, setEditSlot] = useState(booking.timeSlot || "10:00 AM - 12:00 PM");
  const [editHours, setEditHours] = useState(booking.hours || 1);

  
  useEffect(() => {
    if (booking) {
      setEditDate(booking.bookingDate || "");
      setEditSlot(booking.timeSlot || "10:00 AM - 12:00 PM");
      setEditHours(booking.hours || 1);
    }
  }, [booking]);

  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setLoading(true);

    try {

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;
      // console.log(token)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          
          "Authorization": token ? `Bearer ${token}` : "",
        }
      });

      if (res.ok) {
        router.refresh();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

   
    const originalHours = booking.hours || 1;
    const originalTotalPrice = booking.totalPrice || 0;
    const pricePerHour = originalTotalPrice / originalHours;
    const updatedTotalPrice = pricePerHour * Number(editHours);

    try {

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || tokenData;
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
         },
        body: JSON.stringify({
          bookingDate: editDate,
          timeSlot: editSlot,
          hours: Number(editHours),
          totalPrice: updatedTotalPrice,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to update booking.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      {!isEditing ? (
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
           
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
              <Image 
                src={booking.facilityImage || "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200&auto=format&fit=crop"} 
                alt={booking.facilityName || "Facility Image"}
                width={80}   
                height={80}  
                priority={false}
                className="w-full h-full object-cover"
              />
            </div>

            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">{booking.facilityName}</h3>
                
       
                {booking.status === "confirmed" ? (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">
                    Confirmed
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                    Pending
                  </span>
                )}
              </div>

              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{booking.location || "Dhanmondi, Dhaka"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{booking.bookingDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-slate-400" />
                  <span>{booking.timeSlot} ({booking.hours}h)</span>
                </div>
                <div className="flex items-center gap-0.5 font-bold text-slate-800">
                  <DollarSign size={14} className="text-slate-600 -mr-0.5" />
                  <span>৳{booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t border-slate-50 sm:border-t-0 pt-3 sm:pt-0">
            {booking.status !== "confirmed" && (
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors disabled:opacity-50"
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} />
              <span>{loading ? "Cancelling..." : "Cancel"}</span>
            </button>
          </div>

        </div>
      ) : (
        /* 📝 ইনলাইন আপডেট ফর্ম মোড */
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1">
              <Edit2 size={12} /> Update Schedule
            </h4>
            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Booking Date</label>
              <input
                type="date"
                required
                value={editDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Time Slot</label>
              <select
                required
                value={editSlot}
                onChange={(e) => setEditSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              >
                <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                <option value="08:00 PM - 10:00 PM">08:00 PM - 10:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Hours (Max 5)</label>
              <input
                type="number"
                required
                min="1"
                max="5"
                value={editHours}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 5) setEditHours(5);
                  else if (val < 1) setEditHours(1);
                  else setEditHours(val);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}