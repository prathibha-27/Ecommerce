import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "../addressForm";
import OrderSummary from "../orderSummary";
import PickupForm from "../pickupForm";
import { useEffect } from "react";

function ShippingPage() {
  const [shipping, setShipping] = useState(true);
  const cart = useSelector((state) => state.cart);
  const [grandtotal, setGrandTotal] = useState();

  useEffect(() => {
    let total = 0;
    cart.map((item) => (total += item.qty * item.price));
    setGrandTotal(total);
  }, []);

  // const products = useSelector((state) => state.cart);

  return (
    <>
      <div className="checkout">
        <div classsName="checkout-shipping">
          <div classsName="checkout-shipping-btn" style={{ display: "flex" }}>
            <div
              className={`checkout-shipping-btn-shipping ${
                shipping ? "selected-bg" : null
              }`}
            >
              <input
                type="radio"
                id="shipping"
                name="radiobtn"
                value={shipping}
                onChange={() => setShipping(true)}
              />
              <label htmlFor="shipping">Shipping</label>
            </div>

            <div
              className={`checkout-shipping-btn-pickup ${
                !shipping ? "selected-bg" : null
              }`}
            >
              <input
                type="radio"
                id="pickup"
                name="radiobtn"
                onChange={() => setShipping(false)}
              />
              <label htmlFor="pickup">Pickup</label>
            </div>
          </div>
          {shipping ? <AddressForm /> : <PickupForm />}
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

export default ShippingPage;
