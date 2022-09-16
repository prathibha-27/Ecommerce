import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DISPLAY_MINICART } from "../../redux/actions";
import MiniCart from "../minicart";
import Search from "../search";

function Header() {
  const cartItems = useSelector((state) => state.cart);
  const minicart = useSelector((state) => state.minicart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  let menuRef = useRef(null);

  useEffect(() => {
    let itemcount = 0;
    cartItems.map((item) => {
      itemcount = itemcount + parseInt(item.qty);
    });
    setCount(itemcount);
  }, [cartItems]);

  let handler = (event) => {
    if (menuRef.current && !menuRef.current?.contains(event.target)) {
      dispatch(DISPLAY_MINICART(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
  }, []);

  const handleMinicart = () => {
    dispatch(DISPLAY_MINICART(!minicart));
  };
  return (
    <div className="header">
      <h1>
        <Link className="header-head-nav-link" to="/">
          Ajio
        </Link>
      </h1>
      <div className="header-head-nav">
        <nav className="header-head-nav">
          <Link className="header-head-nav-link" to="/">
            Home {"  "}
          </Link>{" "}
          |{" "}
          <Link className="header-head-nav-link" to="/productlist">
            Products
          </Link>{" "}
        </nav>

        <div className="header-head-nav-actions">
          <Search />
          <div className="header-head-nav-actions-minicart" ref={menuRef}>
            <div
              className="header-head-nav-actions-minicart-icon"
              onClick={() => handleMinicart()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
            </div>
            <div className="header-head-nav-actions-minicart-itemcount">
              <span>{count}</span>
            </div>
          </div>
          {minicart ? <MiniCart /> : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
