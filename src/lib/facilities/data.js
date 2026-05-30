export const getFacilities = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    
    const data = await res.json(); 
    return data || [];

  } catch (error) {
    console.error("Error fetching facilities:", error);
    return []; 
  }
};