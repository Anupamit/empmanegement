import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ListTable.css";
import Pagination from "./Pagination";

const ListTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/employees");
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
      const updatedData = users.filter((user) => user.id !== id);
      await fetch(`http://localhost:8000/employees/${id}`, {
        method: "DELETE",
      });
      setUsers(updatedData);
      alert(`${name} has been deleted permanently`);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const editUser = (id) => {
    navigate(`/editemp?id=${id}`);
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    const searchLower = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.mobno.toLowerCase().includes(searchLower)
    );
  }, [users, searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="center-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or mobile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
          {currentUsers.map((detail) => (
            <tr key={detail.id}>
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
                <button className="btn1" onClick={() => editUser(detail.id)}>
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
              <td>{detail.mobno}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListTable;
