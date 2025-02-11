import { httpApi } from "./http.api";

// GetAllCategories
const GetAllCategories = async () => {
  return await httpApi.get(`categories`);
};

// AddCategory
const AddCategory = async (name) => {
  return await httpApi.post(`categories`, name);
};

// UpdateCategory
const UpdateCategory = async (id, name) => {
  return await httpApi.put(`categories/${id}`, name);
};

// DeleteCategory
const DeleteCategory = async (id) => {
  return await httpApi.delete(`categories/${id}`);
};

export { GetAllCategories, AddCategory, UpdateCategory, DeleteCategory };
