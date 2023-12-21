import { client } from "./index";

export const getCategories = async () => {
  const res = await client.get("/categories");
  return res;
};
