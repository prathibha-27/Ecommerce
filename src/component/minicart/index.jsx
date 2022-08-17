import { useSelector } from "react-redux";
import MinicartCard from "../minicartCard/minicartCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function MiniCart() {
  const cartItems = useSelector((state) => state.cart);
  const [grandTotal, setgrandTotal] = useState();

  useEffect(() => {
    let sum = 0;
    cartItems.map(
      (item) => (sum += (parseInt(item.qty) || 0) * parseInt(item.price))
    );
    setgrandTotal(sum);
  }, [cartItems]);

  const history = useNavigate();

  const handleViewCartNavigation = () => {
    history("/cart");
  };

  const handleCheckoutNavigation = () => {
    history("/shipping");
  };
  return (
    <div className="minicart">
      <h3>My Cart</h3>
      <hr></hr>
      <div className="minicart-items">
        {cartItems.map((item) => (
          <MinicartCard
            item={item}
            name={item.name}
            image={item.image}
            qty={item.qty}
            price={item.price}
            id={item.id}
          />
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="minicart-total">
          <div className="minicart-total-details">
            <span>Grandtotal : </span>
            <span>{grandTotal?.toFixed(2)}</span>
          </div>
          <div className="minicart-total-btn">
            <div className="minicart-total-btn-cart">
              <button onClick={() => handleViewCartNavigation()}>
                View Cart
              </button>
            </div>
            <div className="minicart-total-btn-checkout">
              <button onClick={() => handleCheckoutNavigation()}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="minicart-emptycartdetails">
          <h3>You have no items in your cart</h3>
        </div>
      )}
    </div>
  );
}

export default MiniCart;
