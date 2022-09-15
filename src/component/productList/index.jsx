import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard";
import axios from "axios";
import { UPDATE_PRODUCT_LIST } from "../../redux/actions";
import LayeredNavigation from "../layeredNavigation";

function ProductList() {
  const [loading, setLoading] = useState(false);

  const filter = useSelector((state) => state.filter);

  const [checked, setChecked] = useState({
    priceRange: false,
    categoryy: false,
    stock: false,
  });
  const [loop, setLoop] = useState([]);

  const [inputValue, setInputValue] = useState({
    priceRange: "",
    categoryy: "",
    stock: [],
  });

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:4000/products");
        dispatch(UPDATE_PRODUCT_LIST(result.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
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

  useEffect(() => {
    const p = inputValue.priceRange.split("-");
    const minPrice = p[0];
    const maxPrice = p[1];
    const items = productList.filter((item) => {
      if (inputValue.priceRange.length > 0) {
        if (
          parseInt(maxPrice) > parseInt(item.price) &&
          parseInt(minPrice) < parseInt(item.price)
        ) {
          if (inputValue.stock.length > 0) {
            const unique = inputValue.stock.includes(item);
            if (unique) {
              if (item.category === inputValue.categoryy) {
                return item;
              } else if (inputValue.categoryy === "") {
                return item;
              }
            }
          } else {
            if (item.category === inputValue.categoryy) {
              return item;
            } else if (inputValue.categoryy === "") {
              return item;
            }
          }

          return false;
        }
      } else if (item.category === inputValue.categoryy) {
        if (inputValue.stock.length > 0) {
          const unique = inputValue.stock.includes(item);
          if (unique) {
            if (item.category === inputValue.categoryy) {
              return item;
            }
          }
        } else if (item.category === inputValue.categoryy) {
          return item;
        }
        return false;
      } else if (inputValue.stock.length > 0 && !inputValue.categoryy) {
        const unique = inputValue.stock.includes(item);
        return unique;
      } else if (
        inputValue.priceRange.length === 0 &&
        !inputValue.categoryy &&
        inputValue.stock.length === 0
      ) {
        return item;
      }
    });
    setLoop(items);
  }, [inputValue.priceRange, inputValue.categoryy, inputValue.stock]);

  const handleClearAll = () => {
    setChecked({ priceRange: false, categoryy: false, stock: false });
    setInputValue({ ...inputValue, priceRange: "", categoryy: "" });
  };

  const handleCheckedOptions = (e, item) => {
    if (item === "priceRange") {
      setInputValue({ ...inputValue, priceRange: "" });
      setChecked({ priceRange: false });
    } else if (item === "categoryy") {
      setInputValue({ ...inputValue, categoryy: "" });
      setChecked({ categoryy: false });
    }
  };

  return (
    <div className="productlist">
      <LayeredNavigation
        handleClearAll={handleClearAll}
        handleCheckedOptions={handleCheckedOptions}
        inputValue={inputValue}
        setInputValue={setInputValue}
        checked={checked}
        setChecked={setChecked}
      />

      {loading ? (
        <p>Loading</p>
      ) : (
        loop?.map((item, i) => (
          <ProductCard
            key={i}
            img={item.image}
            name={item.name}
            category={item.category}
            price={item.price}
            stock={item.stock}
            id={item.id}
            description={item.description}
            item={item}
          />
        ))
      )}

      {/* {loading ? (
        <p>Loading</p>
      ) : (
        productList?.map((item, i) => (
          <>
            <ProductCard
              inputValue.priceRange={inputValue.priceRange}
              setinputValue.priceRange={setinputValue.priceRange}
              key={i}
              img={item.image}
              name={item.name}
              category={item.category}
              price={item.price}
              stock={item.stock}
              id={item.id}
              description={item.description}
              item={item}
            />
          </>
        ))
      )} */}
    </div>
  );
}

export default ProductList;
