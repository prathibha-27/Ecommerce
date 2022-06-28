import ProductCard from "../productCard";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import Cart from "../cart";
import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductList() {
  // const [product, setproduct] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:4000/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
    // axios
    //   .get("")
    //   .then((res) => {
    //     setproduct(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return (
    <div className="product-list">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        products.map((item, i) => (
          <>
            <ProductCard
              key={i}
              img={item.image}
              name={item.name}
              category={item.category}
              price={item.price}
              stock={item.stock}
              id={item.id}
              description={item.description}
            />
          </>
        ))
      )}
    </div>
  );
}

export default ProductList;
