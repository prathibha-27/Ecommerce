import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard";
import axios from "axios";
import { UPDATE_PRODUCT_LIST } from "../../redux/actions";
import LayeredNavigation from "../layeredNavigation";

function ProductList() {
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [categoryy, setCategoryy] = useState("");
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [flag, setFlag] = useState(false);

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
  const p = priceRange.split("-");
  const minPrice = p[0];
  const maxPrice = p[1];

  const items = productList.filter((item) => {
    if (priceRange.length > 0) {
      if (
        parseInt(maxPrice) - parseInt(minPrice) &&
        parseInt(maxPrice) > parseInt(item.price) &&
        parseInt(minPrice) < parseInt(item.price)
      ) {
        if (stock.length > 0) {
          const unique = stock.includes(item);
          if (unique) {
            if (item.category === categoryy) {
              return item;
            } else if (categoryy === "") {
              return item;
            }
          }
        } else {
          if (item.category === categoryy) {
            return item;
          } else if (categoryy === "") {
            return item;
          }
        }

        return false;
      }
    } else if (item.category === categoryy) {
      debugger;
      if (stock.length > 0) {
        const unique = stock.includes(item);
        if (unique) {
          if (item.category === categoryy) {
            return item;
          }
        }
      } else if (item.category === categoryy) {
        return item;
      }
      return false;
    } else if (stock.length > 0 && !categoryy) {
      const unique = stock.includes(item);
      return unique;
    } else if (priceRange.length === 0 && !categoryy && stock.length === 0) {
      return item;
    }
  });

  return (
    <div className="product-list">
      <LayeredNavigation
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categoryy={categoryy}
        setCategoryy={setCategoryy}
        stock={stock}
        setStock={setStock}
        flag={flag}
        setFlag={setFlag}
      />

      {loading ? (
        <p>Loading</p>
      ) : (
        items?.map((item, i) => (
          <ProductCard
            priceRange={priceRange}
            setPriceRange={setPriceRange}
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
              priceRange={priceRange}
              setPriceRange={setPriceRange}
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
