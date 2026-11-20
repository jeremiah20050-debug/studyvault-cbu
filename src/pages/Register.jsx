import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    programme: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // STUDENT ID: numbers only, maximum 8 digits
    if (name === "studentId") {
      value = value.replace(/\D/g, "").slice(0, 8);
    }

    // PHONE NUMBER: numbers only, maximum 10 digits
    if (name === "phoneNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // STUDENT ID VALIDATION
  // =========================

  const studentId = formData.studentId;

  const validStudentYears = [
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
  ];

  const studentIdIsInvalid =
    studentId.length > 0 &&
    (
      studentId.length !== 8 ||
      !validStudentYears.includes(studentId.substring(0, 2))
    );

  // =========================
  // PHONE VALIDATION
  // =========================

  const phone = formData.phoneNumber;

  const phoneIsInvalid =
    phone.length > 0 &&
    (
      phone.length !== 10 ||
      phone[0] !== "0" ||
      (phone.length >= 2 &&
        !["7", "5", "9"].includes(phone[1])) ||
      (phone.length >= 3 &&
        !["7", "6"].includes(phone[2]))
    );

  // =========================
  // PASSWORD VALIDATION
  // =========================

  const password = formData.password;

  const passwordRequirements = {
    length: password.length >= 9,
    number: /\d/.test(password),
    capital: /[A-Z]/.test(password),
    special: /[!@#$%^&*()?/+=~`;:\\_\-"' ,<>.]/.test(password),
  };

  const passwordScore = Object.values(passwordRequirements).filter(
    Boolean
  ).length;

  const passwordIsStrong = passwordScore === 4;

  const passwordIsInvalid =
    password.length > 0 && !passwordIsStrong;

  const confirmPasswordIsInvalid =
    formData.confirmPassword !== "" &&
    formData.password !== formData.confirmPassword;

  // =========================
  // PASSWORD STRENGTH
  // =========================

  let strengthText = "";
  let strengthClass = "";
  let progressWidth = "0%";

  if (passwordScore === 0 || passwordScore === 1) {
    strengthText = "Too weak";
    strengthClass = "weak";
    progressWidth = passwordScore === 0 ? "8%" : "25%";
  } else if (passwordScore === 2) {
    strengthText = "Fair, but not strong enough";
    strengthClass = "fair";
    progressWidth = "50%";
  } else if (passwordScore === 3) {
    strengthText = "Almost strong";
    strengthClass = "almost";
    progressWidth = "75%";
  } else if (passwordScore === 4) {
    strengthText = "Strong";
    strengthClass = "strong";
    progressWidth = "100%";
  }

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Student ID
    if (studentId.length !== 8) {
      alert("Student ID must be exactly 8 digits.");
      return;
    }

    if (studentIdIsInvalid) {
      alert(
        "Student ID must start with a valid year from 2018 to 2026."
      );
      return;
    }

    // Phone
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (phoneIsInvalid) {
      alert("Invalid phone number.");
      return;
    }

    // Password
    if (!passwordIsStrong) {
      alert(
        "Password must have at least 9 characters, one number, one capital letter, and one special character."
      );
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    const studentExists = existingUsers.some(
      (user) => user.studentId === formData.studentId
    );

    if (studentExists) {
      alert("An account with this Student ID already exists.");
      return;
    }

    // Create user
    const newUser = {
  fullName: formData.fullName,
  studentId: formData.studentId,
  phoneNumber: formData.phoneNumber,
  password: formData.password,
  programme: formData.programme,

  // Free trial has NOT been started yet
  trialUsed: false,
  trialStart: null,

  // No subscription yet
  subscriptionStatus: "none",
  subscriptionStartDate: null,
  subscriptionEndDate: null,
};

    localStorage.setItem(
      "studyvaultUsers",
      JSON.stringify([...existingUsers, newUser])
    );

    alert("Account created successfully!");

    window.location.href = "/login";
  };

  return (
    <div className="register-page">

  <a href="/" className="register-home-button">
    <svg
      viewBox="0 0 24 24"
      className="register-home-icon"
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

  <div className="register-header">
        <h1>CREATE ACCOUNT</h1>
      </div>

      <div className="register-card">

        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          {/* STUDENT ID */}
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={8}
            pattern="(18|19|20|21|22|23|24|25|26)[0-9]{6}"
            className={studentIdIsInvalid ? "phone-invalid" : ""}
            required
          />

          {/* PHONE NUMBER */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={phoneIsInvalid ? "phone-invalid" : ""}
            required
          />

          {/* PASSWORD */}
          <div className="password-wrapper">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={passwordIsInvalid ? "password-invalid" : ""}
              required
            />

            <button
              type="button"
              className="eye-button"
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
                  className="eye-icon"
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
                  className="eye-icon"
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

          {/* PASSWORD STRENGTH */}
          {password !== "" && (
            <div className="password-strength">

              <div className="strength-bar">
                <div
                  className={`strength-fill ${strengthClass}`}
                  style={{ width: progressWidth }}
                ></div>
              </div>

              <p className={`strength-text ${strengthClass}`}>
                {strengthText}
              </p>

              <div className="password-requirements">

                <div
                  className={
                    passwordRequirements.length
                      ? "requirement completed"
                      : "requirement"
                  }
                >
                  <span>1. At least 9 characters</span>

                  {passwordRequirements.length && (
                    <span className="requirement-check">
                      ✓
                    </span>
                  )}
                </div>

                <div
                  className={
                    passwordRequirements.number
                      ? "requirement completed"
                      : "requirement"
                  }
                >
                  <span>2. Any number</span>

                  {passwordRequirements.number && (
                    <span className="requirement-check">
                      ✓
                    </span>
                  )}
                </div>

                <div
                  className={
                    passwordRequirements.capital
                      ? "requirement completed"
                      : "requirement"
                  }
                >
                  <span>3. Capital letter</span>

                  {passwordRequirements.capital && (
                    <span className="requirement-check">
                      ✓
                    </span>
                  )}
                </div>

                <div
                  className={
                    passwordRequirements.special
                      ? "requirement completed"
                      : "requirement"
                  }
                >
                  <span>4. Special character</span>

                  {passwordRequirements.special && (
                    <span className="requirement-check">
                      ✓
                    </span>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* RE-ENTER PASSWORD */}
          <div className="password-wrapper">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={
                confirmPasswordIsInvalid
                  ? "password-invalid"
                  : ""
              }
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  className="eye-icon"
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
                  className="eye-icon"
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

          {/* PROGRAMME */}
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            required
          >
            <option value="">
              Programme
            </option>

            <option value="Information Systems">
              Information Systems
            </option>
          </select>

          {/* REGISTER */}
          <button
            type="submit"
            className="register-submit"
          >
            Register
          </button>

        </form>

        {/* LOGIN */}
        <div className="login-section">

          <p>
            Already have an account?
          </p>

          <a
            href="/login"
            className="login-button"
          >
            Login
          </a>

        </div>

      </div>

    </div>
  );
}

export default Register;