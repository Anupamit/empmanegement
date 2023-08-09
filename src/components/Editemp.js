import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    mobno: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employees/${id}`);
        const data = await response.json();
        setEditedData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:8000/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      alert("Employee data updated successfully");
      navigate("/listtable");
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  return (
    <div>
      <div className="login">
        <h5>Edit Employee Details</h5>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="text"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="text"
              name="email"
              value={editedData.email}
              onChange={handleInputChange}
            />

            <input
              name="mobno"
              className="text"
              type="tel"
              value={editedData.mobno}
              onChange={handleInputChange}
            />
            <button className="btnna" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
