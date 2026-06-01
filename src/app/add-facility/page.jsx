"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

export default function AddFacility() {
  const router = useRouter();
  const [ownerEmail, setOwnerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    faciliy_type: "",
    image: "", 
    location: "",
    price_per_hour: "",
    capacity: "",
    description: "",
  });
  
  const [selectedSlots, setSelectedSlots] = useState([]);

  const timeSlotsList = [
    "08:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM", "06:00 PM - 08:00 PM", "08:00 PM - 10:00 PM"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      if (session?.data?.user?.email) {
        setOwnerEmail(session.data.user.email);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ownerEmail) return alert("Please log in first!");
    if (selectedSlots.length === 0) return alert("Select at least one time slot.");

    setLoading(true);
    const finalFacilityData = {
      ...formData,
      price_per_hour: Number(formData.price_per_hour),
      capacity: Number(formData.capacity),
      available_slots: selectedSlots,
      ownerEmail: ownerEmail,
    };

    try {
        const {data:tokenData} = await authClient.token();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`, {
        method: "POST",
         headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(finalFacilityData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Facility published successfully!" });
        router.push("/manage-facilities"); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-[#0D1B2A]/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-black mb-6 text-white">Add New Facility</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Facility Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Club Football Turf" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Facility Type</label>
              <select name="type" required value={formData.facility_type} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                <option value="">Select Type</option>
                <option value="Football">Football Turf</option>
                <option value="Cricket">Cricket Net</option>
                <option value="Badminton">Badminton Court</option>
                <option value="Badminton">Basketball Court</option>
                <option value="Badminton">Tennis Court</option>
                <option value="Badminton">Swimming Pool</option>
                <option value="Badminton">Gymnasium</option>
              </select>
            </div>
          </div>

        
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Image URL Link</label>
            <input type="url" name="image" required value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/.../photo.jpg" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-teal-400 focus:border-teal-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Location</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Price Per Hour</label>
              <input type="number" name="price_per_hour" required value={formData.price_per_hour} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">Capacity</label>
              <input type="number" name="capacity" required value={formData.capacity} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Time Slots</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlotsList.map((slot) => (
                <button type="button" key={slot} onClick={() => handleSlotChange(slot)} className={`px-3 py-2 text-xs font-semibold rounded-xl border ${selectedSlots.includes(slot) ? "bg-teal-500/20 border-teal-400 text-teal-300" : "bg-slate-900/50 border-white/10 text-slate-400"}`}>{slot}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Description</label>
            <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold py-4 rounded-xl text-sm transition-all">{loading ? "Saving..." : "Publish Facility"}</button>
        </form>
      </div>
    </div>
  );
}