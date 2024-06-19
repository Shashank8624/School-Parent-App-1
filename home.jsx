import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";
// import Logo from "./logo234.png";

const slideImages =
  "https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1-750x325.jpg";

// const logoUrl =
//   "http://www.connectustech.com/wp-content/uploads/2021/01/connectusschool-app-for-parents.png";

export const Home = ({ setRegistrationId, registrationId }) => {
  //const [userType, setUserType] = useState("Staff");
  const [userType, setUserType] = useState("Parents");
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
    if (userType === "Parents") {
      try {
        const response = await axios.post(
          "https://localhost:7019/api/Auth/ParentLogin",
          loginData
        );
        if (response.status === 200) {
          setRegistrationId(response.data);

          // window.location.href = "/ParentDashboard";
          navigate("/ParentDashboard");
          //console.log("Login successful:", response.data);
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
          {/* <MyLogo /> */}
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



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar"; // Import Navbar component
import "./Home.css";

export const Home = ({ setRegistrationId, registrationId }) => {
  const [userType, setUserType] = useState("Parents");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Rest of your code...

  const handleLogin = async () => {
    if (userType === "Parents") {
      try {
        const response = await axios.post(
          "https://localhost:7019/api/Auth/ParentLogin",
          loginData
        );
        if (response.status === 200) {
          setRegistrationId(response.data);
          setIsLoggedIn(true); // Update login status

          navigate("/ParentDashboard");
          console.log("Login successful:", registrationId);
        }
      } catch (error) {
        console.error("Login Failed", error.response?.data || error.message);
        alert("Invalid RegistrationId or Password");
      }
    } else if (userType === "Staff") {
      // Handle staff login...
    }
  };

  // Rest of your Home component...

  return (
    <>
      {/* Render Navbar and pass isLoggedIn and userType props */}
      <Navbar isLoggedIn={isLoggedIn} userType={userType} />

      {/* Your existing JSX for Home component... */}
    </>
  );
};