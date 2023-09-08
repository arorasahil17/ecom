import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogoutAC } from "../../../actions";

const AdminNav = () => {
  // const navBar = document.querySelector("nav"),
  //   menuBtns = document.querySelectorAll(".menu-icon"),
  //   overlay = document.querySelector(".overlay");

  // menuBtns.forEach((menuBtn) => {
  //   menuBtn.addEventListener("click", () => {
  //     navBar.classList.toggle("open");
  //   });
  // });

  // overlay.addEventListener("click", () => {
  //   navBar.classList.remove("open");
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log("click");
    dispatch(adminLogoutAC(navigate));
  };
  return (
    <>
      <nav className={`admin-nav ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <i className="bx bx-menu menu-icon" onClick={toggleMenu} />
          <span className="logo-name">Dashboard</span>
        </div>
        <div className="sidebar">
          <div className="logo">
            <i className="bx bx-menu menu-icon" onClick={closeMenu} />
            <span className="logo-name">Dashboard</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <Link to="/dashboard" className="nav-link">
                  <i className="bx bx-box icon" />
                  <span className="link">Add Product</span>
                </Link>
              </li>
              <li className="list">
                <Link to="/dashboard/products" className="nav-link">
                  <i className="bx bx-package icon" />
                  <span className="link">Products</span>
                </Link>
              </li>
              <li className="list">
                <Link to="/dashboard/orders" className="nav-link">
                  <i className="bx bx-cart icon" />
                  <span className="link">Orders</span>
                </Link>
              </li>
              <li className="list">
                <a href="#" className="nav-link" onClick={() => handleLogout()}>
                  <i className="bx bx-log-out icon" />
                  <span className="link">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
