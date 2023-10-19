enum errorCodeEnum {
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}

enum errorMessageEnum {
  REQUEST_TIMEOUT = 'Request Timeout!',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  DATABASE_ERROR = 'Error when select, insert, update or delete database',
}

export { errorCodeEnum, errorMessageEnum };
