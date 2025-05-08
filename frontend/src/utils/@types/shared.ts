// command response type
namespace Shared {
  export interface ErrorResponse {
    data: null;
    error: {
      code: number;
      message: string;
    };
    success: boolean;
  }

  export interface AxiosRequestConfig {
    method: string;
    url: string;
    headers: {
      Authorization: string;
      "Content-Type": string;
    };
    data: string;
  }
}
