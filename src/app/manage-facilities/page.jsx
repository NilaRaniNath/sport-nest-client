"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Trash2, Edit2, X, Save, MapPin, Users, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function ManageFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    facility_type: "",
    image: "",
    location: "",
    price_per_hour: "",
    capacity: "",
    description: "",
    available_slots: []
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    facilityId: null,
    facilityName: ""
  });

  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: "",
    type: "success" 
  });

  const timeSlotsList = [
    "08:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM",
    "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM", "06:00 PM - 08:00 PM", "08:00 PM - 10:00 PM"
  ];

  const facilityTypesList = [
    "Football Turf", "Cricket Net", "Badminton Court", "Basketball Court",
    "Tennis Court", "Swimming Pool", "Gymnasium"
  ];

  const showAlert = (message, type = "success") => {
    setAlertConfig({ show: true, message, type });
    setTimeout(() => {
      setAlertConfig((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // 1. Fixed Dynamic Hook trigger sequence
  useEffect(() => {
    const fetchUserAndFacilities = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user?.email) {
          setUserEmail(session.data.user.email);
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owner-facilities/${encodeURIComponent(session.data.user.email)}`);
          if (res.ok) {
            const data = await res.json();
            setFacilities(data);
          }
        }
      } catch (err) {
        console.error("Error fetching facilities:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchUserAndFacilities();
  }, []);

  const triggerDeleteConfirm = (id, name) => {
    setDeleteModal({ isOpen: true, facilityId: id, facilityName: name });
  };

  const handleConfirmedDelete = async () => {
    const id = deleteModal.facilityId;
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || tokenData?.token; 

      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setFacilities(facilities.filter((f) => f._id !== id));
        showAlert("Facility deleted successfully!", "success");
      } else {
        showAlert("Failed to delete facility", "error");
      }
    } catch (err) {
      showAlert("An error occurred during deletion", "error");
    } finally {
      setDeleteModal({ isOpen: false, facilityId: null, facilityName: "" });
    }
  };

  const openEditModal = (facility) => {
    setSelectedFacilityId(facility._id);
    setEditForm({
      name: facility.name || "",
      facility_type: facility.facility_type || facility.type || "Football Turf",
      image: facility.image || facility.imageUrl || "",
      location: facility.location || "",
      price_per_hour: facility.price_per_hour || "",
      capacity: facility.capacity || "",
      description: facility.description || "",
      available_slots: facility.available_slots || facility.availableSlots || []
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (slot) => {
    const slots = editForm.available_slots;
    if (slots.includes(slot)) {
      setEditForm({ ...editForm, available_slots: slots.filter((s) => s !== slot) });
    } else {
      setEditForm({ ...editForm, available_slots: [...slots, slot] });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token || tokenData?.token;

     
      const payload = {
        ...editForm,
        price_per_hour: Number(editForm.price_per_hour),
        capacity: Number(editForm.capacity)
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities/${selectedFacilityId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFacilities(facilities.map((f) => 
          f._id === selectedFacilityId ? { 
            ...f, 
            ...payload 
          } : f
        ));
        setIsModalOpen(false);
        showAlert("Facility updated successfully!", "success"); 
      } else {
        showAlert("Failed to update facility", "error"); 
      }
    } catch (err) {
      showAlert("Error processing update form submission", "error");
    }
  };

  const getTypeBadgeStyles = (typeText) => {
    const lowerType = typeText?.toLowerCase() || "";
    if (lowerType.includes("foot")) return "bg-blue-500/10 border-blue-500/20 text-blue-400";
    if (lowerType.includes("cric")) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    if (lowerType.includes("badm")) return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    if (lowerType.includes("bask")) return "bg-orange-500/10 border-orange-500/20 text-orange-400";
    if (lowerType.includes("tenn")) return "bg-purple-500/10 border-purple-500/20 text-purple-400";
    if (lowerType.includes("swim")) return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
    if (lowerType.includes("gym")) return "bg-rose-500/10 border-rose-500/20 text-rose-400";
    return "bg-teal-500/10 border-teal-500/20 text-teal-400";
  };

  if (loading) return <div className="text-center py-20 text-teal-400 font-medium">Loading data...</div>;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-6 md:py-12 px-4 sm:px-6 relative">
      
      {alertConfig.show && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all animate-in slide-in-from-top-4 duration-300 ${
          alertConfig.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {alertConfig.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span className="text-xs sm:text-sm font-bold tracking-wide">{alertConfig.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-teal-400 rounded-full"></span>
          Manage Your Facilities
        </h1>

      
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {facilities.map((facility) => {
            const currentType = facility.facility_type || facility.type || "Sport";
            return (
              <div key={facility._id} className="bg-[#0D1B2A]/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-lg space-y-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-16 overflow-hidden rounded-xl bg-slate-950 shrink-0">
                    <Image src={facility.image || facility.imageUrl || "/placeholder.jpg"} alt={facility.name} 
                    height={40} width={60} className="object-cover" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-bold text-white text-base truncate">{facility.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${getTypeBadgeStyles(currentType)}`}>
                      {currentType}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate">{facility.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end text-emerald-400 font-bold">
                    <span>৳{facility.price_per_hour}/hr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users size={14} className="text-slate-500 shrink-0" />
                    <span>{facility.capacity} Persons</span>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(facility)} className="p-2 bg-teal-500/10 text-teal-400 rounded-xl hover:bg-teal-500/20 transition-colors" title="Edit"><Edit2 size={14} /></button>
                    <button onClick={() => triggerDeleteConfirm(facility._id, facility.name)} className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
        <div className="hidden md:block bg-[#0D1B2A]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-white/5">
                  <th className="p-4">Image</th>
                  <th className="p-4">Facility Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Price/hr</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {facilities.map((facility) => {
                  const currentType = facility.facility_type || facility.type || "Sport";
                  return (
                    <tr key={facility._id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4">
                        <div className="relative w-16 h-10 overflow-hidden rounded-lg bg-slate-950">
                          <Image src={facility.image || facility.imageUrl || "/placeholder.jpg"} alt="" width={64} height={40} className="object-cover w-full h-full" />
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-white">{facility.name}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase border shadow-sm ${getTypeBadgeStyles(currentType)}`}>
                          {currentType}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 max-w-[150px] truncate">{facility.location}</td>
                      <td className="p-4 font-bold text-emerald-400">৳{facility.price_per_hour}</td>
                      <td className="p-4 text-slate-300">{facility.capacity} Persons</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(facility)} className="p-2 bg-teal-500/10 text-teal-400 rounded-xl hover:bg-teal-500/20 transition-colors" title="Edit Facility"><Edit2 size={15} /></button>
                          <button onClick={() => triggerDeleteConfirm(facility._id, facility.name)} className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors" title="Delete Facility"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {facilities.length === 0 && <p className="text-center text-slate-500 py-12 text-sm">No sports facilities registered under your email.</p>}
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl my-auto max-h-[95vh] flex flex-col">
            
            <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4 shrink-0">
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"></span>
                Update Details
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 sm:space-y-5 overflow-y-auto pr-1 flex-1 custom-scrollbar text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Facility Name</label>
                  <input type="text" name="name" required value={editForm.name} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-teal-500/50" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Facility Type</label>
                  <select name="facility_type" required value={editForm.facility_type} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-teal-500/50">
                    {facilityTypesList.map((type) => (
                      <option key={type} value={type} className="bg-[#0F172A] text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Image URL</label>
                <input type="url" name="image" required value={editForm.image} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-teal-400 focus:outline-none focus:border-teal-500/50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Location</label>
                  <input type="text" name="location" required value={editForm.location} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-teal-500/50" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Price Per Hour (৳)</label>
                  <input type="number" name="price_per_hour" required value={editForm.price_per_hour} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-teal-500/50" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Capacity</label>
                  <input type="number" name="capacity" required value={editForm.capacity} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-teal-500/50" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Available Time Slots</label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlotsList.map((slot) => {
                    const isSelected = editForm.available_slots.includes(slot);
                    return (
                      <button type="button" key={slot} onClick={() => handleSlotChange(slot)} className={`px-2 py-2 text-[10px] sm:text-[11px] font-semibold rounded-xl border transition-all ${isSelected ? "bg-teal-500/20 border-teal-400 text-teal-300" : "bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10"}`}>{slot}</button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea name="description" required rows="2" value={editForm.description} onChange={handleInputChange} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white resize-none focus:outline-none focus:border-teal-500/50"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-400 hover:bg-white/[0.02] transition-colors">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs shadow-lg shadow-teal-500/10 hover:opacity-95 transition-all active:scale-95">
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#1E293B] border border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">Confirm Deletion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to delete <span className="text-red-400 font-bold">{deleteModal.facilityName}</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setDeleteModal({ isOpen: false, facilityId: null, facilityName: "" })} 
                className="w-full py-2.5 rounded-xl border border-white/5 bg-slate-900 text-xs font-bold text-slate-400 hover:bg-slate-800 transition-colors"
              >
                No, Keep it
              </button>
              <button 
                type="button" 
                onClick={handleConfirmedDelete} 
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-black shadow-lg shadow-red-500/10 hover:opacity-95 transition-opacity active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}