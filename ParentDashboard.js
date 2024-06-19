import React, { useState, useEffect } from "react";
import axios from "axios";


const ParentDashboard = ({ registrationId }) => {
  const path = "https://localhost:7019/api/parents/" + registrationId;
  const [parentData, setParentData] = useState({
    parentId: "",
    parentName: "",
    studentName: "",
    studentRegisterNumber: "",
    registrationId: "",
    address: "",
    state: "",
    country: "",
    city: "",
    zipCode: "",
    emailAddress: "",
    primaryContactPerson: "",
    primaryContactPersonMobile: "",
    secondaryContactPerson: "",
    secondaryContactPersonMobile: "",
    password: "",
    setPassword: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);

  const countryStateData = {
    USA: ["California", "Florida", "New York"],
    Canada: ["Alberta", "British", "Columbia"],
    India: ["Delhi", "Maharashtra"],
  };

  const validate = () => {
    let errors = {};

    if (!parentData.parentName.match(/^[A-Za-z ]+$/)) {
      errors.parentName =
        "Parent Name should contain only alphabets and spaces";
    }
    if (!parentData.studentName.match(/^[A-Za-z ]+$/)) {
      errors.studentName =
        "Student Name should contain only alphabets and spaces";
    }
    if (!parentData.studentRegisterNumber.match(/^R-\d{3}$/)) {
      errors.studentRegisterNumber =
        'Student Register Number should be in the format "R-XXX"';
    }
    if (!parentData.zipCode.match(/^\d{6}$/)) {
      errors.zipCode = "Zip Code should be 6 digits";
    }
    if (!parentData.city.match(/^[A-Za-z]+$/)) {
      errors.city = "City should contain only alphabets";
    }
    if (!parentData.primaryContactPersonMobile.match(/^\d{10}$/)) {
      errors.primaryContactPersonMobile =
        "Primary Contact Person Mobile should be 10 digits";
    }
    if (
      parentData.secondaryContactPersonMobile &&
      !parentData.secondaryContactPersonMobile.match(/^\d{10}$/)
    ) {
      errors.secondaryContactPersonMobile =
        "Secondary Contact Person Mobile should be 10 digits";
    }
    if (!parentData.emailAddress.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.emailAddress = "Invalid Email Address";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(path)
        .then((data) => {
          setParentData(data.data);
          setStates(countryStateData[data.data.country] || []);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, [path]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setStates(countryStateData[value] || []);
      setParentData((prevData) => ({
        ...prevData,
        country: value,
        state: "", 
      }));
    } else {
      setParentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.put(
          `https://localhost:7019/api/Parents/${registrationId}`,
          parentData
        );
        alert("Data updated successfully");
      } catch (err) {
        alert("Error updating data");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Parent Details</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="parentName">Parent Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={parentData.parentName}
              onChange={handleChange}
              placeholder="Parent Name"
              className="form-input"
            />
            {errors.parentName && (
              <div className="error">{errors.parentName}</div>
            )}
          </div>
          <div className="form-group half-width">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={parentData.studentName}
              onChange={handleChange}
              placeholder="Student Name"
              className="form-input"
            />
            {errors.studentName && (
              <div className="error">{errors.studentName}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="studentRegisterNumber">
              Student Register Number
            </label>
            <input
              type="text"
              id="studentRegisterNumber"
              name="studentRegisterNumber"
              value={parentData.studentRegisterNumber}
              readOnly
              onChange={handleChange}
              placeholder="Student Register Number"
              className="form-input"
            />
            {errors.studentRegisterNumber && (
              <div className="error">{errors.studentRegisterNumber}</div>
            )}
          </div>
          <div className="form-group half-width">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={parentData.emailAddress}
              onChange={handleChange}
              placeholder="Email Address"
              className="form-input"
            />
            {errors.emailAddress && (
              <div className="error">{errors.emailAddress}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <label className="address-title" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={parentData.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-input full-widths"
          />
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={parentData.city}
              onChange={handleChange}
              placeholder="City"
              className="form-input"
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={parentData.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="form-input"
            />
            {errors.zipCode && <div className="error">{errors.zipCode}</div>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={parentData.country}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Country</option>
              {Object.keys(countryStateData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group half-width">
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={parentData.state}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="primaryContactPerson">Primary Contact Person</label>
            <input
              type="text"
              id="primaryContactPerson"
              name="primaryContactPerson"
              value={parentData.primaryContactPerson}
              onChange={handleChange}
              placeholder="Primary Contact Person"
              className="form-input"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="primaryContactPersonMobile">
              Primary Contact Person No.
            </label>
            <input
              type="text"
              id="primaryContactPersonMobile"
              name="primaryContactPersonMobile"
              value={parentData.primaryContactPersonMobile}
              onChange={handleChange}
              placeholder="Primary Contact Person Mobile"
              className="form-input"
            />
            {errors.primaryContactPersonMobile && (
              <div className="error">{errors.primaryContactPersonMobile}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="secondaryContactPerson">
              Secondary Contact Person
            </label>
            <input
              type="text"
              id="secondaryContactPerson"
              name="secondaryContactPerson"
              value={parentData.secondaryContactPerson}
              onChange={handleChange}
              placeholder="Secondary Contact Person"
              className="form-input"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="secondaryContactPersonMobile">
              Secondary Contact Person No.
            </label>
            <input
              type="text"
              id="secondaryContactPersonMobile"
              name="secondaryContactPersonMobile"
              value={parentData.secondaryContactPersonMobile}
              onChange={handleChange}
              placeholder="Secondary Contact Person Mobile"
              className="form-input"
            />
            {errors.secondaryContactPersonMobile && (
              <div className="error">{errors.secondaryContactPersonMobile}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={parentData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="setPassword">Set Password</label>
            <input
              type="password"
              id="setPassword"
              name="setPassword"
              value={parentData.setPassword}
              onChange={handleChange}
              placeholder="Set Password"
              className="form-input"
            />
            {errors.primaryContactPersonMobile && (
              <div className="error">{errors.primaryContactPersonMobile}</div>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={parentData.status}
              onChange={handleChange}
              placeholder="Status"
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="form-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentDashboard;



ex - 01

// src/cmp/pages/ParentDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"; // Assuming Navbar component is exported as default
import "./ParentDashboard.css";

const ParentDashboard = ({ registrationId }) => {
  const path = "https://localhost:7019/api/parents/" + registrationId;
  const [parentData, setParentData] = useState({
    // Your state variables
  });
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(path);
        setParentData(response.data);
        const country = response.data.country;
        setStates(countryStateData[country] || []);
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    fetchData();
  }, [path]);

  // Rest of your component code...

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <div className="parent-dashboard-container">
        {/* Your existing ParentDashboard content */}
      </div>
    </>
  );
};

export default ParentDashboard;


ex-02
// src/cmp/pages/ParentDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ParentDashboard.css";

const ParentDashboard = ({ registrationId }) => {
  const path = "https://localhost:7019/api/parents/" + registrationId;
  const [parentData, setParentData] = useState({
    // Your state variables
  });
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(path);
        setParentData(response.data);
        const country = response.data.country;
        setStates(countryStateData[country] || []);
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    fetchData();
  }, [path]);

  // Rest of your component code...

  return (
    <div className="parent-dashboard-container">
      {/* Your existing ParentDashboard content */}
    </div>
  );
};

export default ParentDashboard;
