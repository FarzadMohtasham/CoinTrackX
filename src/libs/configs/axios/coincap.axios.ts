import axios from "axios";

export const coincapAxiosInstance = axios.create({
   baseURL: 'https://api.coincap.io/v2',
   timeout: 10000,
   headers: {
      Accept: 'application/json',
   },
});