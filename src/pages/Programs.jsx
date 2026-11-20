import React from "react";
import { Link, useLocation } from "react-router-dom";

function Programs() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const selectedSchool = searchParams.get("school");
  const selectedResource = searchParams.get("resource");

  const schoolPrograms = {
    sict: {
      title: "School of Information and Communication Technology",
      programs: [
        {
          name: "Information Systems",
          degree: "Bachelor of Science in Information Systems",
          icon: "💻",
          number: "01",
          link: "/courses",
        },
        {
          name: "Computer Science",
          degree: "Bachelor of Science in Computer Science",
          icon: "🖥️",
          number: "02",
          link: null,
        },
        {
          name: "Computer Engineering",
          degree: "Bachelor of Science in Computer Engineering",
          icon: "⚙️",
          number: "03",
          link: null,
        },
      ],
    },

    engineering: {
      title: "School of Engineering",
      programs: [],
    },

    business: {
      title: "School of Business Studies",
      programs: [],
    },
  };

  const currentSchool = schoolPrograms[selectedSchool];

  // Keep the selected resource when going from Programs to Courses
  const getProgramLink = (programLink) => {
    if (!selectedResource) {
      return programLink;
    }

    return `${programLink}?resource=${selectedResource}`;
  };

  return (
    <div className="programs-page">
      <style>{`
        .programs-page {
          padding: 50px 7%;
          min-height: 80vh;
          background: #f5f7fc;
        }

        .programs-header {
          text-align: center;
          background: #10234f;
          padding: 40px 25px;
          border-radius: 20px;
          margin: 0 auto 50px;
          max-width: 1000px;
        }

        .programs-eyebrow {
          display: inline-block;
          color: #10234f;
          background: #ffffff;
          padding: 9px 18px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 15px;
        }

        .programs-header h1 {
          font-size: 32px;
          color: #ffffff;
          margin-bottom: 15px;
          font-weight: 800;
        }

        .programs-header p {
          color: #ffffff;
          font-size: 16px;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }

        .programs-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: auto;
        }

        .program-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .program-card {
          position: relative;
          overflow: hidden;
          background: white;
          padding: 35px 28px;
          min-height: 240px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 25px rgba(16, 35, 79, 0.07);
          transition: 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(16, 35, 79, 0.15);
          border-color: #2563eb;
        }

        .program-number {
          position: absolute;
          top: 22px;
          right: 25px;
          font-size: 13px;
          font-weight: bold;
          color: #94a3b8;
        }

        .program-icon {
          width: 65px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef4ff;
          border-radius: 16px;
          font-size: 30px;
          margin-bottom: 25px;
        }

        .program-card h2 {
          color: #10234f;
          font-size: 20px;
          margin-bottom: 12px;
        }

        .program-card p {
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
        }

        .program-arrow {
          display: inline-block;
          margin-top: 22px;
          color: #16a34a;
          font-weight: bold;
        }

        .program-unavailable {
          display: inline-block;
          margin-top: 22px;
          padding: 8px 14px;
          background: #f1f5f9;
          color: #64748b;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .no-programs {
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border-radius: 18px;
          max-width: 700px;
          margin: auto;
          box-shadow: 0 8px 25px rgba(16, 35, 79, 0.05);
        }

        .no-programs h2 {
          color: #10234f;
          margin-bottom: 12px;
        }

        .no-programs p {
          color: #64748b;
          line-height: 1.7;
        }

        .back-schools {
          display: inline-block;
          margin-bottom: 25px;
          color: #2563eb;
          text-decoration: none;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .programs-page {
            padding: 35px 5%;
          }

          .programs-header h1 {
            font-size: 25px;
          }
        }
      `}</style>

      <Link to="/schools" className="back-schools">
        ← Back to Schools
      </Link>

      {currentSchool && (
        <>
          <div className="programs-header">
            <span className="programs-eyebrow">
              STUDYVAULT CBU
            </span>

            <h1>{currentSchool.title}</h1>

            <p>
              Explore the Bachelor's degree programmes offered by
              this school. Select a programme to discover its courses
              and study materials.
            </p>
          </div>

          {currentSchool.programs.length === 0 ? (
            <div className="no-programs">
              <h2>No Programmes Yet</h2>

              <p>
                Programmes for this school have not been added yet.
                Please check back later.
              </p>
            </div>
          ) : (
            <div className="programs-content">
              {currentSchool.programs.map((program) => {
                const card = (
                  <div className="program-card">
                    <span className="program-number">
                      {program.number}
                    </span>

                    <div className="program-icon">
                      {program.icon}
                    </div>

                    <h2>{program.name}</h2>

                    <p>{program.degree}</p>

                    {program.link ? (
                      <span className="program-arrow">
                        Explore Courses →
                      </span>
                    ) : (
                      <span className="program-unavailable">
                        No Courses Yet
                      </span>
                    )}
                  </div>
                );

                return program.link ? (
                  <Link
                    to={getProgramLink(program.link)}
                    className="program-link"
                    key={program.number}
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={program.number}>
                    {card}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Programs;