import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAddToCart from "../../customHooks/useAddToCart";
function ProductCard({ img, name, category, price, stock, id, item }) {
  console.log(name);

  const [count, setCount] = useState(1);
  const [error, setError] = useState(" ");
  const [click, setClick] = useState(false);
  const { handleAddToCart } = useAddToCart();

  const handleDecrement = () => {
    if (count > 1) {
      setCount(parseInt(count) - 1);
    }
  };

  const handleIncrement = () => {
    if (count) {
      setCount(parseInt(count) + 1);
    } else {
      setCount(1);
    }
  };

  const addToCart = () => {
    if (!count) {
      setClick(true);
      setError("please enter qty equal to or more than 1");
    } else {
      setError("");
      handleAddToCart(item, count);
      // if (
      //   window.confirm(
      //     `Product added to cart successfully\nClick on "Ok" to continue view or "Cancel"`
      //   )
      // ) {
      //   window.open("/cart", "_tab");
      // }
    }
  };
  return (
    <div className="product-card">
      <div
        className={`product-card-content-status ${
          stock ? "success-bg" : "error-bg"
        }`}
      >
        {stock ? "In Stock" : "Out of Stock"}
        {stock ? -stock : null}
      </div>

      <div className="product-card-image">
        <img src={img} />
      </div>
      <div className="product-card-content">
        <div className="product-card-content-name">
          <Link to={`/productdetail/${id}`}>{category}</Link>
          <Link to={`/productdetail/${id}`}>{name}</Link>
        </div>
        <div className="product-card-content-price">
          <h4>${price.toFixed(2)}</h4>
        </div>
        <div className="product-card-content-btn">
          {stock ? (
            <div className="product-card-content-btn-qty">
              <button type="button" onClick={handleDecrement}>
                -
              </button>
              <input
                type="number"
                value={count}
                onChange={(event) => setCount(parseInt(event.target.value))}
                onBlur={() => !count && setCount(1)}
              />

              <button type="button" onClick={handleIncrement}>
                +
              </button>
            </div>
          ) : (
            <div style={{ width: "23%" }} />
          )}

          <button
            type="button"
            className="product-card-content-btn-addbtn"
            onClick={addToCart}
            disabled={stock ? false : true}
          >
            Add to Cart
          </button>
        </div>
        {click && addToCart ? (
          <p className="product-card-content-error"> {error}</p>
        ) : null}
      </div>
    </div>
  );
}

export default ProductCard;
