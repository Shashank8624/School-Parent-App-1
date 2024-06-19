import React, { useState } from "react";

import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/holidayList">Holiday List</NavLink>
        </li>
        <li>
          <NavLink to="/feeDetails">FeeDetails</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};

import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = ({ isLoggedIn, userType }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/holidayList">Holiday List</NavLink>
        </li>
        <li>
          <NavLink to="/feeDetails">FeeDetails</NavLink>
        </li>
        {isLoggedIn && userType === "Parents" && (
          <li>
            <NavLink to="/circular">Circular</NavLink>
          </li>
        )}
      </ul>
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};


ex - 2
// src/cmp/Navbar.js

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Function to determine if current page is ParentDashboard
  const isParentDashboard = location.pathname.includes("/ParentDashboard");

  return (
    <nav>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/holidayList" activeClassName="active">
            Holiday List
          </NavLink>
        </li>
        <li>
          <NavLink to="/feeDetails" activeClassName="active">
            FeeDetails
          </NavLink>
        </li>
        {isParentDashboard && ( // Only show "Circular" link on ParentDashboard page
          <li>
            <NavLink to="/circular" activeClassName="active">
              Circular
            </NavLink>
          </li>
        )}
      </ul>
      <ul>
        <li>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};