import { httpApi } from "./http.api";


const Updateprofile = async (id, userData) => {
  try {
    console.log("API Request - User ID:", id);
    console.log("API Request - User Data:", userData);

    const response = await httpApi.put(`users/${id}`, userData);

    console.log("API Response:", response);
    
    return response;
  } catch (error) {
    console.error("Error in Updateprofile API call:", error);

    throw error;
  }
};

export { Updateprofile };
