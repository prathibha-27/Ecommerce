import { useState } from "react";

function CartCard({ name, item, img, qty, price }) {
  const [quantity, setQuantity] = useState(qty);

  const p = parseInt(price);
  const q = parseInt(qty);

  return (
    <>
      <td className="cartcard-content-image">
        <img src={img} />
      </td>
      <td className="cartcard-content-name">{name}</td>
      <td className="cartcard-content-price">{price}</td>
      <td className="cartcard-content-qty">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td className="cartcard-content-subtotal">{p * q}</td>
      <td>
        <button className="cartcard-content-btn">Delete</button>
      </td>
    </>
  );
}

export default CartCard;
