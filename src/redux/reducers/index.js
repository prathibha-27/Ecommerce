import { combineReducers } from "redux";
import { productList } from "./productList";
import { product } from "./product";
import { cart } from "./cart";
import { address } from "./address";
import { pickup } from "./pickup";

const rootReducer = combineReducers({
  productList,
  product,
  cart,
  address,
  pickup,
});

export default rootReducer;
