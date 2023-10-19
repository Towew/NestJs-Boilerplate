interface interceptedResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  service: string;
  timestamp: string;
}

interface interceptedErrorResponse extends interceptedResponse<T> {
  errorCode: string;
}

export { interceptedResponse, interceptedErrorResponse };
