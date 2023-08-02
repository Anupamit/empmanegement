import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import AddEmp from "./components/AddEmp";
import Editemp from "./components/Editemp";
import ListTable from "./components/ListTable";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login handleLogin={handleLogin} />
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" />
          }
        />
        <Route
          path="/addemp"
          element={
            isAuthenticated ? <AddEmp /> : <Navigate to="/" />
          }
        />
        <Route
          path="/editemp"
          element={
            isAuthenticated ? <Editemp /> : <Navigate to="/" />
          }
        />
        <Route
          path="/listtable"
          element={
            isAuthenticated ? <ListTable /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
