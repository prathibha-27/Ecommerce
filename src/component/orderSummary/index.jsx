import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function OrderSummary({ item, name, img, qty, price }) {
  const items = useSelector((state) => state.cart);

  const [amount, setAmount] = useState();

  useEffect(() => {
    let amnt = 0;
    amnt = qty * price;
    setAmount(amnt);
  }, []);
  console.log(amount, "we");

  return (
    <>
      <div className="ordersummary">
        <div className="ordersummary-content">
          <div className="ordersummary-content-image">
            <img src={img} />
          </div>
          <div className="ordersummary-content-description">
            <div className="ordersummary-content-description-name">{name}</div>
            <div className="ordersummary-content-description-qty">
              {" "}
              Qty: {qty}
            </div>
            <div className="ordersummary-content-description-price">
              ${amount}
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    </>
  );
}

export default OrderSummary;
