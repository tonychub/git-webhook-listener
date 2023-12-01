import axios, { AxiosRequestConfig } from "axios";

const myResponse = async (data: AxiosRequestConfig) => {
  const res = await axios(data);
  return res.data;
};
export { myResponse };
