// AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useAuth } from './AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout, userType } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/circular">
              Circular
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/holidayList">
              Holiday List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/feeDetails">
              Fee Details
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <span className="nav-link">{userType}</span>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};