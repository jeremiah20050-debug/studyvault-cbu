import React, { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    phoneNumber: "",
    email: "",
    programme: "",
  });

  const [editing, setEditing] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [passwordStep, setPasswordStep] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = () => {
    const loggedInUser = JSON.parse(
      sessionStorage.getItem("studyvaultLoggedIn") || "null"
    );

    const users = JSON.parse(
      localStorage.getItem("studyvaultUsers") || "[]"
    );

    if (!loggedInUser) {
      setError("Please log in to access Settings.");
      return;
    }

    const account = users.find(
      (item) => item.studentId === loggedInUser.studentId
    );

    if (!account) {
      setError("Account could not be found.");
      return;
    }

    setUser(account);

    setFormData({
      fullName: account.fullName || account.name || "",
      studentId: account.studentId || "",
      phoneNumber: account.phoneNumber || "",
      email: account.email || "",
      programme: account.programme || account.program || "",
    });
  };

  const fields = [
    {
      key: "fullName",
      label: "Full Name",
      value: formData.fullName,
    },
    {
      key: "studentId",
      label: "Student ID",
      value: formData.studentId,
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      value: formData.phoneNumber,
    },
    {
      key: "email",
      label: "Email Address",
      value: formData.email,
    },
    {
      key: "programme",
      label: "Programme",
      value: formData.programme,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "studentId" && !/^\d{0,8}$/.test(value)) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const startEditing = (field) => {
    setEditing((previous) => ({
      ...previous,
      [field]: true,
    }));

    setMessage("");
    setError("");
  };

  const cancelEditing = (field) => {
    setFormData((previous) => ({
      ...previous,
      [field]:
        field === "fullName"
          ? user.fullName || user.name || ""
          : field === "programme"
          ? user.programme || user.program || ""
          : user[field] || "",
    }));

    setEditing((previous) => ({
      ...previous,
      [field]: false,
    }));
  };

  const validateDetails = () => {
    if (
      !formData.fullName.trim() ||
      !formData.studentId.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.programme.trim()
    ) {
      return "Please complete all required account details.";
    }

    if (formData.studentId.length !== 8) {
      return "Student ID must contain exactly 8 digits.";
    }

    return null;
  };

  // Save account changes after password and SMS verification
  const saveAccountChanges = async () => {
    setMessage("");
    setError("");

    const validationError = validateDetails();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!currentPassword) {
      setError("Enter your current password to continue.");
      return;
    }

    if (currentPassword !== user.password) {
      setError("Your current password is incorrect.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("studyvaultUsers") || "[]"
    );

    const duplicate = users.find(
      (account) =>
        account.studentId === formData.studentId &&
        account.studentId !== user.studentId
    );

    if (duplicate) {
      setError("This Student ID is already registered.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/send-account-update-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.studentId,
            phoneNumber: user.phoneNumber,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Could not send verification code."
        );
      }

      setMessage(
        `Verification code sent to your registered number ${user.phoneNumber}.`
      );

      setEditing((previous) => ({
        ...previous,
        verification: true,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyAndSaveDetails = async () => {
    if (!verificationCode.trim()) {
      setError("Enter the verification code.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/verify-account-update-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.studentId,
            phoneNumber: user.phoneNumber,
            code: verificationCode,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Verification failed.");
      }

      const users = JSON.parse(
        localStorage.getItem("studyvaultUsers") || "[]"
      );

      const updatedUsers = users.map((account) =>
        account.studentId === user.studentId
          ? {
              ...account,
              fullName: formData.fullName.trim(),
              name: formData.fullName.trim(),
              studentId: formData.studentId,
              phoneNumber: formData.phoneNumber.trim(),
              email: formData.email.trim(),
              programme: formData.programme.trim(),
              program: formData.programme.trim(),
            }
          : account
      );

      localStorage.setItem(
        "studyvaultUsers",
        JSON.stringify(updatedUsers)
      );

      const updatedUser = {
        ...user,
        fullName: formData.fullName.trim(),
        name: formData.fullName.trim(),
        studentId: formData.studentId,
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        programme: formData.programme.trim(),
        program: formData.programme.trim(),
      };

      sessionStorage.setItem(
        "studyvaultLoggedIn",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setCurrentPassword("");
      setVerificationCode("");
      setEditing({});
      setMessage("Your account details have been updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Password requirements
  const validatePassword = (password) => {
    if (password.length < 9) {
      return "Password must contain at least 9 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character.";
    }

    return null;
  };

  // First verify previous password
  const confirmPreviousPassword = () => {
    setError("");
    setMessage("");

    if (currentPassword !== user.password) {
      setError("Your previous password is incorrect.");
      return;
    }

    setCurrentPassword("");
    setPasswordStep(2);
    setMessage("Previous password confirmed. Create your new password.");
  };

  // Save new password
  const saveNewPassword = () => {
    setError("");
    setMessage("");

    const validationError = validatePassword(newPassword);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("studyvaultUsers") || "[]"
    );

    const updatedUsers = users.map((account) =>
      account.studentId === user.studentId
        ? { ...account, password: newPassword }
        : account
    );

    localStorage.setItem(
      "studyvaultUsers",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = {
      ...user,
      password: newPassword,
    };

    setUser(updatedUser);

    sessionStorage.setItem(
      "studyvaultLoggedIn",
      JSON.stringify(updatedUser)
    );

    setPasswordStep(0);
    setNewPassword("");
    setConfirmPassword("");

    setMessage("Your password has been changed successfully.");
  };

  if (!user) {
    return (
      <div className="settings-page">
        {error || "Loading settings..."}
      </div>
    );
  }

  return (
    <div className="settings-page">

      <div className="settings-container">

        <div className="settings-header">
          <p>STUDYVAULT CBU</p>
          <h1>Settings</h1>
          <span>Manage your personal account details and password.</span>
        </div>

        {/* ACCOUNT DETAILS */}

        <div className="settings-card">

          <div className="settings-card-heading">
            <div>
              <h2>Account Details</h2>
              <p>Update your registered information.</p>
            </div>
            <span>👤</span>
          </div>

          {fields.map((field) => (
            <div className="settings-field" key={field.key}>

              <div className="settings-field-content">

                <label>{field.label}</label>

                {editing[field.key] ? (
                  <input
                    type="text"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    maxLength={
                      field.key === "studentId" ? 8 : undefined
                    }
                  />
                ) : (
                  <p>{field.value || "Not provided"}</p>
                )}

              </div>

              <div className="settings-field-actions">
                {editing[field.key] ? (
                  <button
                    onClick={() => cancelEditing(field.key)}
                    className="settings-cancel-button"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(field.key)}
                    className="settings-edit-button"
                  >
                    Edit
                  </button>
                )}
              </div>

            </div>
          ))}

          {Object.values(editing).some(Boolean) && !editing.verification && (
            <div className="settings-save-area">

              <input
                type="password"
                placeholder="Enter current password to save changes"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <button
                onClick={saveAccountChanges}
                disabled={loading}
              >
                {loading ? "Sending Code..." : "Save Changes"}
              </button>

            </div>
          )}

          {editing.verification && (
            <div className="settings-verification">

              <h3>SMS Verification</h3>

              <p>
                Enter the six-digit code sent to your registered phone number.
              </p>

              <input
                type="text"
                maxLength="6"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter verification code"
              />

              <button
                onClick={verifyAndSaveDetails}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Confirm & Save Changes"}
              </button>

            </div>
          )}

        </div>

        {/* PASSWORD */}

        <div className="settings-card password-card">

          <div className="settings-card-heading">
            <div>
              <h2>Password & Security</h2>
              <p>Manage your account password.</p>
            </div>

            <span>🔒</span>
          </div>

          <div className="settings-password-row">

            <div>
              <label>Password</label>
              <p>********</p>
            </div>

            {passwordStep === 0 && (
              <button
                className="settings-edit-button"
                onClick={() => {
                  setPasswordStep(1);
                  setError("");
                  setMessage("");
                }}
              >
                Change
              </button>
            )}

          </div>

          {passwordStep === 1 && (
            <div className="password-change-section">

              <h3>Verify Previous Password</h3>

              <p>Enter your current password to continue.</p>

              <input
                type="password"
                placeholder="Previous password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <button onClick={confirmPreviousPassword}>
                Confirm
              </button>

            </div>
          )}

          {passwordStep === 2 && (
            <div className="password-change-section">

              <h3>Create New Password</h3>

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="password-requirements">
                <p>Your password must have:</p>
                <ul>
                  <li>At least 9 characters</li>
                  <li>One capital letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>

              <button onClick={saveNewPassword}>
                Save Changes
              </button>

            </div>
          )}

        </div>

        {message && (
          <div className="settings-success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="settings-error-message">
            {error}
          </div>
        )}

      </div>

    </div>
  );
}

export default Settings;