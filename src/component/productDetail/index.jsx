import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCT } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function ProductDetail(props) {
  let { id } = useParams();
  const [selectedColor, setselectedColor] = useState("purple");
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  console.log(product + "My thu");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/?id=${id}`
        );
        dispatch(UPDATE_PRODUCT(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrement = () => {
    setCount(parseInt(count) + 1);
  };

  const handleAddToCart = (err) => {
    if (!count) {
      setClick(true);
      setErrorMessage("Please enter qty equal to or more than 1");
    } else {
      setErrorMessage("");
      history(`/cart/${id}?qty=${count}`);
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail-description">
        <div className="product-detail-description-image">
          <div
            className={`product-detail-description-image-stock ${
              product?.stock ? "success-bg" : "error-bg"
            }`}
          >
            {product?.stock ? "In Stock" : "Out of Stock"}
          </div>
          {product?.imageGallery.map(
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
          <h4>{product?.category}</h4>
          <h4>{product?.name}</h4>
          <div className="product-detail-description-content-descipt">
            {product?.description}
          </div>
          <h3>${product?.price?.toFixed(2)}</h3>

          <div className="product-detail-description-content-btn">
            {product?.stock ? (
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
              onClick={handleAddToCart}
              disabled={product?.stock ? false : true}
            >
              Add to Cart
            </button>
          </div>
          {click && handleAddToCart ? (
            <p className="product-detail-description-content-btn-error">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
