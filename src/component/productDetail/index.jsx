import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";

function ProductDetail() {
  let { id } = useParams();
  console.log(id + "hi");

  const [selectedColor, setselectedColor] = useState("purple");

  return (
    <div className="product-detail">
      {data.products.map(
        (item) =>
          item.id == id && (
            <div className="product-detail-description">
              <div className="product-detail-description-image">
                {item.imageGallery.map(
                  (img) => img.color == selectedColor && <img src={img.url} />
                )}
                <div className="product-detail-description-btn ">
                  <button
                    className={`${
                      selectedColor === "purple" ? "active" : null
                    }`}
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
                <h4>{item.category}</h4>
                <h4>{item.name}</h4>
                <div className="product-detail-description-content-descipt">{item.description}</div>
                <h3>${item.price.toFixed(2)}</h3>
                <div>
                  <button className="product-detail-description-content-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ProductDetail;
