import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAC } from "../actions";
import "./App.css";
const Nav = ({ cartCount, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top z-index">
        <div className="container-fluid">
          <Link className="navbar-brand py-3" to="/">
            <img
              src="images/Logo_shop.png"
              alt="Bootstrap"
              width="150"
              height="32"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="google.com">
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="google"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Clothing
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Accessories
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Shirts
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Shoes
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Watches
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Subscribe
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Partners
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Shipment
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="google"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign Up
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        dispatch(logoutAC(navigate));
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
              {user ? (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Hi, {user.name}
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Hi, Guest
                  </a>
                </li>
              )}
            </ul>
            <div className="d-flex icon-cont">
              <i className="fa fa-magnifying-glass nav-icon"></i>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping nav-icon cart-nav">
                  <span className="cart-badge">{cartCount}</span>
                </i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Nav;
