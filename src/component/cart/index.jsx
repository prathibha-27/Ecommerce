import React, { useEffect, useState } from "react";
import CartCard from "../cartCard";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "../cartSummary";
import { UPDATE_CART } from "../../redux/actions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [del, setDel] = useState(cart);
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteAll = () => {
    if (cart.length > 0) {
      setDel([]);
    }
    dispatch(UPDATE_CART([]));
  };

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
                    flag={flag}
                    setFlag={setFlag}
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
          {del.length ? (
            <div className="cart-t-btn">
              <button onClick={() => handleDeleteAll()}>Delete All</button>
            </div>
          ) : null}
        </div>
        <div className="cart-summary">
          <CartSummary flag={flag} setFlag={setFlag} />
        </div>
      </div>
    </>
  );
}

export default Cart;
