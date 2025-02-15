import { httpApi } from "./http.api";

// GetAllorders
const GetAllorders = async () => {
  return await httpApi.get(`orders`);
};

// UpdateOrderPrice
const UpdateOrderPrice = async (id, newPrice) => {
  return await httpApi.put(`orders/${id}/approve`, newPrice );
};

// UpdateOrderStatus
const UpdateOrderStatus = async (id, newStatus) => {
  return await httpApi.put(`orders/${id}`, newStatus );
};

export { GetAllorders, UpdateOrderPrice, UpdateOrderStatus };
