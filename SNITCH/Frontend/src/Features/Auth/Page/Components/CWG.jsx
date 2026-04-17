import React from "react";

const CWG = () => {
  return (
    <a
      href="/api/auth/google"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "100%",
        padding: "10px 15px",
        border: "1px solid #dadce0",
        borderRadius: "6px",
        backgroundColor: "#fff",
        color: "#3c4043",
        fontWeight: "500",
        fontSize: "14px",
        textDecoration: "none",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "#f7f8f8")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "#fff")
      }
    >
      {/* Google Logo */}
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: "18px", height: "18px" }}
      />

      Continue with Google
    </a>
  );
};

export default CWG;