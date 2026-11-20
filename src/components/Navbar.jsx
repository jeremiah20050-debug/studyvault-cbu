import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  const navigate = useNavigate();

  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

  // LOAD LOGGED-IN USER
  const loadUser = () => {
    const sessionUser = JSON.parse(
      sessionStorage.getItem("studyvaultLoggedIn") || "null"
    );

    if (!sessionUser) {
      setLoggedInUser(null);
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    const currentUser = users.find(
      (user) => user.studentId === sessionUser.studentId
    );

    if (currentUser) {
      setLoggedInUser(currentUser);

      sessionStorage.setItem(
        "studyvaultLoggedIn",
        JSON.stringify(currentUser)
      );
    }
  };

  useEffect(() => {
    loadUser();

    const interval = setInterval(loadUser, 1000);

    return () => clearInterval(interval);
  }, []);

  // PREVENT PAGE SCROLL WHEN DRAWER IS OPEN
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // FREE TRIAL COUNTDOWN
  useEffect(() => {
    if (!loggedInUser?.trialStart) {
      setTimeLeft("");
      return;
    }

    const updateTimer = () => {
      const endTime =
        new Date(loggedInUser.trialStart).getTime() + THREE_DAYS;

      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        setTimeLeft("Trial Expired");
        return;
      }

      const days = Math.floor(
        remaining / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (remaining % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`);
    };

    updateTimer();

    const timer = setInterval(updateTimer, 60000);

    return () => clearInterval(timer);
  }, [loggedInUser]);

  // START FREE TRIAL
  const startFreeTrial = () => {
    if (!loggedInUser) return;

    const users =
      JSON.parse(localStorage.getItem("studyvaultUsers")) || [];

    const userIndex = users.findIndex(
      (user) => user.studentId === loggedInUser.studentId
    );

    if (userIndex === -1) {
      alert("Account not found. Please log in again.");
      return;
    }

    const user = users[userIndex];

    if (user.trialUsed) {
      alert("You have already used your free trial.");
      return;
    }

    const updatedUser = {
      ...user,
      trialUsed: true,
      trialStart: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;

    localStorage.setItem(
      "studyvaultUsers",
      JSON.stringify(users)
    );

    sessionStorage.setItem(
      "studyvaultLoggedIn",
      JSON.stringify(updatedUser)
    );

    setLoggedInUser(updatedUser);

    alert("Your 3-day free trial has started!");

    navigate("/");
  };

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("studyvaultLoggedIn");
    sessionStorage.removeItem("studyvaultLoginTime");

    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  const trialActive =
    loggedInUser?.trialStart &&
    Date.now() <
      new Date(loggedInUser.trialStart).getTime() + THREE_DAYS;

  const subscriptionActive =
    loggedInUser?.subscriptionActive &&
    loggedInUser?.subscriptionExpiry &&
    Date.now() <
      new Date(loggedInUser.subscriptionExpiry).getTime();

  return (
    <>
      <style>{`

        /* TOP BLUE BAR */

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .logged-in-topbar {
          min-height: 100px;
          padding: 10px 25px;
          box-sizing: border-box;
          background: #172b50;
          color: white;
        }

        .logged-in-topbar .top-phone {
          margin: auto;
        }

        .top-bar .top-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        /* HAMBURGER BUTTON */

        .drawer-hamburger {
          width: 55px;
          height: 50px;
          border: none;
          border-radius: 7px;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 34px;
          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
          z-index: 10003;

          transition: none;
        }

        .drawer-hamburger:hover {
          background: rgba(255,255,255,0.08);
          transform: none;
        }

        /* MAIN NAVIGATION */

        .navbar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 95px;
          padding: 10px 25px;
          box-sizing: border-box;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        /* DRAWER OVERLAY */

        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;

          background: rgba(0, 0, 0, 0.45);

          z-index: 10000;

          opacity: 0;
          visibility: hidden;
          pointer-events: none;

          transition: opacity 0.4s ease,
                      visibility 0.4s ease;
        }

        .drawer-overlay.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* SIDE DRAWER */

        .side-drawer {
        position: fixed;
        top: 0;
        left: 5.8vw;
        bottom: 0;

        width: 285px;
        max-width: calc(100vw - 5.8vw);

        background: white;
        border-radius: 0 15px 0 0;

        z-index: 10001;
        padding: 15px;
        box-sizing: border-box;

        overflow-y: auto;
        overflow-x: hidden;

        transform: translateX(-110%);
        visibility: hidden;
        pointer-events: none;

        transition: transform 0.4s ease,
                    visibility 0.4s ease;
      }

        .side-drawer.open {
          transform: translateX(0);
          visibility: visible;
          pointer-events: auto;
        }

        /* DRAWER HEADING */

        .drawer-heading {
  color: #10234f;
  font-size: 18px;
  font-weight: bold;

  padding: 3px 10px 12px;

  border-bottom: 1px solid #e2e8f0;

  margin-bottom: 8px;
  line-height: 1.3;
}

        /* DRAWER LINKS */

        .drawer-link,
        .drawer-logout {
          display: flex;
          align-items: center;
          gap: 12px;

          width: 100%;

          padding: 15px;
          margin-bottom: 7px;

          border: none;
          border-radius: 9px;

          background: white;
          color: #10234f;

          text-decoration: none;
          font-size: 15px;
          text-align: left;

          cursor: pointer;
          box-sizing: border-box;

          transition: 0.25s ease;
        }

        .drawer-link:hover,
        .drawer-logout:hover {
          background: #eaf8ef;
          color: #16a34a;
          padding-left: 24px;
        }

        /* LOGOUT */

        .drawer-logout {
          color: #dc2626;

          border-top: 1px solid #e2e8f0;

          margin-top: 15px;
        }

        .drawer-logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        /* CLOSE BUTTON */

        .drawer-close {
  float: right;
  border: none;
  background: transparent;
  font-size: 22px;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

        /* TRIAL BUTTON */

        .trial-status {
          font-size: 12px;
          color: #16a34a;
          font-weight: bold;
          white-space: nowrap;
        }

        .trial-button {
          background: #16a34a;
          color: white;

          border: none;
          border-radius: 8px;

          padding: 11px 14px;

          font-weight: bold;
          cursor: pointer;
        }

        .trial-button:hover {
          background: #15803d;
        }

        .trial-expired {
          color: #dc2626;
          font-size: 12px;
          font-weight: bold;
        }

        /* SMALL SCREENS */

        @media (max-width: 850px) {

          .navbar {
            flex-wrap: wrap;
          }

          .nav-links {
            gap: 12px;
            flex-wrap: wrap;
          }

          .logged-in-topbar {
            padding: 10px;
          }

          .logged-in-topbar .top-phone {
            font-size: 13px;
          }

          .side-drawer {
            left: 0;
            width: 285px;
            max-width: 85vw;
          }
        }

      `}</style>

      {/* TOP BAR */}

      {loggedInUser ? (

        <div className="top-bar logged-in-topbar">

          <button
            className="drawer-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          <div className="top-phone">
            <span>☎</span>
            <span>+260 771-179-560</span>
          </div>

          <div className="top-right">
            <span className="social-icon">f</span>
            <span className="social-icon">𝕏</span>
          </div>

        </div>

      ) : (

        <div className="top-bar">

          <div className="top-brand">
            <span className="home-icon">⌂</span>
            <span>Studyvault-CBU</span>
          </div>

          <div className="top-phone">
            <span>☎</span>
            <span>+260 771-179-560</span>
          </div>

          <div className="top-right">

            <span className="social-icon">f</span>
            <span className="social-icon">𝕏</span>

            <Link to="/help" className="help-button">
              Help
            </Link>

          </div>

        </div>

      )}

      {/* MAIN NAVIGATION */}

      <nav className="navbar">

        <div className="logo">

          <img
            src="/studyvault-logo.png"
            alt="StudyVault CBU"
          />

          <span className="logo-text">
            STUDYVAULT-CBU
          </span>

        </div>

        <div className="nav-links">

          <Link to="/">Home</Link>
          <Link to="/schools">Schools</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/materials">Materials</Link>

          {!loggedInUser && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {loggedInUser && (
            <>

              {!loggedInUser.trialUsed && !subscriptionActive && (
                <button
                  className="trial-button"
                  onClick={startFreeTrial}
                >
                  Start 3-Day Free Trial
                </button>
              )}

              {trialActive && (
                <span className="trial-status">
                  🎁 {timeLeft}
                </span>
              )}

              {loggedInUser.trialUsed &&
                !trialActive &&
                !subscriptionActive && (
                  <Link
                    to="/payments"
                    className="trial-expired"
                  >
                    Trial Expired
                  </Link>
                )}

            </>
          )}

        </div>

      </nav>

      {/* SLIDING DRAWER */}

      {loggedInUser && (
        <>

          <div
            className={`drawer-overlay ${
              menuOpen ? "open" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`side-drawer ${
              menuOpen ? "open" : ""
            }`}
          >

            <div className="drawer-heading">

              <button
                className="drawer-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>

              StudyVault Menu

            </div>

            <Link
              to="/profile"
              className="drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              👤 Account Information
            </Link>

            <Link
              to="/settings"
              className="drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              ⚙️ Settings
            </Link>

            <Link
              to="/payments"
              className="drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              💳 Payments
            </Link>

            <Link
              to="/subscription"
              className="drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              ⭐ Subscription
            </Link>

            <Link
              to="/help"
              className="drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              ❓ Help & Support
            </Link>

            <button
              className="drawer-logout"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </>
      )}

    </>
  );
}

export default Navbar;