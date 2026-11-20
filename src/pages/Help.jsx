import React, { useState } from "react";
import { Link } from "react-router-dom";

function Help() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I create a StudyVault account?",
      answer:
        "Click Register on the navigation bar. Fill in your details, including your name, student ID, phone number and password. Once registration is complete, you can log in to your account.",
    },
    {
      question: "How do I log in to StudyVault?",
      answer:
        "Click Login, enter your registered student ID and password, then click the Login button.",
    },
    {
      question: "How do I access study materials?",
      answer:
        "Go to Schools, select your school and program, then choose your year and course. Click View Materials to explore the available study resources.",
    },
    {
      question: "What types of study materials are available?",
      answer:
        "StudyVault provides access to different learning resources, including lecture notes, past examination papers, tests and other study materials, depending on the course.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Go to the Login page and click Forgot Password. Enter your student ID and registered phone number. Follow the instructions to receive a verification code and reset your password.",
    },
    {
      question: "Why can't I access some study materials?",
      answer:
        "Some study materials require you to be logged in. If you are not logged in, you will be redirected to the registration page.",
    },
    {
      question: "What happens if my verification code expires?",
      answer:
        "If your verification code expires, use the Request Another Code button to receive a new verification code.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="help-page">

      <style>{`
        .help-page {
          background: #f5f7fc;
          min-height: 100vh;
          padding-bottom: 60px;
        }

        .help-hero {
          background: linear-gradient(135deg, #10234f, #173c75);
          padding: 65px 20px;
          text-align: center;
          color: white;
        }

        .help-hero small {
          color: #4ade80;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .help-hero h1 {
          font-size: 38px;
          margin: 15px 0;
        }

        .help-hero p {
          color: #dbeafe;
          font-size: 16px;
        }

        .help-container {
          max-width: 1050px;
          margin: 45px auto;
          padding: 0 20px;
        }

        .help-section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .help-section-title h2 {
          color: #10234f;
          font-size: 28px;
        }

        .help-section-title p {
          color: #64748b;
          margin-top: 10px;
        }

        .help-guides {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 22px;
          margin-bottom: 60px;
        }

        .help-guide-card {
          background: white;
          padding: 28px 22px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 5px 18px rgba(16, 35, 79, 0.05);
          transition: 0.3s ease;
        }

        .help-guide-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 15px 30px rgba(16, 35, 79, 0.12);
          border-color: #16a34a;
        }

        .help-guide-icon {
          font-size: 32px;
          margin-bottom: 18px;
        }

        .help-guide-card h3 {
          color: #10234f;
          font-size: 18px;
          margin-bottom: 12px;
        }

        .help-guide-card p {
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
        }

        .help-faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 60px;
        }

        .help-faq-item {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .help-faq-question {
          width: 100%;
          padding: 20px;
          background: white;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          gap: 15px;
          cursor: pointer;
          color: #10234f;
          font-size: 15px;
          font-weight: bold;
        }

        .help-faq-question:hover {
          color: #16a34a;
        }

        .help-faq-arrow {
          color: #16a34a;
          font-size: 20px;
        }

        .help-faq-answer {
          padding: 0 20px 20px;
          color: #64748b;
          font-size: 14px;
          line-height: 1.8;
        }

        .help-contact {
          background: white;
          padding: 40px 25px;
          border-radius: 18px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(16, 35, 79, 0.07);
        }

        .help-contact h2 {
          color: #10234f;
          margin-bottom: 12px;
        }

        .help-contact p {
          color: #64748b;
          margin-bottom: 22px;
        }

        .help-contact a {
          display: inline-block;
          background: #16a34a;
          color: white;
          text-decoration: none;
          padding: 13px 28px;
          border-radius: 8px;
          font-weight: bold;
          transition: 0.3s ease;
        }

        .help-contact a:hover {
          background: #15803d;
          transform: translateY(-3px);
        }

        .help-back {
          text-align: center;
          margin-top: 35px;
        }

        .help-back a {
          color: #16a34a;
          text-decoration: none;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .help-hero h1 {
            font-size: 29px;
          }

          .help-hero {
            padding: 50px 18px;
          }
        }
      `}</style>

      {/* HERO */}
      <div className="help-hero">
        <small>STUDYVAULT CBU</small>
        <h1>How Can We Help You?</h1>
        <p>
          Find answers, learn how to use StudyVault and get support.
        </p>
      </div>

      <div className="help-container">

        {/* GUIDES */}
        <div className="help-section-title">
          <h2>Help Guides</h2>
          <p>Learn how to use StudyVault step by step.</p>
        </div>

        <div className="help-guides">

          <div className="help-guide-card">
            <div className="help-guide-icon">👤</div>
            <h3>Registration & Login</h3>
            <p>
              Learn how to create your StudyVault account and log in
              to access protected study materials.
            </p>
          </div>

          <div className="help-guide-card">
            <div className="help-guide-icon">📚</div>
            <h3>Access Study Materials</h3>
            <p>
              Find your school, select your program, choose your
              year and browse available course materials.
            </p>
          </div>

          <div className="help-guide-card">
            <div className="help-guide-icon">🔐</div>
            <h3>Password Recovery</h3>
            <p>
              Having trouble logging in? Learn how to reset your
              forgotten password using your registered phone number.
            </p>
          </div>

        </div>

        {/* FAQ */}
        <div className="help-section-title">
          <h2>Frequently Asked Questions</h2>
          <p>Find quick answers to common questions.</p>
        </div>

        <div className="help-faq-list">

          {faqs.map((faq, index) => (
            <div className="help-faq-item" key={index}>

              <button
                className="help-faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>

                <span className="help-faq-arrow">
                  {openFAQ === index ? "−" : "+"}
                </span>
              </button>

              {openFAQ === index && (
                <div className="help-faq-answer">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

        {/* CONTACT SUPPORT */}
        <div className="help-contact">
          <div className="help-guide-icon">🎧</div>

          <h2>Still Need Help?</h2>

          <p>
            If you have a problem using StudyVault, contact our
            support team for assistance.
          </p>

          <a href="tel:+260771179560">
            ☎ Contact Support
          </a>
        </div>

        <div className="help-back">
          <Link to="/">← Back to Home</Link>
        </div>

      </div>
    </div>
  );
}

export default Help;