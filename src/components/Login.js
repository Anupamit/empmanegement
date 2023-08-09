import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Adminlogin.css";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "12345") {
      handleLogin();
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <div className="login">
        <h5>Login</h5>
        <div>
          <form onSubmit={login}>
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email admin@gmail.com"
                className="text"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password 12345"
                className="text"
              />
            </div>
            <button className="btnna">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
