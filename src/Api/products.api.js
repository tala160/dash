import { httpApi } from "./http.api";

const GetAllProducts = async () => {
  return await httpApi.get(`products`);
};

export { GetAllProducts };
