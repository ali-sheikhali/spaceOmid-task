import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post(
    "https://reqres.in/api/login",
    {
      email,
      password,
    },
    {
      headers: { "x-api-key": "reqres-free-v1" },
    }
  );
  return response.data;
};
