import "./GetAllStudents.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetAllStudents() {
  const path = "https://localhost:7019/api/parents/";
  const [parentData, setParentData] = useState([]);
  //const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(path)
        .then((data) => setParentData(data.data))
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);
  const handleAccept = (parentId) => {
    axios
      .post(`https://localhost:7019/api/Staffs/approve/${parentId}`)
      .then(() => {
        setParentData(
          parentData.map((parent) =>
            parent.parentId === parentId
              ? {
                  ...parent,
                  status: "Accepted",
                }
              : parent
          )
        );
      })
      .catch((error) => {
        console.error("There was an error accepting data!", error);
      });
  };
  const handleReject = (parentId) => {
    axios
      .post(`https://localhost:7019/api/Staffs/Reject/${parentId}`)
      .then(() => {
        setParentData(
          parentData.map((parent) =>
            parent.parentId === parentId
              ? {
                  ...parent,
                  status: "Rejected",
                }
              : parent
          )
        );
      })
      .catch((error) => {
        console.error("There was an error rejecting data!", error);
      });
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>parentId</th>
            <th>parentName</th>
            <th>studentName</th>
            <th>studentRegisterNumber</th>
            <th>registrationId</th>
            <th>address </th>
            <th>state</th>
            <th>country</th>
            <th>city</th>
            <th>zipCode</th>
            <th>emailAddress</th>
            <th>primaryContactPerson</th>
            <th>primaryContactPersonMobile</th>
            <th>secondaryContactPerson</th>
            <th>secondaryContactPersonMobile</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {parentData.map((parent) => (
            <tr key={parent.parentId}>
              <td>{parent.parentId}</td>
              <td>{parent.parentName}</td>
              <td>{parent.studentName}</td>
              <td>{parent.studentRegisterNumber}</td>
              <td>{parent.registrationId}</td>
              <td>{parent.address}</td>
              <td>{parent.state}</td>
              <td>{parent.country}</td>
              <td>{parent.city}</td>
              <td>{parent.zipCode}</td>
              <td>{parent.emailAddress}</td>
              <td>{parent.primaryContactPerson}</td>
              <td>{parent.primaryContactPersonMobile}</td>
              <td>{parent.secondaryContactPerson}</td>
              <td>{parent.secondaryContactPersonMobile}</td>
              <td>{parent.status}</td>
              <td>
                <button onClick={() => handleAccept(parent.parentId)}>
                  Accept
                </button>
                <button onClick={() => handleReject(parent.parentId)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
