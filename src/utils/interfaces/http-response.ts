// This is the return code of HTTP/HTTPS request.
export enum ResponseCode {
  INCOMPLETE_INPUT,
  UNREGISTERED,
  SUCCESS,
  TOO_OFTEN,
  INCORRECT_VERIFICATION_CODE,
  UNLOGIN,
  INCORRECT_USERNAME_OR_PASSWORD,
  FIND_NOTHING,
  INVALID_TIME,
  NOT_FOUND,
  INVALID_INPUT,
  REGISTERED,
  ERROR,
  INVALID,
  INSUFFICIENT_PRIVILEGES,
  DUPLICATE_KEY = 11000
}

export default interface ResponseData {
  code: ResponseCode;
  message?: string;
  errmsg?: string;
  username?: string;
  type: string;
}
