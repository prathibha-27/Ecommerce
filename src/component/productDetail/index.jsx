import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DISPLAY_MINICART, UPDATE_PRODUCT } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import useAddToCart from "../../customHooks/useAddToCart";

function ProductDetail(props) {
  let { id } = useParams();
  const [selectedColor, setselectedColor] = useState("purple");
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // const history = useNavigate();
  const { handleAddToCart } = useAddToCart();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/?id=${id}`
        );

        dispatch(UPDATE_PRODUCT(response));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrement = () => {
    setCount(parseInt(count) + 1);
  };

  // const handleAddToCart = (err) => {
  //   if (!count) {
  //     setClick(true);
  //     setErrorMessage("Please enter qty equal to or more than 1");
  //   } else {
  //     setErrorMessage("");
  //     // history(`/cart/${id}?/qty=${count}`);
  //   }
  // };

  const addToCart = () => {
    if (!count || count > product?.data?.stock) {
      setClick(true);
      setErrorMessage(true);
    } else {
      setErrorMessage("");
      handleAddToCart(product?.data, count);
      dispatch(DISPLAY_MINICART(true));
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-description">
        <div className="product-detail-description-image">
          <div
            className={`product-detail-description-image-stock ${
              product?.data?.stock ? "success-bg" : "error-bg"
            }`}
          >
            {product?.data?.stock
              ? `In Stock ${product?.data?.stock}`
              : `Out of Stock ${product?.data?.stock}`}
          </div>
          {product?.data?.imageGallery.map(
            (img) => img.color == selectedColor && <img src={img.url} />
          )}
          <div className="product-detail-description-btn ">
            <button
              className={`${selectedColor === "purple" ? "active" : null}`}
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
          <h4>{product?.data?.category}</h4>
          <h4>{product?.data?.name}</h4>
          <div className="product-detail-description-content-descipt">
            {product?.data?.description}
          </div>
          <h3>${product?.data?.price?.toFixed(2)}</h3>

          <div className="product-detail-description-content-btn">
            {product?.data?.stock ? (
              <div className="product-detail-description-content-btn-qty">
                <button type="button" onClick={handleDecrement}>
                  -
                </button>
                <input
                  type="number"
                  value={count}
                  onChange={(event) => setCount(parseInt(event.target.value))}
                  onBlur={() => !count && setCount(1)}
                />
                <button type="button" onClick={handleIncrement}>
                  +
                </button>
              </div>
            ) : null}
            <button
              type="button"
              className="product-detail-description-content-btn-addbtn"
              onClick={addToCart}
              disabled={product?.data?.stock ? false : true}
            >
              Add to Cart
            </button>
          </div>
          {errorMessage ? (
            <p className="product-detail-description-content-btn-error">
              Please add qty within stock
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
