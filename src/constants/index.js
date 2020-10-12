export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
// Stat
export const STAT_FETCHING = "STAT_FETCHING";
export const STAT_SUCCESS = "STAT_SUCCESS";
export const STAT_FAILED = "STAT_FAILED";

//Forgot password
export const FORGOT_FETCHING = "FORGOT_FETCHING";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const FORGOT_FAILED = "FORGOT_FAILED";

// POS Machine
export const POSMACHINE_FETCHING = "POSMACHINE_FETCHING";
export const POSMACHINE_SUCCESS = "POSMACHINE_SUCCESS";
export const POSMACHINE_FAILED = "POSMACHINE_FAILED";
export const POSMACHINE_CLEAR = "POSMACHINE_CLEAR";

//BRANCH
export const BRANCH_FETCHING = "BRANCH_FETCHING";
export const BRANCH_SUCCESS = "BRANCH_SUCCESS";
export const BRANCH_FAILED = "BRANCH_FAILED";
export const BRANCH_CLEAR = "BRANCH_CLEAR";
export const FETCHOPTION_SUCCESS = "FETCHOPTION_SUCCESS";
// SUPPLIER
export const SUPPLIER_FETCHING = "SUPPLIER_FETCHING";
export const SUPPLIER_SUCCESS = "SUPPLIER_SUCCESS";
export const SUPPLIER_FAILED = "SUPPLIER_FAILED";
export const SUPPLIER_CLEAR = "SUPPLIER_CLEAR";
// Shop Page
export const SHOP_FETCHING = "SHOP_FETCHING";
export const SHOP_SUCCESS = "SHOP_SUCCESS";
export const SHOP_FAILED = "SHOP_FAILED";

export const SHOP_UPDATE_ORDER = "SHOP_UPDATE_ORDER";
export const SHOP_UPDATE_PAYMENT = "SHOP_UPDATE_PAYMENT";
// Stock Page
export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_CLEAR = "STOCK_CLEAR";
// PRODUCT
export const PRODUCT_FETCHING = "SUPPLIER_FETCHING";
export const PRODUCT_SUCCESS = "SUPPLIER_SUCCESS";
export const PRODUCT_FAILED = "SUPPLIER_FAILED";
export const PRODUCT_CLEAR = "SUPPLIER_CLEAR";
export const FETCH_OPTION_SUCCESS = "FETCH_OPTION_SUCCESS";
export const imageUrl = "http://localhost:8081";
export const server = {
  LOGIN_URL: `login`,
  REFRESH_TOKEN_URL: `refresh/token`,
  REGISTER_URL: `register`,
  PRODUCT_URL: `product`,
  ORDER_URL: `order`,
  REPORT_URL: `report`,
  TOKEN_KEY: `token`,
  REFRESH_TOKEN_KEY: `refresh_token`,
  STAT_ENDPOINT: "stat",
};

export const Roles = [
  { name: "Admin", credentials: "admin" },
  { name: "Staff", credentials: "staff" },
];
