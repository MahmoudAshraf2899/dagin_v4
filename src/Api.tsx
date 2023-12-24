import axios from "axios";
const token = localStorage.getItem("token");

const productionUrl = "https://nestjs-api.dajin-platform.com/";
const testUrl = "https://dajintest.environ-adapt.tk/";

const API = axios.create({
  baseURL: testUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": testUrl,
  },
});
export const APISUBMIT = axios.create({
  baseURL: testUrl,
  timeout: 5000,
  headers: {
    // 'Content-Type': '*/*',
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": testUrl,
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized Request!");
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error.response.data || error);
  }
);

export default API;
