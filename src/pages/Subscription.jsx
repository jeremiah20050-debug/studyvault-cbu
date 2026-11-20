import React from "react";
import "./Subscription.css";

function Subscription() {
  const loggedInUser = JSON.parse(
    sessionStorage.getItem("studyvaultLoggedIn") || "null"
  );

  const users = JSON.parse(
    localStorage.getItem("studyvaultUsers") || "[]"
  );

  const currentUser = users.find(
    (user) => user.studentId === loggedInUser?.studentId
  );

  const now = Date.now();

  // Check free trial
  const trialActive =
    currentUser?.trialUsed === true &&
    currentUser?.trialStart &&
    now <
      new Date(currentUser.trialStart).getTime() +
        3 * 24 * 60 * 60 * 1000;

  // Check paid subscription
  const subscriptionActive =
    currentUser?.subscriptionStatus === "active" &&
    currentUser?.subscriptionEndDate &&
    now < Number(currentUser.subscriptionEndDate);

  let statusTitle = "No Active Subscription";
  let statusText =
    "You currently do not have an active subscription. Start your free trial or choose a subscription plan below.";
  let statusBadge = "Not Active";

  if (trialActive) {
    statusTitle = "3-Day Free Trial Active";
    statusText =
      "Your free trial is currently active. You have access to available StudyVault materials, courses and examination resources.";
    statusBadge = "Trial Active";
  } else if (subscriptionActive) {
    statusTitle = "Subscription Active";
    statusText =
      "Your StudyVault subscription is currently active. You have access to available premium study materials and resources.";
    statusBadge = "Active";
  }

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <span className="subscription-eyebrow">
          STUDYVAULT CBU
        </span>

        <h1>Subscription & Membership</h1>

        <p>
          Get full access to StudyVault courses, study materials,
          examination papers and other academic resources.
        </p>
      </div>

      {/* Current Status */}
      <section className="subscription-status">
        <div>
          <span className="status-label">
            CURRENT STATUS
          </span>

          <h2>{statusTitle}</h2>

          <p>{statusText}</p>
        </div>

        <div className="status-badge">
          {statusBadge}
        </div>
      </section>

      {/* Free Trial */}
      {trialActive ? (
        <section className="trial-card">
          <div className="trial-icon">🎉</div>

          <div className="trial-content">
            <span>TRIAL ACTIVE</span>

            <h2>Your 3-Day Free Trial Is Active</h2>

            <p>
              You are currently enjoying your free trial.
              You can access available StudyVault study materials,
              courses and examination resources during your trial period.
            </p>
          </div>
        </section>
      ) : !subscriptionActive ? (
        <section className="trial-card">
          <div className="trial-icon">🎁</div>

          <div className="trial-content">
            <span>LIMITED FREE ACCESS</span>

            <h2>Start Your 3-Day Free Trial</h2>

            <p>
              Try StudyVault free for 3 days and get access to
              available study materials, courses and examination
              resources.
            </p>

            <button className="trial-button">
              Start 3-Day Free Trial
            </button>
          </div>
        </section>
      ) : null}

      {/* Plans */}
      <section className="plans-section">
        <div className="section-heading">
          <span>SUBSCRIPTION PLANS</span>

          <h2>Choose Your Plan</h2>

          <p>
            Select the subscription that works best for you.
          </p>
        </div>

        <div className="plans-grid">

          {/* Monthly */}
          <div className="plan-card">
            <div className="plan-top">
              <span className="plan-name">
                MONTHLY
              </span>
            </div>

            <h3>ZMW50.00</h3>

            <p className="plan-period">
              per month
            </p>

            <ul>
              <li>✓ Access to study materials</li>
              <li>✓ Course resources</li>
              <li>✓ Past examination papers</li>
              <li>✓ Programme materials</li>
              <li>✓ Premium content access</li>
            </ul>

           <button
  className="plan-button"
  onClick={() =>
    window.location.href = "/payments?plan=monthly&amount=50"
  }
>
  Subscribe Monthly
</button>
          </div>

          {/* Semester */}
          <div className="plan-card featured-plan">
            <div className="popular-badge">
              BEST VALUE
            </div>

            <div className="plan-top">
              <span className="plan-name">
                SEMESTER
              </span>
            </div>

            <h3>ZMW100.00</h3>

            <p className="plan-period">
              per semester
            </p>

            <ul>
              <li>✓ Access to study materials</li>
              <li>✓ Course resources</li>
              <li>✓ Past examination papers</li>
              <li>✓ Programme materials</li>
              <li>✓ Premium content access</li>
            </ul>

            <button
  className="plan-button"
  onClick={() =>
    window.location.href = "/payments?plan=semester&amount=100"
  }
>
  Subscribe for Semester
</button>
          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="section-heading">
          <span>WHAT YOU GET</span>

          <h2>Everything You Need to Study</h2>
        </div>

        <div className="benefits-grid">

          <div className="benefit-card">
            <div className="benefit-icon">📚</div>

            <h3>Study Materials</h3>

            <p>
              Access available learning materials for your courses.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">📝</div>

            <h3>Past Exams</h3>

            <p>
              Practice using available past examination papers.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🎓</div>

            <h3>Course Resources</h3>

            <p>
              Find resources organised around your programme and courses.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>

            <h3>Premium Access</h3>

            <p>
              Enjoy access to protected StudyVault content while active.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Subscription;