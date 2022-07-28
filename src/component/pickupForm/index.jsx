import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAR_ADDRESS, UPDATE_PICKUP } from "../../redux/actions";

function PickupForm() {
  const pickupList = ["Warehouse1", "Warehouse2"];

  const [inputValue, setInputValue] = useState("");
  const [pickup, setPickup] = useState("");
  const [click, setClick] = useState(false);
  const [date, setDate] = useState("");

  const pickupUpdate = useSelector((state) => state.pickup);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  console.log(pickup, "fixed");

  const handlePickup = (e) => {
    const warehouse = pickupList.find(
      (warehouse) => warehouse === e.target.value
    );
    setPickup(warehouse);
  };

  const handleNext = () => {
    Object.assign(inputValue, { pickup, date });
    setClick(true);
    dispatch(UPDATE_PICKUP(inputValue));
    if (click) {
      setClick(true);
      history("/payment");
    }
  };

  console.log(inputValue, "object");

  return (
    <div className="pickup">
      <select value={pickup} onChange={(e) => handlePickup(e)}>
        <option>Select Pickup</option>
        {pickupList.map((warehouse, key) => (
          <option key={key} value={warehouse}>
            {warehouse}
          </option>
        ))}
      </select>
      {click && !pickup ? <p>This is a required field</p> : null}

      <div className="pickup-address">
        <div className="pickup-address-email">
          <input
            placeholder="Email for Pickup"
            type="text"
            name="email"
            value={inputValue.email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="pickup-address-mobile">
          <input
            placeholder="Mobile for Pickup"
            name="mobile"
            value={inputValue.mobile}
            onChange={(e) => handleInputChange(e)}
            type="text"
          />
        </div>
      </div>
      {click && !inputValue.email && !inputValue.mobile ? (
        <p>Mobile or Email is required</p>
      ) : null}
      <div className="pickup-date">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      {click && !date ? <p>Date is required</p> : null}
      <div className="pickup-next">
        <button type="button" onClick={() => handleNext()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PickupForm;
