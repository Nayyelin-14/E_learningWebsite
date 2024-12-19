import { axiosInstance } from "../apicalls/axiosInstance";

//register new acc and send data to server
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/auth/register", payload);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginUser = async (payload) => {
  console.log(payload);

  try {
    const response = await axiosInstance.post("/auth/login", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const VerifyEmail = async (token) => {
  console.log(token);

  try {
    const response = await axiosInstance.post(
      `/auth/account_verification/${token}`
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};