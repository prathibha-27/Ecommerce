import React, { useState, useEffect } from "react";
import OrderSummary from "../orderSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const shippingAddress = useSelector((state) => state.address);
  const pickupAddress = useSelector((state) => state.pickup);
  const [grandtotal, setGrandTotal] = useState();
  const [para, setPara] = useState("");
  const [click, setClick] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    let total = 0;
    cart.map((item) => (total += item.qty * item.price));
    setGrandTotal(total);
  }, []);

  console.log(click, "kkk");

  useEffect(() => {
    setClick(true);
    if (shippingAddress.firstname) {
      setPara(shippingAddress.firstname);
    } else if (pickupAddress.pickup) {
      setPara(pickupAddress.pickup);
    }
  }, [click]);

  const handleBack = () => {
    setClick(true);
    history("/shipping");
  };

  console.log(shippingAddress.firstname, "pp");
  return (
    <>
      <div className="checkout">
        <div className="checkout-address">
          <h2>Shipping Address</h2>
          <p>{para}</p>
          <button type="button" onClick={() => handleBack()}>
            Back
          </button>
        </div>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <hr></hr>
          {cart?.map((item, i) => (
            <>
              <OrderSummary
                key={i}
                item={item}
                name={item.name}
                img={item.image}
                qty={item.qty}
                price={item.price}
              />
            </>
          ))}

          <div className="checkout-summary-total">
            <p>Grandtotal:</p>
            <p>{grandtotal}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
