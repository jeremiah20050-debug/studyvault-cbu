import React, { useEffect, useState } from "react";
import "./AccountInformation.css";

function AccountInformation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      sessionStorage.getItem("studyvaultLoggedIn")
    );

    const users =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    if (loggedInUser) {
      const currentUser = users.find(
        (u) => u.studentId === loggedInUser.studentId
      );

      if (currentUser) {
        setUser(currentUser);
      }
    }
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = {
        ...user,
        profilePicture: reader.result,
      };

      const users =
        JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

      const updatedUsers = users.map((u) =>
        u.studentId === user.studentId ? updatedUser : u
      );

      localStorage.setItem(
        "studyvaultUsers",
        JSON.stringify(updatedUsers)
      );

      sessionStorage.setItem(
        "studyvaultLoggedIn",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
    };

    reader.readAsDataURL(file);
  };

  const getSubscriptionStatus = () => {
    if (!user) return "Trial";

    if (user.subscriptionActive === true) {
      if (user.subscriptionExpiry) {
        return new Date(user.subscriptionExpiry) >= new Date()
          ? "Active"
          : "Expired";
      }

      return "Active";
    }

    if (user.subscriptionExpiry) {
      return new Date(user.subscriptionExpiry) >= new Date()
        ? "Active"
        : "Expired";
    }

    if (user.trialStart) {
      const trialEnd = new Date(user.trialStart);
      trialEnd.setDate(trialEnd.getDate() + 7);

      return new Date() <= trialEnd ? "Trial" : "Expired";
    }

    return user.trialUsed ? "Expired" : "Trial";
  };

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-loading">
          Loading account information...
        </div>
      </div>
    );
  }

  const fullName =
    user.fullName || user.name || "Student";

  const programme =
    user.programme || user.program || "Not specified";

  const subscriptionStatus = getSubscriptionStatus();

  return (
    <div className="account-page">

      <div className="profile-card">

        {/* COVER */}
        <div className="profile-cover">
          <div className="cover-content">
            <span>STUDYVAULT CBU</span>
          </div>
        </div>

        {/* PROFILE HEADER */}
        <div className="profile-header">

          <div className="profile-picture-container">

            <div className="profile-picture">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                />
              ) : (
                <span>
                  {fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <label
              htmlFor="profile-upload"
              className="camera-button"
              title="Change profile picture"
            >
              📷
            </label>

            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handlePictureChange}
              hidden
            />

          </div>

          <div className="profile-name-section">
            <h1>{fullName}</h1>

            <p>{programme}</p>

            <span
              className={`subscription-badge ${subscriptionStatus.toLowerCase()}`}
            >
              {subscriptionStatus} Subscription
            </span>
          </div>

        </div>

        {/* PROFILE INFORMATION */}
        <div className="profile-content">

          <h2>Account Information</h2>

          <p className="profile-description">
            Your registered StudyVault CBU account information.
          </p>

          {/* INFORMATION GRID */}
          <div className="profile-info-grid">

            <div className="profile-info-item">
              <span>Full Name</span>
              <strong>{fullName}</strong>
            </div>

            <div className="profile-info-item">
              <span>Student ID</span>
              <strong>
                {user.studentId || "Not specified"}
              </strong>
            </div>

            <div className="profile-info-item">
              <span>Phone Number</span>
              <strong>
                {user.phoneNumber || "Not specified"}
              </strong>
            </div>

            <div className="profile-info-item">
              <span>Programme</span>
              <strong>{programme}</strong>
            </div>

          </div>

          {/* SUBSCRIPTION */}
          <div className="subscription-section">

            <div className="section-title">
              <h2>Subscription</h2>
              <span
                className={`subscription-status ${subscriptionStatus.toLowerCase()}`}
              >
                {subscriptionStatus}
              </span>
            </div>

            <div className="subscription-row">

              <div>
                <span>Account Type</span>
                <strong>Student Account</strong>
              </div>

              <div>
                <span>StudyVault Access</span>
                <strong>
                  {subscriptionStatus === "Expired"
                    ? "Access Expired"
                    : "Access Available"}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AccountInformation;