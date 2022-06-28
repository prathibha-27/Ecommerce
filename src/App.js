import Header from "./component/header";
import ProductList from "./component/productList";
import HomePage from "./component/homePage";
import ProductDetail from "./component/productDetail";
import Cart from "./component/cart";

import "../src/style/global.scss";
import "./style.scss";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

function App() {
  // let { name } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/productlist" exact element={<ProductList />} />
          <Route path="/productlist/:id" exact element={<ProductDetail />} />
          <Route path="/cart" exact element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
