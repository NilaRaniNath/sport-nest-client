import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import BookingCard from '@/components/BookingCard';
import Link from 'next/link';

const MyBookingPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    
  
    // console.log("Logged In User:", user);
  
    
    if (!user?.email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-sm">
                    <p className="text-slate-600 font-medium mb-4">Please log in to view your bookings.</p>
                    <Link href="/signin" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all">
                        Sign In Now
                    </Link>
                </div>
            </div>
        );
    }
 
    let data = [];
    try {
        const {token} = await auth.api.getToken({
            headers:await headers(),
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/${user.email}`,{
                headers: {
                    authorization: `Bearer ${token}`
                }
        } ,{
            cache: "no-store",
        });
        
        console.log("Fetch Response Status:", res.status);
        
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Failed to load bookings:", error);
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                        My Bookings
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        View and manage all your facility bookings
                    </p>
                </div>

               
                {!data || data.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
                        <p className="text-slate-500 font-medium text-base mb-4">You have not booked any facilities yet.</p>
                        <Link href="/facilities" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all">
                            Explore Facilities
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.map((booking) => {
                            const serializedBooking = JSON.parse(JSON.stringify(booking));
                            const keyId = booking._id;
                            
                            return (
                                <BookingCard 
                                    key={keyId} 
                                    booking={serializedBooking} 
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;