
import { httpApi } from "./http.api";


const Updateprofile = async (id, userData, token) => {
  return await httpApi.put(`users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {Updateprofile}  ;