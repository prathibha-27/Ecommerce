import React from "react";
import data from "../data";
import ProductCard from "../productCard";

function ProductList() {
  return (
    <div className="product-list">
      {data.products.map((item, i) => (
        <ProductCard
          key={i}
          img={item.image}
          name={item.name}
          category={item.category}
          price={item.price}
          stock={item.stock}
        />
      ))}
    </div>
  );
}

export default ProductList;
