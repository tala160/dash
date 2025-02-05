import { httpApi } from "./http.api";

// GetAllCategories
const GetAllCategories = async () => {
  return await httpApi.get(`products/categories`);
};

// AddCategory
const AddCategory = async (category) => {
  return await httpApi.post(`products/categories`, { name: category });
};

// UpdateCategory
const UpdateCategory = async (id, category) => {
  return await httpApi.put(`products/categories/${id}`, { name: category });
};

// DeleteCategory
const DeleteCategory = async (id) => {
  return await httpApi.delete(`products/categories/${id}`);
};

export { GetAllCategories, AddCategory, UpdateCategory, DeleteCategory };
