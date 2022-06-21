import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  let { name } = useParams();

  return (
    <div className="product-detail">
      <h1>{name}</h1>
    </div>
  );
}

export default ProductDetail;
