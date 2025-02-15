import { httpApi } from "./http.api";

// GetAllProducts
const GetAllProducts = async () => {
  return await httpApi.get(`products`);
};

// AddNewProduct
const AddNewProduct = async (formData) => {
  return await httpApi.post(`products`, formData , 
  //  headers= { 'Content-Type': 'multipart/form-data' }
  
  );
};

// UpdateProduct
const UpdateProduct = async (id, updatedProduct) => {
  return await httpApi.put(`products/${id}`, updatedProduct);
};

// DeleteProduct
const DeleteProduct = async (id) => {
  return await httpApi.delete(`products/${id}`);
};

export { GetAllProducts, AddNewProduct, UpdateProduct, DeleteProduct };
