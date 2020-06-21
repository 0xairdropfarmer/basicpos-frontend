import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import registerReducer from "./register.reducer";
import forgotpasswordReducer from "./forgotpassword.reducer";
import resetpasswordReducer from "./resetpassword.reducer";
export default combineReducers({
  loginReducer,
  registerReducer,
  forgotpasswordReducer,
  resetpasswordReducer,
});
