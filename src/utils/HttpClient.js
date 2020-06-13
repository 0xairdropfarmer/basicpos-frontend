import axios from "axios";
import join from "url-join";
import { server } from "../constants";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(process.env.REACT_APP_API_URL, config.url);
  }

  const userToken = localStorage.getItem(server.TOKEN_KEY);
  if (userToken) {
    config.headers = { "x-access-token": userToken };
  }
  config.timeout = 10000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // debugger;
    if (error.response.status == "401") {
      const refreshToken = localStorage.getItem(server.REFRESH_TOKEN_KEY);
      const refreshUrl = `${process.env.REACT_APP_API_URL}/${server.REFRESH_TOKEN_URL}`;
      let result = await axios.post(refreshUrl, { refreshToken });

      const token = result.data.jwt;
      localStorage.setItem(server.TOKEN_KEY, token);
      // debugger;
      return axios.request(error.config);
    } else if (error.response.status == "403") {
      // force logout
      localStorage.removeItem(server.TOKEN_KEY);
      localStorage.removeItem(server.REFRESH_TOKEN_KEY);
    }

    return Promise.reject(error);
  }
);

export const httpClient = axios;
