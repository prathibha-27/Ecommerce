import React, { useEffect } from "react";
import data from "../data";
import CartCard from "../cartCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UPDATE_CART } from "../../redux/actions";
import { cart } from "../../redux/reducers/cart";

function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <div className="cart">
        <table className="cart-table">
          <thead className="cart-table-head">
            <tr>
              <th>Products</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="cart-table-body">
            {cart.map((item) => (
              <tr>
                <CartCard
                  name={item.name}
                  img={item.image}
                  id={item.id}
                  stock={item.stock}
                  qty={item.qty}
                />
              </tr>
            ))}
          </tbody>
        </table>
        ;
      </div>
    </>
  );
}

export default Cart;
