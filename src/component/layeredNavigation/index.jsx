import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function LayeredNavigation({
  inputValue,
  setInputValue,
  checked,
  setChecked,
  handleClearAll,
  handleCheckedOptions,
}) {
  const { priceRange, categoryy, stock } = inputValue;
  const [priceDisplay, setPriceDisplay] = useState(true);
  const [categoryDisplay, setCategoryDisplay] = useState(true);
  const [stockDisplay, setStockDisplay] = useState(true);

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

  const changeRadio = (e) => {
    setChecked({ [e.target.value]: true });
  };

  return (
    <div className="layeredNavigation">
      <div className="layeredNavigation-accordionSelected">
        {Object.keys(inputValue).map((item) => {
          if (item === "priceRange" && priceRange !== "") {
            return (
              <div className="layeredNavigation-accordionSelected-displaySection ">
                <div className="layeredNavigation-accordionSelected-displaySection-option ">
                  {inputValue[item]}
                </div>
                <button
                  className="layeredNavigation-accordionSelected-displaySection-cancel"
                  onClick={(e) => handleCheckedOptions(e, item)}
                >
                  X
                </button>
              </div>
            );
          } else if (item === "categoryy" && categoryy !== "") {
            return (
              <div className="layeredNavigation-accordionSelected-displaySection">
                <div className="layeredNavigation-accordionSelected-displaySection-option">
                  {inputValue[item]}
                </div>
                <button
                  className="layeredNavigation-accordionSelected-displaySection-cancel"
                  onClick={(e) => handleCheckedOptions(e, item)}
                >
                  X
                </button>
              </div>
            );
          }
        })}

        <div class="separator"></div>

        <button
          className="layeredNavigation-accordionSelected-clearAll"
          onClick={() => handleClearAll()}
        >
          Clear All
        </button>
      </div>

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
                      checked={checked.priceRange}
                      onChange={(e) => {
                        setInputValue({ ...inputValue, priceRange: item });
                        changeRadio(e);
                      }}
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
                      checked={checked.categoryy}
                      // checked={filter.categoryy}
                      onChange={(e) => {
                        setInputValue({ ...inputValue, categoryy: item });
                        changeRadio(e);
                      }}
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
                  checked={checked.stock}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, stock: s });
                    changeRadio(e);
                  }}
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
                  checked={checked.stock}
                  onChange={(e) => {
                    setInputValue({ ...inputValue, stock: v });
                    changeRadio(e);
                  }}
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
