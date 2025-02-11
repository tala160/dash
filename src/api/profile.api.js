import { httpApi } from "./http.api";

const Updateprofile = async (id, userData) => {
  return await httpApi.put(`users/${id}`, userData);
};

export { Updateprofile };
