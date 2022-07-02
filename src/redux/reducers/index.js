import { combineReducers } from "redux";
import { productList } from "./productList";
import { product } from "./product";
import { cart } from "./cart";

const rootReducer = combineReducers({
  productList,
  product,
  cart,
});

export default rootReducer;
