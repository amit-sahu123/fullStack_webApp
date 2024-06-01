import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../../context/AuthContext';
const LoginComponent = () => {
  const [user, setUser] = useState(null);
  const router = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password }
      );
      setUser(response.data.user);
      if (response.status === 200) {
        router("/");
      }
      const responseData = JSON.stringify(response.data.user);
      localStorage.setItem("userInfo", JSON.stringify(responseData));
      localStorage.setItem("token", response.data.token); // Save the token in local storage
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Redirect to the properties page after login
    } catch (error) {
      console.log("error in login :", error);
    }
  };
  return (
    <div
      style={{
        minHeight: "90vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          minHeight: "300px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          border: "1px solid gray",
          borderRadius: "10px",
          boxShadow: "1px 5px 10px 4px gray",
        }}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p style={{ textAlign: "center", width: "80%", color: "#1687d9" }}>
          New to Rentify, Please{" "}
          <Link to="/register" style={{ color: "brown", fontWeight: "bold" }}>
            {" "}
            <u> Click Here </u>{" "}
          </Link>{" "}
          Register your self !
        </p>
      </form>
    </div>
  );
};

export default LoginComponent;
