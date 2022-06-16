import Header from "./component/header";
import ProductList from "./component/productList";

import "../src/style/global.scss";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
