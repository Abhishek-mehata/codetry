import { combineReducers } from "redux";
import auth from "./auth";
import ui from "./ui";
import transaction from "./places";
import payment from "./payment";
import reservationCache from '../reducers/reservationCache';

export default combineReducers({
  auth,
  ui,
  transaction,
  payment,
  reservationCache,
});
