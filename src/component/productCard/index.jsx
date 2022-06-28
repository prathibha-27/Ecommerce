import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductCard({ img, name, category, price, stock, id }) {
  console.log(name);
  return (
    <div className="product-card">
      <div
        className={`product-card-content-status ${
          stock ? "success-bg" : "error-bg"
        }`}
      >
        {stock ? "In Stock" : "Out of Stock"}
      </div>

      <div className="product-card-image">
        <img src={img} />
      </div>
      <div className="product-card-content">
        <div className="product-card-content-name">
          <Link to={`/productlist/${id}`}>{category}</Link>
          <Link to={`/productlist/${id}`}>{name}</Link>
        </div>
        <div className="product-card-content-price">
          <h4>${price.toFixed(2)}</h4>
        </div>
        <div className="product-card-content-btn">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
