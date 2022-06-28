import React from "react";

function CartCard({ name, img }) {
  return (
    <>
      <td className="cartcard-content-image">
        <img src={img} />
      </td>
      <td className="cartcard-content-name">{name}</td>

      <td>
        <button className="cartcard-content-btn">Delete</button>
      </td>
    </>
  );
}

export default CartCard;
