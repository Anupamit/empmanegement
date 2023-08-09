import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddEmp.css";

const AddEmp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validateMobileNumber(mobno)
    ) {
      alert("Please enter valid data in all fields.");
      return;
    }

    const employeeData = {
      id: generateRandomID(),
      name,
      email,
      mobno,
    };

    try {
      await fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      alert("Employee added successfully!");
      navigate("/listtable");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const validateName = (value) => {
    return /^[A-Za-z]+$/.test(value);
  };

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value) && value.endsWith("@gmail.com");
  };

  const validateMobileNumber = (value) => {
    return /^\d{10}$/.test(value);
  };

  const generateRandomID = () => {
    return Math.floor(Math.random() * 100000);
  };

  return (
    <div>
      <div className="login">
        <h5>Add Employee Details</h5>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text"
                type="text"
                required
                placeholder="Employee Name (Only letters)"
              />
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text"
                type="email"
                required
                placeholder="Employee Email (e.g., example@gmail.com)"
              />
            </div>
            <div>
              <input
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
                className="text"
                type="tel"
                required
                placeholder="Employee Mobile No. (10 digits only)"
                maxLength={10}
              />
            </div>
            <button className="btnna">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmp;
