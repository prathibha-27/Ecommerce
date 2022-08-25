import { combineReducers } from "redux";
import { productList } from "./productList";
import { product } from "./product";
import { cart, minicart } from "./cart";
import { address } from "./address";
import { pickup } from "./pickup";
import { search } from "./search";

const rootReducer = combineReducers({
  productList,
  product,
  cart,
  minicart,
  address,
  pickup,
  search,
});

export default rootReducer;
