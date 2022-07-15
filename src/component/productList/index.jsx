import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../productCard";
import axios from "axios";
import { UPDATE_PRODUCT_LIST } from "../../redux/actions";

function ProductList() {
  // const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  console.log(productList, "bye");

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
  return (
    <div className="product-list">
      {loading ? (
        <p>Loading</p>
      ) : (
        productList?.map((item, i) => (
          <>
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
          </>
        ))
      )}
    </div>
  );
}

export default ProductList;
