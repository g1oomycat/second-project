import { client } from "./index";

export const login = async (email, password) => {
  const res = await client.post("/login", { email: email, password: password });
  return res;
};
export const registerDB = async (user) => {
  const res = await client.post("/users", user);
  return res;
};

export const changeDataUser = async (
  id,
  first_name,
  last_name,
  phone_number,
  email,
  password
) => {
  const res = await client.patch("/users/" + id, {
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    email: email,
    password: password,
  });
  return res;
};

export const changeDataFromBasket = async (
  id,
  firstName,
  phoneNumber,
  email,
  adres,
  bonus
) => {
  const res = await client.patch("/users/" + id, {
    first_name: firstName,
    phone_number: phoneNumber,
    email: email,
    user_adress: adres,
    user_balance: bonus,
  });
  return res;
};
