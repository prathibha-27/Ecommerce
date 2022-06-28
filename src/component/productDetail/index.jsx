import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductDetail() {
  let { id } = useParams();
  console.log(id + "hi");

  const [selectedColor, setselectedColor] = useState("purple");

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:4000/product/?id=1");
        console.log(result + "jii");
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  console.log(product?.data?.id + "wtf");
  return loading ? (
    <div>loading....</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product-detail">
      <div className="product-detail-description">
        <div className="product-detail-description-image">
          {product?.data?.imageGallery.map(
            (img) => img.color == selectedColor && <img src={img.url} />
          )}
          <div className="product-detail-description-btn ">
            <button
              className={`${selectedColor === "purple" ? "active" : null}`}
              onClick={() => setselectedColor("purple")}
            >
              purple
            </button>
            <button
              className={`${selectedColor === "blue" ? "active" : null}`}
              onClick={() => setselectedColor("blue")}
            >
              blue
            </button>
          </div>
        </div>

        <div className="product-detail-description-content">
          <h4>{product?.data?.category}</h4>
          <h4>{product?.data?.name}</h4>
          <div className="product-detail-description-content-descipt">
            {product?.data?.description}
          </div>
          <h3>${product?.data?.price.toFixed(2)}</h3>
          <div>
            <button className="product-detail-description-content-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
