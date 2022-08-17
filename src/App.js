import Header from "./component/header";
import ProductList from "./component/productList";
import HomePage from "./component/homePage";
import ProductDetail from "./component/productDetail";
import Cart from "./component/cart";
import { Provider } from "react-redux/es/exports";
import store from "../src/redux/store";
import ShippingPage from "./component/shippingPage";
import MiniCart from "./component/minicart";

import "../src/style/global.scss";
import "./style.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./component/paymentPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/productlist" exact element={<ProductList />} />
            <Route
              path="/productdetail/:id"
              exact
              element={<ProductDetail />}
            />

            <Route path="/cart" exact element={<Cart />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
