import axios from "axios";

const QuotesClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 65000,
});
const myFetch = async (link: string, option: string, obj?: {}) => {
  const baseObj = {
    url: link,
    method: option,
    headers: {
      Accept: "application/json",
    },
  };
  const res = await QuotesClient(
    option === "GET" ? baseObj : { ...baseObj, ...{ data: obj } }
  );
  return res.data;
};
const myAction = async (method: string, link: string, data?: any) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0MTE4OTE2YzE1ZDEzNTYyYjdlYzQiLCJpYXQiOjE3MDEzMzI1ODcsImV4cCI6MTcwMTM0MTIyN30.Jvcy1HnQxqzyoXXHjB81xsxMS7YUuYIIOYJ6rHU9Jo0";
  const baseObj = {
    url: link,
    method: method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios(
    method === "GET" ? baseObj : { ...baseObj, ...{ data: data } }
  );
  return res.data;
};
export { myFetch, myAction };
