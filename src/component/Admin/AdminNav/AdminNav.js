/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BiGridAlt, BiFolderPlus } from "react-icons/bi";
import "./AdminNav.css";
import { DataContext } from "../../../store/globaStore";

const AdminNav = () => {
  const { state } = useContext(DataContext);
  const { auth } = state;
  return (
    auth.user?.role === "admin" && (
      <>
        <div className="border-end admin-nav bg-color">
          <div className="sidebar-heading text-white text-center fw-bold my-3">
            <h4>SHAH BOOK</h4>
          </div>
          <div className="list-group list-group-flush text-white">
            <Link
              to="/admin/manage-books"
              className="p-3 d-flex  align-items-center"
            >
              <BiGridAlt /> <span className="ms-3">Manage Books</span>
            </Link>
            <Link
              to="/admin/add-books"
              className="p-3 d-flex  align-items-center"
            >
              <BiFolderPlus /> <span className="ms-3">Add Books</span>
            </Link>
            {/* <Link
              to="/admin/edit-books"
              className="p-3 d-flex  align-items-center"
            >
              <BiMessageEdit />
              <span className="ms-3">Edit Books</span>
            </Link> */}
          </div>
        </div>
      </>
    )
  );
};

export default AdminNav;
