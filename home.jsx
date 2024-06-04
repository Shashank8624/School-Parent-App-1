import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

const logoUrl =
  "http://www.connectustech.com/wp-content/uploads/2021/01/connectusschool-app-for-parents.png";

export const Home = () => {
  const [userType, setUserType] = useState("Staff");
  //const [userType, setUserType] = useState("Parents");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [registrationId, setRegistrationId] = useState("");
  const navigate = useNavigate();

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
    if (userType === "Staff") {
      try {
        const response = await axios.get("/users.json");
        const users = response.data;
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          navigate("/StaffDashboard");
        } else {
          alert("Invalid credentials for Staff");
        }
      } catch (error) {
        console.error("Error fetching users.json:", error);
      }
    } else if (userType === "Parents") {
      try {
        const response = await axios.post(
          "https://localhost:7019/api/Auth/ParentLogin",
          loginData
        );
        console.log("Login successful:", response.data);
        alert("Login successful");
      } catch (error) {
        console.error("Login Failed", error.response?.data || error.message);
        alert("Invalid RegistrationId or Password");
      }
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src={logoUrl} width="100" height="100" alt="Logo" />
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

            {userType === "Staff" ? (
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
            ) : (
              <div>
                <label>Registration Id</label>
                <input
                  type="text"
                  placeholder="Registration ID"
                  value={loginData.RegistrationId}
                  onChange={handleChange}
                  // onChange={(e) => setRegistrationId(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.Password}
                  onChange={handleChange}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Staff"
                  checked={userType === "Staff"}
                  onChange={() => setUserType("Staff")}
                />
                Staff
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Parents"
                  checked={userType === "Parents"}
                  onChange={() => setUserType("Parents")}
                />
                Parents
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


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

const logoUrl =
  "http://www.connectustech.com/wp-content/uploads/2021/01/connectusschool-app-for-parents.png";

export const Home = () => {
  const [userType, setUserType] = useState("Staff");
  //const [userType, setUserType] = useState("Parents");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [registrationId, setRegistrationId] = useState("");
  const navigate = useNavigate();

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
    if (userType === "Staff") {
      try {
        const response = await axios.get("/users.json");
        const users = response.data;
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          navigate("/StaffDashboard");
        } else {
          alert("Invalid credentials for Staff");
        }
      } catch (error) {
        console.error("Error fetching users.json:", error);
      }
    } else if (userType === "Parents") {
      try {
        const response = await axios.post(
          "https://localhost:7019/api/Auth/ParentLogin",
          loginData
        );
        console.log("Login successful:", response.data);
        alert("Login successful");
      } catch (error) {
        console.error("Login Failed", error.response?.data || error.message);
        alert("Invalid RegistrationId or Password");
      }
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <img src={logoUrl} width="100" height="100" alt="Logo" />
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

            {userType === "Staff" ? (
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
            ) : (
              <div>
                <label>Registration Id</label>
                <input
                  type="text"
                  name="RegistrationId" // Add name attribute
                  placeholder="Registration ID"
                  value={loginData.RegistrationId}
                  onChange={handleChange}
                />
                <label>Password</label>
                <input
                  type="password"
                  name="Password" // Add name attribute
                  placeholder="Password"
                  value={loginData.Password}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Staff"
                  checked={userType === "Staff"}
                  onChange={() => setUserType("Staff")}
                />
                Staff
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="Parents"
                  checked={userType === "Parents"}
                  onChange={() => setUserType("Parents")}
                />
                Parents
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