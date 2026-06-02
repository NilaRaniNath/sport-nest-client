export const getFacilities = async (search = "", sportType = "") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/facilities?search=${search}&sportType=${sportType}`, 
      {
        cache: "no-store",
      }
    );
    console.log(res)
    // if (!res.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    const data = await res.json(); 
    console.log(data)
    return data || [];

  } catch (error) {
    console.error("Error fetching facilities:", error);
    return []; 
  }
};

export const getFeaturedFacilities = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);

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



export const getSingleFacility = async (id,token) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities/${id}`,{
      headers:{
        authorization:`Bearer ${token}` || ""
      }
    }, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching facility:", error);
    return null;
  }
};


