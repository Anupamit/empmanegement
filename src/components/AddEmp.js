import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddEmp.css";

const AddEmp = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      id,
      name,
      email,
      mobile: mobno, 
    };

    try {
      const response = await fetch("http://localhost:8000/employees");
      const data = await response.json();
      const updatedData = [...data, employeeData];
      await fetch("http://localhost:8000/employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      alert("Employee added successfully !");
      navigate("/listtable");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <div className="login">
        <h5>Add Employee Details</h5>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                required
                placeholder="Employee ID"
                className="text"
              />
            </div>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text"
                type="text"
                required
                placeholder="Employee Name"
              />
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text"
                type="email"
                required
                placeholder="Employee Email"
              />
            </div>
            <div>
              <input
                value={mobno}
                onChange={(e) => setMobno(e.target.value)}
                className="text"
                type="tel"
                required
                placeholder="Employee Mobile No."
              />
            </div>
            <button className="btn-a">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmp;
