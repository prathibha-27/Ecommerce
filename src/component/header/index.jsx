// import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <h1>
        <Link className="header-nav-link" to="/">
          Ajio
        </Link>
      </h1>
      <nav className="header-nav">
        <Link className="header-nav-link" to="/">
          Home
        </Link>{" "}
        |{" "}
        <Link className="header-nav-link" to="/productlist">
          Products
        </Link>{" "}
        |{" "}
        <Link className="header-nav-link" to="/about">
          About
        </Link>
      </nav>
    </div>
  );
}

export default Header;
