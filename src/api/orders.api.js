import { httpApi } from "./http.api";

// GetAllorders
const GetAllorders = async () => {
  return await httpApi.get(`orders`);
};
// Updateorder
const Updateorder = async (id, Updateorder) => {
    return await httpApi.put(`orders/${id}`, updateorder);
  };
export { GetAllorders , Updateorder };
