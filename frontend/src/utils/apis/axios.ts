// frontend/src/utils/apis/axios.ts
import axios, { AxiosResponse, AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "/api", // This is correct for Amplify rewrites
  withCredentials: true, // This is crucial for sending/receiving cookies
});

// Response Interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // CORRECTED: Return the full response object, not just response.data
    // This makes 'instance' behave like a standard Axios instance.
    return response;
  },
  (error: AxiosError) => {
    // You can add global error handling here if needed
    // console.error("Axios Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// You might also have a request interceptor, ensure it's not causing issues
/*
instance.interceptors.request.use(
  (config) => {
    // Example: Add a token to headers if it's not an HttpOnly cookie setup
    // const token = localStorage.getItem('jwtToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/

// import { RootState, store } from "@/redux/store";
// import axios, {
//   AxiosError,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";

// import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import { useSelector } from "react-redux";

// // creating axios request instance
// // use the following axios create function for the local environment
// // export const instance = axios.create({
// //   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
// //   withCredentials: true,
// // });

// // instead of calling the full backend server url from the env file
// // leave the base url as /api then handle the backend server url from the amplify console
// // for the proxy set up
// export const instance = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

// // this is for the token storage, would need to set the token in cookies
// // export const AuthStorage = {
// //   async setToken(token: string) {
// //     setCookie("token", token);
// //   },

// //   async getToken() {
// //     getCookie("token");
// //   },

// //   async clear(token: string) {
// //     deleteCookie("token");
// //   },
// // };

// // configuring the intercetpor for axios request
// // intercepting token prior to sending the request
// // then adding token in the header
// instance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     // const token = getCookie("token"); // 토큰 미사용시 무시

//     const token = store.getState().authentication.token;

//     if (token) {
//       // 토큰 사용시 헤더에 토큰 추가
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // You could conditionally set it for non-FormData requests if you need it
//     // if (!(config.data instanceof FormData)) {
//     //   config.headers["Content-Type"] = "application/json; charset=utf-8";
//     // }

//     // console.log({
//     //   headers: config.headers,
//     //   method: config.method,
//     //   url: config.url,
//     //   baseUrl: config.baseURL,
//     //   data: config.data,
//     //   params: config.params,
//     // });
//     return config;
//   },
//   (error: AxiosError) => {
//     console.log("API request error", error.config);
//     return Promise.reject(error);
//   }
// );

// // intercepts the response from the backend

// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // console.log({
//     //   status: response.status,
//     //   statusText: response.statusText,
//     //   data: response.data,
//     // });
//     return response.data; // 서버에서 받는 데이터가 data 속성에 들어있는 경우
//     // return response.data.data;	// 서버에서 받는 데이터가 data.data 속성에 들어있는 경우
//   },
//   async (error: AxiosError) => {
//     console.warn(error.config?.url + " API response error", {
//       response_data: error.response?.data,
//       status: error.response?.status,
//       request_info: {
//         method: error.config?.method,
//         url: error.config?.url,
//         baseUrl: error.config?.baseURL,
//         headers: error.config?.headers,
//         params: error.config?.params,
//         data: error.config?.data,
//       },
//     });
//     const errorData: Shared.ErrorResponse = error.response
//       ?.data as Shared.ErrorResponse;
//     alert(`${errorData.error.code}: ${errorData.error.message}`);
//     return Promise.reject(error);
//   }
// );
