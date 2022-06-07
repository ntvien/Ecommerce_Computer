import axios from "axios";
import storageKeys from "../util/enum/storageKeys";
import env from "../util/env";
import { getCookie } from "../util/getCookie";
const API = axios.create({
  baseURL: env.HOST,
  paramsSerializer: (params) => require("qs").stringify(params),
});
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(storageKeys.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    console.log(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default API;
