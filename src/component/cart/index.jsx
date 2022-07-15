import React, { useEffect } from "react";
import CartCard from "../cartCard";
import { useSelector } from "react-redux";
import CartSummary from "../cartSummary";

function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <div className="cart">
        <div className="cart-t">
          <table className="cart-t-table">
            <thead className="cart-t-table-head">
              <tr>
                <th>Products</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="cart-t-table-body">
              {cart.map((item) => (
                <tr>
                  <CartCard
                    name={item.name}
                    img={item.image}
                    id={item.id}
                    stock={item.stock}
                    qty={item.qty}
                    price={item.price}
                    item={item}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart-summary">
          <CartSummary />
        </div>
      </div>
    </>
  );
}

export default Cart;
