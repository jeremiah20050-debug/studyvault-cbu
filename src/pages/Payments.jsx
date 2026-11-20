import React, { useState } from "react";
import "./Payments.css";

const params = new URLSearchParams(window.location.search);

const selectedPlan = params.get("plan");
const selectedAmount = params.get("amount");

const paymentAmount =
  selectedAmount === "100" ? "ZMW 100.00" : "ZMW 50.00";

function Payments() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  const handleNext = () => {
    setError("");
    setMessage("");

    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit Zambian phone number.");
      return;
    }

    const prefix = phoneNumber.substring(0, 3);

    if (["097", "077", "057"].includes(prefix)) {
      setPaymentMethod("airtel");
      return;
    }

    if (["096", "076"].includes(prefix)) {
      setPaymentMethod("mtn");
      return;
    }

    setError(
      "Only Airtel numbers starting with 097, 077 or 057, and MTN numbers starting with 096 or 076 are accepted."
    );
  };

  const handleSubmit = () => {
    setError("");
    setMessage("");

    if (!transactionId.trim()) {
      setError("Please enter your Transaction ID.");
      return;
    }

    const loggedInUser = JSON.parse(
      sessionStorage.getItem("studyvaultLoggedIn") || "null"
    );

    if (!loggedInUser) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("studyvaultUsers") || "[]"
    );

    const currentUser = users.find(
      (user) => user.studentId === loggedInUser.studentId
    );

    if (!currentUser) {
      setError("Your account could not be found.");
      return;
    }

    // 30-day subscription
    const subscriptionStartDate = Date.now();
    const subscriptionEndDate =
      subscriptionStartDate + 30 * 24 * 60 * 60 * 1000;

    const updatedUser = {
      ...currentUser,
      subscriptionStatus: "active",
      subscriptionStartDate,
      subscriptionEndDate,
      transactionId: transactionId.trim(),
      paymentPhoneNumber: phoneNumber,
      paymentMethod,
    };

    const updatedUsers = users.map((user) =>
      user.studentId === currentUser.studentId
        ? updatedUser
        : user
    );

    localStorage.setItem(
      "studyvaultUsers",
      JSON.stringify(updatedUsers)
    );

    sessionStorage.setItem(
      "studyvaultLoggedIn",
      JSON.stringify(updatedUser)
    );

    setMessage(
      "Payment submitted successfully. Your 30-day subscription is now active."
    );
  };

  return (
    <div className="payments-page">

      <div className="payments-container">

        <div className="payments-header">
          <p>STUDYVAULT CBU</p>

          <h1>Payment</h1>

          <span>
            Enter your number to make your StudyVault payment.
          </span>
        </div>

        {!paymentMethod && !message && (
          <div className="payment-card">

            <div className="payment-card-heading">

              <div>
                <h2>Make Payment</h2>

                <p>
                  Enter the phone number you will use to make
                  your payment.
                </p>
              </div>

              <div className="payment-icon">
                💳
              </div>

            </div>

            <div className="payment-form">

              <label>Phone Number</label>

              <input
                type="text"
                inputMode="numeric"
                placeholder="0971234567"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="10"
              />

              <small>
                Accepted numbers: 097, 077, 057, 096 and 076
              </small>

              {error && (
                <div className="payment-error">
                  {error}
                </div>
              )}

              <button
                className="payment-next-button"
                onClick={handleNext}
              >
                Next
              </button>

            </div>

          </div>
        )}

        {paymentMethod && !message && (
          <div className="payment-card payment-instructions-card">

            <div className="payment-method-header">

              <div>

                <span className="payment-method-label">
                  {paymentMethod === "airtel"
                    ? "AIRTEL MONEY"
                    : "MTN MOBILE MONEY"}
                </span>

                <h2>You're sending money to</h2>

              </div>

              <div className="payment-icon">
                {paymentMethod === "airtel"
                  ? "📱"
                  : "📲"}
              </div>

            </div>

            <div className="receiver-card">

              {paymentMethod === "airtel" ? (
                <>
                  <div className="receiver-line">
                    <span>Phone Number</span>
                    <strong>0573833955</strong>
                  </div>

                  <div className="receiver-line">
                    <span>Phone Number</span>
                    <strong>0771179560</strong>
                  </div>
                </>
              ) : (
                <div className="receiver-line">
                  <span>Phone Number</span>
                  <strong>0963799723</strong>
                </div>
              )}

              <div className="receiver-line">
                <span>Name</span>
                <strong>Jeremiah Mulenga</strong>
              </div>

            </div>

            <div className="amount-card">
              <span>Amount to Send</span>
              <strong>{paymentAmount}</strong>
            </div>

            <div className="payment-instructions">

              <h3>Payment Instructions</h3>

              <ol>
                <li>
                  Dial <strong>*115#</strong>
                </li>

                <li>
                  Select <strong>Send Money</strong>
                </li>

                <li>
                  Enter the number shown above
                </li>

                <li>
                  Confirm the name{" "}
                  <strong>Jeremiah Mulenga</strong>
                </li>

                <li>
                  Enter the amount <strong>{paymentAmount}</strong>
                </li>

                <li>
                  Enter your PIN
                </li>

                <li>
                  Copy the Transaction ID from the
                  sent money transaction
                </li>

                <li>
                  Enter the Transaction ID below and submit
                </li>

                <li>
                  Wait up to <strong>5 minutes</strong> for verification
                </li>
              </ol>

            </div>

            <div className="transaction-section">

              <label>Transaction ID</label>

              <input
                type="text"
                placeholder="Enter your Transaction ID"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setError("");
                }}
              />

              {error && (
                <div className="payment-error">
                  {error}
                </div>
              )}

              <button
                className="payment-submit-button"
                onClick={handleSubmit}
              >
                Submit Payment
              </button>

            </div>

            <button
              className="payment-back-button"
              onClick={() => {
                setPaymentMethod("");
                setTransactionId("");
                setError("");
                setMessage("");
              }}
            >
              ← Change Phone Number
            </button>

          </div>
        )}

        {message && (
          <div className="payment-card payment-success-card">

            <div className="payment-success-icon">
              ✓
            </div>

            <h2>Subscription Activated</h2>

            <p>
              Your payment has been submitted successfully.
            </p>

            <p>
              Your <strong>30-day StudyVault subscription</strong>
              is now active.
            </p>

            <button
              className="payment-next-button"
              onClick={() => {
                window.location.href = "/materials";
              }}
            >
              Continue to Materials
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Payments;