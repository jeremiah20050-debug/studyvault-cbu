const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const AfricasTalking = require("africastalking");
const crypto = require("crypto");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const africastalking = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

const sms = africastalking.SMS;

// Store account-update verification codes temporarily
const accountVerificationCodes = new Map();

// Format Zambian phone numbers
function formatZambianPhoneNumber(phoneNumber) {
  let number = String(phoneNumber).replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = "260" + number.substring(1);
  } else if (
    number.startsWith("97") ||
    number.startsWith("95") ||
    number.startsWith("76")
  ) {
    number = "260" + number;
  }

  if (!number.startsWith("260")) {
    return null;
  }

  return `+${number}`;
}

// EXISTING PASSWORD RESET SMS ENDPOINT
app.post("/send-verification-code", async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        message: "Phone number and verification code are required.",
      });
    }

    const formattedPhoneNumber =
      formatZambianPhoneNumber(phoneNumber);

    if (!formattedPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid Zambian phone number.",
      });
    }

    const result = await sms.send({
      to: [formattedPhoneNumber],
      message: `Your StudyVault verification code is ${code}. It expires in 5 minutes.`,
      from: "StudyVault",
    });

    console.log("Password reset SMS sent.");

    return res.json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error("SMS error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send verification code.",
    });
  }
});

// SEND ACCOUNT UPDATE VERIFICATION CODE
app.post("/send-account-update-code", async (req, res) => {
  try {
    const { studentId, phoneNumber } = req.body;

    if (!studentId || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Student ID and phone number are required.",
      });
    }

    const formattedPhoneNumber =
      formatZambianPhoneNumber(phoneNumber);

    if (!formattedPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    // Generate a random six-digit code
    const code = crypto
      .randomInt(100000, 1000000)
      .toString();

    // Expire after five minutes
    const expiry = Date.now() + 5 * 60 * 1000;

    // Save code against the account
    accountVerificationCodes.set(studentId, {
      code,
      phoneNumber: formattedPhoneNumber,
      expiry,
      attempts: 0,
    });

    await sms.send({
      to: [formattedPhoneNumber],
      message: `Your StudyVault account update code is ${code}. It expires in 5 minutes.`,
      from: "StudyVault",
    });

    return res.json({
      success: true,
      message: "Account verification code sent.",
    });
  } catch (error) {
    console.error("Account verification SMS error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not send account verification code.",
    });
  }
});

// VERIFY ACCOUNT UPDATE CODE
app.post("/verify-account-update-code", (req, res) => {
  const { studentId, phoneNumber, code } = req.body;

  if (!studentId || !phoneNumber || !code) {
    return res.status(400).json({
      success: false,
      message: "All verification details are required.",
    });
  }

  const savedVerification =
    accountVerificationCodes.get(studentId);

  if (!savedVerification) {
    return res.status(400).json({
      success: false,
      message: "No verification code found. Request a new one.",
    });
  }

  if (Date.now() > savedVerification.expiry) {
    accountVerificationCodes.delete(studentId);

    return res.status(400).json({
      success: false,
      message: "Verification code has expired.",
    });
  }

  if (
    savedVerification.phoneNumber !==
    formatZambianPhoneNumber(phoneNumber)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid verification details.",
    });
  }

  savedVerification.attempts += 1;

  if (savedVerification.attempts > 5) {
    accountVerificationCodes.delete(studentId);

    return res.status(429).json({
      success: false,
      message: "Too many attempts. Request a new code.",
    });
  }

  if (String(code) !== savedVerification.code) {
    return res.status(400).json({
      success: false,
      message: "Incorrect verification code.",
    });
  }

  // Code is valid and can only be used once
  accountVerificationCodes.delete(studentId);

  return res.json({
    success: true,
    message: "Account verification successful.",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `StudyVault SMS server running on port ${PORT}`
  );
});