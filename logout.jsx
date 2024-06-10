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


// Home.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import "./Home.css";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

export const Home = ({ setRegistrationId, registrationId }) => {
  const [userType, setUserType] = useState("Parents");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    RegistrationId: "",
    Password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (userType === "Parents") {
      try {
        const response = await axios.post(
          "https://localhost:7019/api/Auth/ParentLogin",
          loginData
        );
        if (response.status === 200) {
          setRegistrationId(response.data);
          login(userType);
          navigate("/ParentDashboard");
          console.log("Login successful:", registrationId);
        }
      } catch (error) {
        console.error("Login Failed", error.response?.data || error.message);
        alert("Invalid RegistrationId or Password");
      }
    } else if (userType === "Staff") {
      try {
        const response = await axios.get("/users.json");
        const users = response.data;
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          login(userType);
          navigate("/StaffDashboard");
        } else {
          alert("Invalid credentials for Staff");
        }
      } catch (error) {
        console.error("Error fetching users.json:", error);
      }
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src="/logo234.png" width="100" height="100" alt="Logo" />
        </div>
        <div className="school-name">
          <h1 className="heading-title">School Parent App</h1>
        </div>
      </div>
      <div className="main-page-container">
        <div className="slide-container">
          <img src={slideImages} alt="slide" />
        </div>
        <div className="main-container">
          <div className="login-container">
            <h2>Login Form</h2>

            {userType === "Parents" ? (
              <div>
                <label>Registration Id</label>
                <input
                  type="text"
                  name="RegistrationId"
                  placeholder="Registration ID"
                  value={loginData.RegistrationId}
                  onChange={handleChange}
                />
                <label>Password</label>
                <input
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={loginData.Password}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Parents"
                  checked={userType === "Parents"}
                  onChange={() => setUserType("Parents")}
                />
                Parents
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Staff"
                  checked={userType === "Staff"}
                  onChange={() => setUserType("Staff")}
                />
                Staff
              </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            <div className="footer">
              <p>
                don't have an account ?
                <Link to="/Register" className="register-footer">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Can't resolve './AuthContext' in 'C:\School App\school-app\src\cmp'
