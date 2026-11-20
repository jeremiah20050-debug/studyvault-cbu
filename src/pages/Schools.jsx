import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Schools.css";

function Schools() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Remember what the user wanted from the home page
  const resource = searchParams.get("resource");

  const schools = [
    {
      name: "School of Information and Communication Technology",
      shortName: "SICT",
      description:
        "Explore Information Systems, Computer Science and Computer Engineering programmes.",
      icon: "💻",
      path: "/programs?school=sict",
    },
    {
      name: "School of Engineering",
      shortName: "SOE",
      description:
        "Explore engineering degree programmes and their learning materials.",
      icon: "⚙️",
      path: "/programs?school=engineering",
    },
    {
      name: "School of Business Studies",
      shortName: "SBS",
      description:
        "Explore business, finance, accounting, management and economics programmes.",
      icon: "📊",
      path: "/programs?school=business",
    },
  ];

  const handleSchoolClick = (path) => {
    if (resource) {
      const separator = path.includes("?") ? "&" : "?";
      navigate(`${path}${separator}resource=${resource}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="schools-page">
      <div className="schools-header">
        <span className="schools-eyebrow">STUDYVAULT CBU</span>

        <h1>Explore Schools</h1>

        <p>
          Choose your school to explore programmes, courses and study materials.
        </p>
      </div>

      <div className="schools-grid">
        {schools.map((school) => (
          <div
            className="school-card"
            key={school.shortName}
            onClick={() => handleSchoolClick(school.path)}
            style={{ cursor: "pointer" }}
          >
            <div className="school-icon">{school.icon}</div>

            <span className="school-short-name">
              {school.shortName}
            </span>

            <h2>{school.name}</h2>

            <p>{school.description}</p>

            <span className="school-explore">
              Explore School →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schools;