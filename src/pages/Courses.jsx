import React from "react";
import { Link, useLocation } from "react-router-dom";

function Courses() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedResource = searchParams.get("resource");

  // Send the user directly to the resource they selected
  const getCourseLink = (coursePath) => {

    // Lecture notes
    if (selectedResource === "materials") {
      return `${coursePath}/notes`;
    }

    // Past papers
    if (selectedResource === "past-papers") {
      return `${coursePath}/exams`;
    }

    // Exam papers
    if (selectedResource === "exam-papers") {
      return `${coursePath}/exams`;
    }

    // Normal course navigation
    return coursePath;
  };


  // Change button text depending on what was selected
  const getButtonText = () => {

    if (selectedResource === "past-papers") {
      return "View Past Papers";
    }

    if (selectedResource === "exam-papers") {
      return "View Exam Papers";
    }

    return "View Materials";
  };


  return (
    <div className="courses-page">

      <div className="courses-header">
        <p>STUDYVAULT CBU</p>

        <h1>Information Systems</h1>

        <span>
          Explore courses and study materials for the Information Systems program.
        </span>
      </div>


      {/* YEAR 1 */}
      <section className="year-section">

        <div className="year-title">
          <h2>First Year</h2>

          <p>
            Information Systems — Year 1 Courses
          </p>
        </div>


        <div className="courses-grid">

          <div className="course-card">

            <h2>IS110</h2>

            <h3>
              Information Systems
            </h3>

            <Link
              to={getCourseLink("/materials/is110")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>IS130</h2>

            <h3>
              Introduction to programming and Data structures
            </h3>

            <Link
              to={getCourseLink("/materials/is130")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BS140</h2>

            <h3>
              Mathematical Analysis
            </h3>

            <Link
              to={getCourseLink("/materials/bs140")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BS153</h2>

            <h3>
              Bussines Communication
            </h3>

            <Link
              to={getCourseLink("/materials/bs153")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BS151</h2>

            <h3>
              Business Communication
            </h3>

            <Link
              to={getCourseLink("/materials/bs151")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BS120</h2>

            <h3>
              Basic Financial Accounting
            </h3>

            <Link
              to={getCourseLink("/materials/bs120")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>

        </div>

      </section>


      {/* YEAR 2 */}
      <section className="year-section">

        <div className="year-title">

          <h2>Second Year</h2>

          <p>
            Information Systems — Year 2 Courses
          </p>

        </div>


        <div className="courses-grid">

          <div className="course-card">

            <h2>BIT140</h2>

            <h3>
              Data Communication and Networks
            </h3>

            <Link
              to={getCourseLink("/materials/bit140")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BIT250</h2>

            <h3>
              Object-Oriented Programming
            </h3>

            <Link
              to={getCourseLink("/materials/bit250")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>IS212</h2>

            <h3>
              Principles of Internet Technology
            </h3>

            <Link
              to={getCourseLink("/materials/is212")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>IS230</h2>

            <h3>
              Systems Analysis and Design
            </h3>

            <Link
              to={getCourseLink("/materials/is230")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>IS260</h2>

            <h3>
              Database Systems
            </h3>

            <Link
              to={getCourseLink("/materials/is260")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>


          <div className="course-card">

            <h2>BS224</h2>

            <h3>
              Managerial Finance
            </h3>

            <Link
              to={getCourseLink("/materials/bs224")}
              className="course-button"
            >
              {getButtonText()}
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Courses;