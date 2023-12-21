import axios, { AxiosRequestConfig } from "axios";
import { config } from "dotenv";
config();

const baseUrl = process.env.API_URL || "http://116.118.50.224:9999";
const token = process.env.ACCESS_TOKEN_WEBHOOK;
const header = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};
const myResponse = async (data: AxiosRequestConfig) => {
  const res = await axios(data);
  return res.data;
};
const getScriptById = (id: string) => {
  const data = {
    method: "GET",
    url: `${baseUrl}/scripts/${id}`,
    headers: header,
  };
  return myResponse(data);
};
const runScriptById = (id: string) => {
  const data = {
    method: "POST",
    url: `${baseUrl}/scripts/${id}/run-webhook`,
    headers: header,
  };
  return myResponse(data);
};
const getWebhookActionById = (id: string) => {
  const data = {
    method: "GET",
    url: `${baseUrl}/webhook-actions/${id}`,
    headers: header,
  };
  return myResponse(data);
};
export { myResponse, getScriptById, runScriptById, getWebhookActionById };
