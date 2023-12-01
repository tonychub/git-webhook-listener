import axios, { AxiosRequestConfig } from "axios";

const myAction = async (data: AxiosRequestConfig) => {
  const res = await axios(data);
  return res.data;
};
export { myAction };
