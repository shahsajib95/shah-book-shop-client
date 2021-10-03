import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BiCartAlt } from "react-icons/bi";
import { DataContext } from "../../store/globaStore";

const NavBar = () => {
  const { state } = useContext(DataContext);
  const { cart, auth } = state;
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            SHAH BOOK
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
            <ul className="navbar-nav ms-auto gap-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {auth.user?.role !== "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/checkout">
                      <span className="fw-bold bg-color rounded-circle p-1">
                        {cart.length}
                      </span>
                      <BiCartAlt /> Checkout
                    </Link>
                  </li>
                </>
              )}
              {auth.user?.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-books">
                    Admin
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {auth.user ? (
                  <p className="nav-link">
                    {auth.user.name
                      ? auth.user.name
                      : auth.user.email.split("@")[0]}
                  </p>
                ) : (
                  <Link to="/login">
                    <button className="btn bg-color">Loign</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
