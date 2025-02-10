import { httpApi } from "./http.api";

// GetAllCategories
const GetAllCategories = async () => {
  return await httpApi.get(`categories`);
};

// AddCategory
const AddCategory = async (name,token ) => {
  return await httpApi.post(`categories`,name , 
  { headers: {
    'Authorization': `Bearer ${token}`}
}
  );
};

// UpdateCategory
const UpdateCategory = async (id,name, token) => {
  return await httpApi.put(`categories/${id}`, name , 
  { headers: { Authorization: `Bearer ${token}`}}
  );
};

// DeleteCategory
const DeleteCategory = async (id) => {
  return await httpApi.delete(`categories/${id}`, 
  { headers: { Authorization: `Bearer ${token}`}}
  );
};
  

export { GetAllCategories, AddCategory, UpdateCategory, DeleteCategory };
