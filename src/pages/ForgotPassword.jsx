import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeExpiry, setCodeExpiry] = useState(null);
  const [codeExpired, setCodeExpired] = useState(false);

  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Check verification-code expiry
  useEffect(() => {
    if (!codeExpiry || codeVerified) {
      return;
    }

    const timer = setInterval(() => {
      if (Date.now() >= codeExpiry) {
        setCodeExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [codeExpiry, codeVerified]);

  // Student ID: numbers only, maximum 8 digits
  const handleStudentIdChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 8);

    setStudentId(value);
  };

  // Phone: numbers only, maximum 10 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPhoneNumber(value);
  };

  // Send verification code
  const handleSendCode = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Check basic lengths
    if (
      studentId.length !== 8 ||
      phoneNumber.length !== 10
    ) {
      setMessage("Invalid account details.");
      setMessageType("error");
      return;
    }

    // Get registered users
    const users =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    // Student ID and phone number must belong
    // to the same account
    const user = users.find(
      (account) =>
        account.studentId === studentId &&
        account.phoneNumber === phoneNumber
    );

    // Do not reveal which detail was incorrect
    if (!user) {
      setMessage("Invalid account details.");
      setMessageType("error");
      return;
    }

    // Generate a random 6-digit verification code
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Code expires after 5 minutes
    const expiryTime = Date.now() + 5 * 60 * 1000;

    try {
      // Send code to SMS server
      const response = await fetch(
        "http://localhost:5000/send-verification-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            code: code,
          }),
        }
      );

      const result = await response.json();

      // SMS server failed
      if (!response.ok || !result.success) {
        setMessage("Could not send verification code.");
        setMessageType("error");
        return;
      }

      // Only move to verification stage
      // after SMS was successfully sent
      setGeneratedCode(code);
      setCodeExpiry(expiryTime);
      setCodeExpired(false);
      setCodeSent(true);

      setMessage(
        "Verification code sent to your registered phone number."
      );
      setMessageType("success");
    } catch (error) {
      console.error("SMS error:", error);

      setMessage(
        "Could not send verification code. Please try again."
      );
      setMessageType("error");
    }
  };

  // Request another verification code
  const handleRequestNewCode = async () => {
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiryTime = Date.now() + 5 * 60 * 1000;

    try {
      const response = await fetch(
        "http://localhost:5000/send-verification-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            code: code,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(
          "Could not send a new verification code."
        );
        setMessageType("error");
        return;
      }

      setGeneratedCode(code);
      setCodeExpiry(expiryTime);
      setCodeExpired(false);
      setVerificationCode("");

      setMessage(
        "A new verification code has been sent to your phone."
      );
      setMessageType("success");
    } catch (error) {
      console.error("SMS error:", error);

      setMessage(
        "Could not send a new verification code. Please try again."
      );
      setMessageType("error");
    }
  };

  // Verify the code entered by the user
  const handleVerifyCode = (e) => {
    e.preventDefault();

    // Check expiry
    if (!codeExpiry || Date.now() > codeExpiry) {
      setCodeExpired(true);
      setMessage("Verification code has expired.");
      setMessageType("error");
      return;
    }

    // Check code
    if (verificationCode === generatedCode) {
      setCodeVerified(true);

      setMessage(
        "Code verified successfully. You can now create a new password."
      );
      setMessageType("success");
    } else {
      setMessage("Incorrect verification code.");
      setMessageType("error");
    }
  };

  // Password requirements
  const passwordRequirements = {
    length: newPassword.length >= 9,
    number: /\d/.test(newPassword),
    capital: /[A-Z]/.test(newPassword),
    special: /[!@#$%^&*()?/+=~`;:\\_\-"' ,<>.]/.test(
      newPassword
    ),
  };

  const passwordScore =
    Object.values(passwordRequirements).filter(Boolean).length;

  const passwordIsStrong = passwordScore === 4;

  let strengthText = "";
  let strengthClass = "";
  let progressWidth = "0%";

  if (passwordScore === 0 || passwordScore === 1) {
    strengthText = "Too weak";
    strengthClass = "weak";
    progressWidth =
      passwordScore === 0 ? "8%" : "25%";
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

  // Reset password
  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // Password must be strong
    if (!passwordIsStrong) {
      setMessage(
        "Password must have at least 9 characters, one number, one capital letter, and one special character."
      );
      setMessageType("error");
      return;
    }

    // Passwords must match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    // Get users
    const users =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    // Find the same account
    const userIndex = users.findIndex(
      (account) =>
        account.studentId === studentId &&
        account.phoneNumber === phoneNumber
    );

    if (userIndex === -1) {
      setMessage("Account could not be found.");
      setMessageType("error");
      return;
    }

    // Update password
    users[userIndex].password = newPassword;

    localStorage.setItem(
      "studyvaultUsers",
      JSON.stringify(users)
    );

    alert("Password reset successfully!");

    window.location.href = "/login";
  };

  return (
    <div className="forgot-password-page">

      {/* Home button */}
      <a href="/" className="forgot-home-button">
        <svg
          viewBox="0 0 24 24"
          className="forgot-home-icon"
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

      {/* Header */}
      <div className="forgot-password-header">
        <h1>FORGOT PASSWORD</h1>
      </div>

      <div className="forgot-password-card">

        {/* STEP 1: Student ID + Phone */}
        {!codeSent && (
          <form onSubmit={handleSendCode}>

            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={handleStudentIdChange}
              inputMode="numeric"
              maxLength={8}
              required
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              inputMode="numeric"
              maxLength={10}
              required
            />

            <button
              type="submit"
              className="forgot-reset-button"
            >
              Send Verification Code
            </button>

            {message && (
              <p
                className={`forgot-message ${messageType}`}
              >
                {message}
              </p>
            )}

          </form>
        )}

        {/* STEP 2: Verification Code */}
        {codeSent && !codeVerified && (
          <form onSubmit={handleVerifyCode}>

            <p className="verification-message">
              Enter the 6-digit verification code sent to
              your registered phone number.
            </p>

            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              inputMode="numeric"
              maxLength={6}
              required
            />

            <button
              type="submit"
              className="forgot-reset-button"
            >
              Verify Code
            </button>

            {codeExpired && (
              <button
                type="button"
                className="forgot-reset-button"
                onClick={handleRequestNewCode}
              >
                Request Another Code
              </button>
            )}

            {message && (
              <p
                className={`forgot-message ${messageType}`}
              >
                {message}
              </p>
            )}

          </form>
        )}

        {/* STEP 3: New Password */}
        {codeVerified && (
          <form onSubmit={handleResetPassword}>

            <p className="verification-message">
              Create your new password.
            </p>

            {/* New password */}
            <div className="forgot-password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="New password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="forgot-eye-button"
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
                    className="forgot-eye-icon"
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
                    className="forgot-eye-icon"
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

            {/* Password strength */}
            {newPassword !== "" && (
              <div className="forgot-password-strength">

                <div className="forgot-strength-bar">
                  <div
                    className={`forgot-strength-fill ${strengthClass}`}
                    style={{
                      width: progressWidth,
                    }}
                  ></div>
                </div>

                <p
                  className={`forgot-strength-text ${strengthClass}`}
                >
                  {strengthText}
                </p>

                <div className="forgot-password-requirements">

                  {/* 1. Length */}
                  <div
                    className={
                      passwordRequirements.length
                        ? "forgot-requirement completed"
                        : "forgot-requirement"
                    }
                  >
                    <span>
                      1. At least 9 characters
                    </span>

                    {passwordRequirements.length && (
                      <span className="forgot-requirement-check">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* 2. Number */}
                  <div
                    className={
                      passwordRequirements.number
                        ? "forgot-requirement completed"
                        : "forgot-requirement"
                    }
                  >
                    <span>
                      2. Any number
                    </span>

                    {passwordRequirements.number && (
                      <span className="forgot-requirement-check">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* 3. Capital */}
                  <div
                    className={
                      passwordRequirements.capital
                        ? "forgot-requirement completed"
                        : "forgot-requirement"
                    }
                  >
                    <span>
                      3. Capital letter
                    </span>

                    {passwordRequirements.capital && (
                      <span className="forgot-requirement-check">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* 4. Special character */}
                  <div
                    className={
                      passwordRequirements.special
                        ? "forgot-requirement completed"
                        : "forgot-requirement"
                    }
                  >
                    <span>
                      4. Special character
                    </span>

                    {passwordRequirements.special && (
                      <span className="forgot-requirement-check">
                        ✓
                      </span>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* Confirm password */}
            <div className="forgot-password-wrapper">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="forgot-eye-button"
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
                    className="forgot-eye-icon"
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
                    className="forgot-eye-icon"
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

            <button
              type="submit"
              className="forgot-reset-button"
            >
              Reset Password
            </button>

            {message && (
              <p
                className={`forgot-message ${messageType}`}
              >
                {message}
              </p>
            )}

          </form>
        )}

        {/* Login link */}
        <div className="forgot-login-section">

          <p>
            Remember your password?
          </p>

          <a
            href="/login"
            className="forgot-login-button"
          >
            Login
          </a>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;