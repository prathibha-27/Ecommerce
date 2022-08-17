import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const countryList = [
    { name: "India", state: ["Karnataka", "Maharastra"] },
    { name: "America", state: [] },
  ];
  const [fromCountires, setFromCountries] = useState(countryList);
  const [formState, setFormState] = useState([]);
  const [zipcode, setZipCode] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const history = useNavigate();

  const cart = useSelector((state) => state.cart);

  const handleFromCountries = (e) => {
    const country = countryList.find(
      (country) => country.name === e.target.value
    );
    setFromCountries(country.name);
    setFormState(country.state);
  };

  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += item.qty * item.price;
    });
    setGrandTotal(total);
  }, [cart]);

  const handleCheckoutNavigation = () => {
    history("/shipping");
  };

  return (
    <div className="cartsummary">
      <h4>Cart Summary</h4>
      <hr />

      <div className="cartsummary-countrydropdown">
        <label>
          <h4>Country</h4>
          <select
            className="cartsummary-countrydropdown-select"
            onChange={(e) => handleFromCountries(e)}
          >
            <option>Select Country</option>
            {countryList.map((country, key) => (
              <option key={key} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="cartsummary-state">
        <label>
          <h4>State</h4>
          <select className="cartsummary-state-select">
            <option>Select State</option>
            {formState.map((state, key) => (
              <option key={key} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="cartsummary-zip">
        <label>
          <h4>Zip</h4>

          <input
            className="cartsummary-zip-code"
            type="text"
            name="zip"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
          ></input>
        </label>
      </div>
      <hr />
      <div className="cartsummary-grandtotal">
        <div>
          <p> Grandtotal : {grandTotal}</p>
        </div>

        <div className="cartsummary-grandtotal-btn">
          <button onClick={() => handleCheckoutNavigation()}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
