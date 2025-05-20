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
}
