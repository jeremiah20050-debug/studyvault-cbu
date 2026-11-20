import { Link, useParams } from "react-router-dom";

function CourseMaterialContent() {
  const { courseCode, type, intake } = useParams();

  const titles = {
    notes: "Lecture Notes",
    videos: "Videos",
    tests: "Tests",
    exams: "Exam Past Papers",
    other: "Other Materials",
  };

  const title = titles[type] || "Study Materials";

  const intakes = [
    "2018-2019",
    "2019-2020",
    "2020-2021",
    "2021-2022",
    "2022-2023",
    "2023-2024",
    "2024-2025",
    "2025-2026",
  ];

  // Prevent the page from crashing if the course code is missing
  const safeCourseCode = courseCode
    ? courseCode.toUpperCase()
    : "COURSE";

  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>
          {safeCourseCode} — {title}
        </h1>

        <span>
          {title === "Videos"
            ? "Video lessons and learning content for this course."
            : title === "Lecture Notes"
            ? "Lecture notes and learning materials for this course."
            : title === "Tests"
            ? "Practice tests and assessment materials for this course."
            : title === "Exam Past Papers"
            ? "Previous examination papers for this course."
            : "Additional learning materials and resources for this course."}
        </span>
      </div>

      <div className="materials-content">

        {(type === "tests" || type === "exams") && !intake ? (

          <>
            <h2>Select Academic Year</h2>

            <div className="intake-options">

              {intakes.map((year) => (
                <Link
                  key={year}
                  to={`/materials/${courseCode}/${type}/${year}`}
                  className="intake-card"
                >
                  <h3>{year}</h3>
                </Link>
              ))}

            </div>
          </>

        ) : (

          <div className="material-option">

            <h2>No Uploads</h2>

            <p>
              There are currently no {title.toLowerCase()} uploaded for{" "}
              {safeCourseCode}.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default CourseMaterialContent;