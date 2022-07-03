import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.scss";

const Header = () => {
  return (
    <div className="header">
      {/* // <div> */}
      <h1>File Upload And Download</h1>
      <nav>
        <NavLink activeClassName="active" to="/uploadDocuments" exact={true}>
          Upload
        </NavLink>
        <NavLink activeClassName="active" to="/documentlist">
          Files List
        </NavLink>
        <NavLink activeClassName="active" to="/adminPage">
          Admin Page
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
