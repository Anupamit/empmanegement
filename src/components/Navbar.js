import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar({ isAuthenticated, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/home";
  const isListPage = location.pathname === "/listtable";
  const isAddEmpPage = location.pathname === "/addemp";
  const isEditEmpPage = location.pathname === "/editemp";

  const showBackButton = !isHomePage;

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="combinenav">
      <div className="logo">
        <Link to="/home">Emp Management</Link>
      </div>
      <nav className="item">
        <ul>
          <li>
            <Link to={isListPage ? "/addemp" : "/listtable"}>
              {isListPage ? "Add Employee" : "List of Emp"}
            </Link>
          </li>
          <li>
            {showBackButton && (
              <Link to="#" onClick={() => window.history.back()}>
                Back
              </Link>
            )}
          </li>
          {isAuthenticated && (
            <li>
              <Link to="#" onClick={handleLogoutClick}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
