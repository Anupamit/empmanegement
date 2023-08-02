import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ListTable.css";

const ListTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("path/to/employees.json");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleDelete = async (id, name) => {
    try {
      const response = await fetch("http://localhost:8000/employees");
      const data = await response.json();
      const updatedData = data.filter((user) => user.id !== id);
      await fetch("http://localhost:8000/employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      alert(`${name} will be deleted permanently`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const editUser = async (event, i, detailData) => {
    navigate(`/editemp?id=${detailData.id}&name=${detailData.name}`);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Update</th>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
          </tr>
        </thead>
        <tbody>
          {users.map((detail, i) => (
            <tr key={i}>
              <td>
                <button
                  className="btn1"
                  onClick={() => handleDelete(detail.id, detail.name)}
                >
                  <img
                    style={{ width: "25px", height: "20px" }}
                    src="https://cdn.icon-icons.com/icons2/692/PNG/512/seo-social-web-network-internet_262_icon-icons.com_61518.png"
                    alt="delete"
                  />
                </button>
              </td>
              <td>
                <button
                  className="btn1"
                  onClick={(event) => editUser(event, i, detail)}
                >
                  <img
                    style={{ width: "25px", height: "20px" }}
                    src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-autorenew_90718.png"
                    alt="edit"
                  />
                </button>
              </td>
              <td>{detail.id}</td>
              <td>{detail.name}</td>
              <td>{detail.email}</td>
              <td>{detail.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
