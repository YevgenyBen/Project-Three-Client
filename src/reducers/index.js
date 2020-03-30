import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import loginReducer from "./loginReducer"
import currentUserReducer from "./currentUserReducer"
import updateReducer from "./updateRecucer"

const rootReducer = combineReducers({
  signUpReducer,
  loginReducer,
  updateReducer,
  currentUserReducer
});

export default rootReducer;
