import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Student ID: numbers only, maximum 8 digits
    if (name === "studentId") {
      value = value.replace(/\D/g, "").slice(0, 8);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const users =
    JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

  const userIndex = users.findIndex(
    (account) =>
      account.studentId === formData.studentId &&
      account.password === formData.password
  );

  if (userIndex === -1) {
    alert("Invalid Student ID or password.");
    return;
  }

  // Get the student's account
  const user = users[userIndex];

  // Prepare trial and subscription information
  const updatedUser = {
    ...user,
    trialUsed: user.trialUsed ?? false,
    trialStart: user.trialStart ?? null,
    subscriptionActive: user.subscriptionActive ?? false,
    subscriptionExpiry: user.subscriptionExpiry ?? null,
  };

  // Save updated account information
  users[userIndex] = updatedUser;

  localStorage.setItem(
    "studyvaultUsers",
    JSON.stringify(users)
  );

  // Save logged-in session
  sessionStorage.setItem(
    "studyvaultLoggedIn",
    JSON.stringify(updatedUser)
  );

  sessionStorage.setItem(
    "studyvaultLoginTime",
    Date.now().toString()
  );

  alert(`Welcome, ${updatedUser.fullName}!`);

  window.location.href = "/";
};

  return (
    <div className="login-page">

      {/* HOME BUTTON */}
      <a href="/" className="login-home-button">
        <svg
          viewBox="0 0 24 24"
          className="login-home-icon"
        >
          <path
            d="M3 10.5L12 3l9 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M5 9.5V21h14V9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9 21v-6h6v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Home</span>
      </a>

      {/* HEADER */}
      <div className="login-header">
        <h1>LOGIN</h1>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">

        <form onSubmit={handleSubmit}>

          {/* STUDENT ID */}
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={8}
            required
          />

          {/* PASSWORD */}
          <div className="login-password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="login-eye-button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  className="login-eye-icon"
                >
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="login-eye-icon"
                >
                  <path
                    d="M3 3l18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <path
                    d="M10.6 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.1 4.1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <path
                    d="M6.1 6.1C3.5 8.1 2 12 2 12s3.5 7 10 7c1.8 0 3.3-.4 4.6-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>

          </div>

          {/* FORGOT PASSWORD */}
          <div className="forgot-password">
            <a href="/forgot-password">
              Forgot Password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        {/* REGISTER */}
        <div className="register-section">

          <p>
            Don't have an account?
          </p>

          <a
            href="/register"
            className="register-button"
          >
            Register
          </a>

        </div>

      </div>

    </div>
  );
}

export default Login;