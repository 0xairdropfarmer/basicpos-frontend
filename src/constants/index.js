export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

//Forgot password
export const FORGOT_FETCHING = "FORGOT_FETCHING";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const FORGOT_FAILED = "FORGOT_FAILED";

export const server = {
  LOGIN_URL: `login`,
  REFRESH_TOKEN_URL: `refresh/token`,
  REGISTER_URL: `register`,
  PRODUCT_URL: `product`,
  TRANSACTION_URL: `transaction`,
  REPORT_URL: `report`,
  TOKEN_KEY: `token`,
  REFRESH_TOKEN_KEY: `refresh_token`,
};
