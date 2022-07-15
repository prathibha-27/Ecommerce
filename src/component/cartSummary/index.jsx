import React, { useState } from "react";

function CartSummary() {
  const countryList = [
    { name: "India", state: ["Karnataka", "Maharastra"] },
    { name: "America", state: [] },
  ];
  const [fromCountires, setFromCountries] = useState(countryList);
  const [formState, setFormState] = useState([]);
  const [zipcode, setZipCode] = useState("");
  const [orderTotal, setOrderTotal] = useState();

  const handleFromCountries = (e) => {
    const country = countryList.find(
      (country) => country.name === e.target.value
    );
    setFromCountries(country.name);
    setFormState(country.state);
  };

  return (
    <div className="cartsummary">
      <h4>Cart Summary</h4>
      <hr />
      <div className="cartsummary-title">
        <p>Estimate Shipping and Tax</p>
      </div>
      <div className="cartsummary-estimation">
        <p>Enter your destination to get shipping estimation</p>
        <div className="cartsummary-estimation-countrydropdown">
          <label>
            <h4>Country</h4>
            <select className="" onChange={(e) => handleFromCountries(e)}>
              <option>Select Country</option>
              {countryList.map((country, key) => (
                <option key={key} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="cartsummary-estimation-state">
          <label>
            <h4>State</h4>
            <select>
              <option>Select State</option>
              {formState.map((state, key) => (
                <option key={key} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <div>
              <span>Zip</span>
            </div>
            <input
              type="text"
              name="zip"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
            ></input>
          </label>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <p>Subtotal</p>
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
