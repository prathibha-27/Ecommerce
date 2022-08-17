import React, { useState, useEffect } from "react";
import OrderSummary from "../orderSummary";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const shippingAddress = useSelector((state) => state.address);
  const pickupAddress = useSelector((state) => state.pickup);
  const [grandtotal, setGrandTotal] = useState();
  const [para, setPara] = useState("");
  const history = useNavigate();

  const location = useLocation();
  useEffect(() => {
    let total = 0;
    cart.map((item) => (total += item.qty * item.price));
    setGrandTotal(total);
  }, []);

  useEffect(() => {
    if (location.state.shipClick) {
      setPara(shippingAddress);
    } else {
      setPara(pickupAddress);
    }
  }, []);

  const handleBack = () => {
    history("/shipping");
  };
  
  return (
    <>
      <div className="checkout">
        <h2>Checkout Payment</h2>
        <div className="checkout-address">
          {location.state.shipClick ? (
            <>
              <h2>Shipping Address</h2>
              <div className="checkout-address-shipping">
                <p>
                  {para.firstname} {para.lastname}
                </p>
                <p>
                  {para.addressline1} {para.addressline2}
                </p>
                <p>
                  {para.city} , {para.selectedState}
                </p>
                <p>{para.fromCountries}</p>
                <p>{para.phone}</p>
              </div>
            </>
          ) : (
            <>
              <h2>Pickup Address</h2>
              <div>
                <p>{para.pickup}</p>
                <p>{para.email}</p>
                <p>{para.mobile}</p>
                <p>{para.date}</p>
              </div>
            </>
          )}
          <button type="button" onClick={(e) => handleBack(e)}>
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
