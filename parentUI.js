import React, { useState, useEffect } from "react";
import axios from "axios";

const ParentDashboard = (registrationId) => {
  //const path = "https://localhost:7019/api/parents/" + registrationId;
  const [parentData, setParentData] = useState({
    StudentName: "",
    Address: "",
    EmailAddress: "",
  });

  useEffect(() => {
    const fetchData = () => {
      alert({ registrationId });
      axios
        .get(`https://localhost:7019/api/parents/${registrationId}`)
        .then((data) => setParentData(data.data))
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentData({
      ...parentData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Edit Parent Details</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="StudentName"
            value={parentData.StudentName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="EmailAddress"
            value={parentData.EmailAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={parentData.Address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ParentDashboard;
