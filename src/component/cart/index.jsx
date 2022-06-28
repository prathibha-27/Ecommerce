import React from "react";
import data from "../data";
import CartCard from "../cartCard";

function Cart() {
  // console.log(name);
  return (
    <div className="cart">
      <table className="cart-table">
        <thead className="cart-table-head">
          <tr>
            <th>Products</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="cart-table-body">
          {data.products.map((item) => (
            <tr>
              <CartCard name={item.name} img={item.image} />
            </tr>
          ))}
        </tbody>
      </table>
      ;
    </div>
  );
}

export default Cart;
