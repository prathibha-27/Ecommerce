import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATE_ADDRESS } from "../../redux/actions";
import { useLocation } from "react-router-dom";

function AddressForm() {
  const countryList = [
    { name: "India", state: ["Karnataka", "Maharastra"] },
    { name: "America", state: [] },
  ];
  const [fromCountries, setFromCountries] = useState("");
  const [formState, setFormState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [changeAddress, setChangeAddress] = useState(false);
  const [click, setClick] = useState(false);
  const history = useNavigate();

  const address = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setChangeAddress(false);
  };

  const handleFromCountries = (e) => {
    const country = countryList.find(
      (country) => country.name === e.target.value
    );
    setFromCountries(country.name);
    setFormState(country.state);
  };

  const handleCancelChange = (e) => {
    setInputValue({
      firstname: "",
      lastname: "",
      city: "",
      addressline1: "",
      addressline2: "",
      phone: "",
    });
    setSelectedState({ selectedState: "" });
    setFromCountries({ fromCountries: "" });
  };


  const handleFormSubmit = () => {
    setClick(true);
    const { firstname, lastname, city, addressline1, phone } = inputValue;
    Object.assign(inputValue, { selectedState, fromCountries });
   

    if (
      firstname &&
      lastname &&
      city &&
      addressline1 &&
      phone &&
      fromCountries &&
      selectedState
    ) {
      dispatch(UPDATE_ADDRESS(inputValue));
    }
  };

  const handleNext = () => {
    history("/payment", { state: { shipClick: true, inputValue } });
  };

  const handleUpdateForm = () => {
    dispatch(UPDATE_ADDRESS(inputValue));
    setChangeAddress(false);
  };

  return (
    <>
      {!address.firstname || changeAddress ? (
        <div className="addressform">
          <div className="addressform-name">
            <div className="addressform-fname">
              <label>FirstName</label>
              <input
                type="text"
                name="firstname"
                value={inputValue.firstname}
                onChange={(e) => handleInputChange(e)}
              />
              {click && !inputValue.firstname ? (
                <p>This is a required field</p>
              ) : null}
            </div>
            <div className="addressform-lname">
              <label>LastName</label>

              <input
                type="text"
                name="lastname"
                value={inputValue.lastname}
                onChange={(e) => handleInputChange(e)}
              />
              {click && !inputValue.lastname ? (
                <p>This is a required field</p>
              ) : null}
            </div>
          </div>

          <div className="addressform-address">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address line 1"
              name="addressline1"
              value={inputValue.addressline1}
              onChange={(e) => handleInputChange(e)}
            />
            {click && !inputValue.addressline1 ? (
              <p>This is a required field</p>
            ) : null}
            <input
              type="text"
              placeholder="Address line 2"
              name="addressline2"
              value={inputValue.addressline2}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="addressform-address-ca">
              <div className="addressform-address-city">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={inputValue.city}
                  onChange={(e) => handleInputChange(e)}
                />
                {click && !inputValue.city ? (
                  <p>This is a required field</p>
                ) : null}
              </div>
              <div className="addressform-address-country">
                <label>Country</label>
                <select
                  value={fromCountries}
                  onChange={(e) => handleFromCountries(e)}
                >
                  <option>Select Country</option>
                  {countryList.map((country, key) => (
                    <option key={key} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {click && !fromCountries ? (
                  <p>This is a required field</p>
                ) : null}
              </div>
            </div>
            <div className="addressform-address-state">
              <label>State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option>Select State</option>

                {formState.map((state, key) => (
                  <option key={key} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {click && (!selectedState || selectedState === "Select State") ? (
                <p>This is a required field</p>
              ) : null}
            </div>
          </div>
          <div className="addressform-phone">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={inputValue.phone}
              onChange={(e) => handleInputChange(e)}
            />
            {click && !inputValue.phone ? (
              <p>This is a required field</p>
            ) : null}
          </div>

          <div className="addressform-btn">
            {changeAddress ? (
              <button
                type="submit"
                className="addressform-btn-save"
                onClick={() => handleUpdateForm()}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="addressform-btn-save"
                onClick={() => handleFormSubmit()}
              >
                Save
              </button>
            )}

            {changeAddress ? (
              <button
                className="addressform-btn-cancel"
                onClick={() => handleBack()}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="addressform-btn-cancel"
                onClick={(e) => handleCancelChange(e)}
                disabled={inputValue ? false : true}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="addressform-savedaddress">
          {" "}
          <p>
            {address.firstname} {address.lastname}
          </p>
          <p>{address.addressline1}</p>
          <p>{address.addressline2}</p>
          <p>
            {address.city} , {address.selectedState}
          </p>
          <p>{address.fromCountries}</p>
          <p>{address.phone}</p>
          <div className="addressform-savedaddress-buttons">
            <button type="button" onClick={() => setChangeAddress(true)}>
              Edit Address
            </button>
            <button type="button" onClick={() => handleNext()}>
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddressForm;
