import { Link } from "react-router-dom";
import Search from "../search";

function Header() {
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
            Home
          </Link>{" "}
          |{" "}
          <Link className="header-head-nav-link" to="/productlist">
            Products
          </Link>{" "}
          |{" "}
          <Link className="header-head-nav-link" to="/cart">
            My Cart
          </Link>
        </nav>

        <Search />
      </div>
    </div>
  );
}

export default Header;
