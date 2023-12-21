import { client } from "./index";

export const getProducts = async (id_category) => {
  const res = await client.get(`/products?id_category=${id_category}`);
  return res;
};
export const getProductsByID = async (id) => {
  const res = await client.get(`/products?id=${id}`);
  return res;
};
export const postProduct = async (product) => {
  const res = await client.post("/products", product);
  return res;
};
export const postFotoProducts = async (fotoProduct) => {
  const res = await client.post("/file", fotoProduct);
  return res;
};
