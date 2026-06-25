import React from "react";
import { Link } from "react-router-dom";
// to display the application name and the navigation links
const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Task List</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
