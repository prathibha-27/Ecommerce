import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function LayeredNavigation({
  priceRange,
  setPriceRange,
  categoryy,
  setCategoryy,
  stock,
  setStock,
  flag,
  setFlag,
}) {
  const [priceDisplay, setPriceDisplay] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState(false);
  const [stockDisplay, setStockDisplay] = useState(false);

  const arrayList = ["0-99", "100-500", "500-1000"];

  const productList = useSelector((state) => state.productList);

  const handlePriceClick = () => {
    setPriceDisplay((priceDisplay) => !priceDisplay);
  };

  const handleCategoryClick = () => {
    setCategoryDisplay((categoryDisplay) => !categoryDisplay);
  };

  const handleStockClick = () => {
    setStockDisplay((stockDisplay) => !stockDisplay);
  };

  let count = 0;
  let coun = 0;

  const v = productList.filter((item) => {
    if (!item.stock) {
      coun++;
      return item;
    }
  });

  const s = productList.filter((item) => {
    if (item.stock > 0) {
      count++;
      return item;
    }
  });

  const x = [...new Set(productList.map((item) => item.category))];

  const handleCancel = () => {};

  return (
    <div className="layeredNavigation">
      <button onClick={() => handleCancel()}>Cancel</button>
      <button
        className="layeredNavigation-accordion"
        onClick={() => handlePriceClick()}
      >
        Price
      </button>
      <div className="layeredNavigation-filter">
        {priceDisplay ? (
          <>
            {arrayList.map((item, key) => {
              return (
                <div>
                  <label key={key}>
                    {" "}
                    <input
                      type="radio"
                      name="price"
                      value={priceRange}
                      onChange={() => setPriceRange(item)}
                    />
                    {item}
                  </label>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      <button
        className="layeredNavigation-accordion"
        onClick={() => handleCategoryClick()}
      >
        Category
      </button>
      <div className="layeredNavigation-filter">
        {categoryDisplay ? (
          <>
            {x.map((item) => {
              return (
                <div>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={categoryy}
                      onChange={() => setCategoryy(item)}
                    />
                    {item}
                  </label>
                </div>
              );
            })}
          </>
        ) : null}
      </div>
      <button
        className="layeredNavigation-accordion"
        onClick={() => handleStockClick()}
      >
        Stock Availability
      </button>
      <div className="layeredNavigation-filter">
        {stockDisplay ? (
          <>
            <div>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value={stock}
                  onChange={() => setStock(s)}
                />
                {count > 0 ? "In stock" : null}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value={stock}
                  onChange={() => setStock(v)}
                />

                {coun > 0 ? "Out of sotck" : null}
              </label>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default LayeredNavigation;
