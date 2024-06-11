import React, { useState } from "react";
import axios from "axios";
import "./CreateNewCircular.css";

export default function CreateNewCircular() {
  const [formData, setFormData] = useState({
    NotificationDate: "",
    InformationText: "",
    NotificationPostedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7019/api/Circulars/",
        formData
      );

      console.log(response.data);
      alert(`Circular is created`);
    } catch (error) {
      console.error("Circular Failed", error.response?.data || error.message);
      alert("There was an error creating the circular!");
    }
  };

  return (
    <>
      <div className="circular-main-container">
        <div className="create-new-circular-container">
          <h1>Create new Circular</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main-text-circular-container">
            <div className="Circular-text">
              <input
                type="textarea"
                name="InformationText"
                value={formData.InformationText}
                onChange={handleChange}
                placeholder="Write your circular"
              />
            </div>
            <br></br>
            <div className="circular-bottom">
              <div className="clr-poasted-by">
                <input
                  type="text"
                  name="NotificationPostedBy"
                  value={formData.NotificationPostedBy}
                  onChange={handleChange}
                  placeholder="Staff Name"
                />
              </div>
              <div className="posted-date ">
                <input
                  type="Date"
                  name="NotificationDate"
                  value={formData.NotificationDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="submit-circular">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
