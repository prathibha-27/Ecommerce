import React from "react";

function ProductCard({ img, name, category, price, stock }) {
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
          <a href="/">{name}</a>
          <a href="/">{category}</a>
        </div>
        <div className="product-card-content-price">
          <h4>${price.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
