import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { deleteCookie, getCookie, setCookie } from "cookies-next";

// creating axios request instance

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

// this is for the token storage, would need to set the token in cookies
// export const AuthStorage = {
//   async setToken(token: string) {
//     setCookie("token", token);
//   },

//   async getToken() {
//     getCookie("token");
//   },

//   async clear(token: string) {
//     deleteCookie("token");
//   },
// };

// configuring the intercetpor for axios request
// intercepting token prior to sending the request
// then adding token in the header
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token"); // 토큰 미사용시 무시

    if (token) {
      // 토큰 사용시 헤더에 토큰 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log({
    //   headers: config.headers,
    //   method: config.method,
    //   url: config.url,
    //   baseUrl: config.baseURL,
    //   data: config.data,
    //   params: config.params,
    // });
    return config;
  },
  (error: AxiosError) => {
    console.log("API request error", error.config);
    return Promise.reject(error);
  }
);

// intercepts the response from the backend

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log({
    //   status: response.status,
    //   statusText: response.statusText,
    //   data: response.data,
    // });
    return response.data; // 서버에서 받는 데이터가 data 속성에 들어있는 경우
    // return response.data.data;	// 서버에서 받는 데이터가 data.data 속성에 들어있는 경우
  },
  async (error: AxiosError) => {
    console.warn(error.config?.url + " API response error", {
      response_data: error.response?.data,
      status: error.response?.status,
      request_info: {
        method: error.config?.method,
        url: error.config?.url,
        baseUrl: error.config?.baseURL,
        headers: error.config?.headers,
        params: error.config?.params,
        data: error.config?.data,
      },
    });
    const errorData: Shared.ErrorResponse = error.response
      ?.data as Shared.ErrorResponse;
    alert(`${errorData.error.code}: ${errorData.error.message}`);
    return Promise.reject(error);
  }
);
