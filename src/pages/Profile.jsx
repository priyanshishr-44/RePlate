
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const userData =
    localStorage.getItem("replate_user") ||
    sessionStorage.getItem("replate_user");

  const user = userData ? JSON.parse(userData) : {};

  const handleLogout = () => {
    localStorage.removeItem("replate_token");
    localStorage.removeItem("replate_user");
    sessionStorage.removeItem("replate_token");
    sessionStorage.removeItem("replate_user");
    navigate("/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f8f3",
      padding: "35px",
      fontFamily: "Arial, sans-serif"
    }}>
      <Link
        to="/dashboard"
        style={{
          color: "#347a48",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        ← Back to Dashboard
      </Link>

      <div style={{
        maxWidth: "650px",
        margin: "35px auto",
        background: "white",
        padding: "35px",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
      }}>
        <h1 style={{ color: "#173b2a" }}>My Profile</h1>
        <p style={{ color: "#718075" }}>
          View your account information
        </p>

        <div style={{
          width: "85px",
          height: "85px",
          borderRadius: "50%",
          background: "#e5f3e7",
          color: "#347a48",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "35px",
          fontWeight: "bold",
          margin: "25px 0"
        }}>
          {(user.name || "U").charAt(0).toUpperCase()}
        </div>

        <div style={{ marginBottom: "22px" }}>
          <p style={{ color: "#718075" }}>Full Name</p>
          <h3>{user.name || "Not available"}</h3>
        </div>

        <div style={{ marginBottom: "22px" }}>
          <p style={{ color: "#718075" }}>Email Address</p>
          <h3>{user.email || "Not available"}</h3>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <p style={{ color: "#718075" }}>Account Role</p>
          <h3>{user.role || "User"}</h3>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#347a48",
            color: "white",
            border: "none",
            padding: "13px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
