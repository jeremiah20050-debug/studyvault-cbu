import { Link, useParams } from "react-router-dom";

const courses = {
  is110: "IS110 — Information Systems",
  is130: "IS130",
  bs140: "BS140 — Mathematics Analysis",
  bs153: "BS153 — Environmental Communication",
  bs151: "BS151 — Communication Skills",
  bs120: "BS120 — Financial Accounting",

  bit140: "BIT140 — Data Communication and Networks",
  bit250: "BIT250 — Object-Oriented Programming",
  is212: "IS212 — Principles of Internet Technology",
  is230: "IS230 — Systems Analysis and Design",
  is260: "IS260 — Database Systems",
  bs224: "BS224 — Managerial Finance",
};

function CourseMaterials() {
  const { courseCode = "is130" } = useParams();

  const courseName = courses[courseCode.toLowerCase()] || courseCode.toUpperCase();

  const materials = [
  ["Lecture Notes", "notes", "Access uploaded lecture notes and study guides for this course."],
  ["Videos", "videos", "Watch educational videos to help you understand course topics."],
  ["Tests", "tests", "Practice with tests and assess your understanding."],
  ["Exam Past Papers", "exams", "Prepare for examinations using previous exam papers."],
  ["Other Materials", "other", "Find additional learning resources and supporting materials."],
];
  return (
    <div className="materials-page">
      <div className="materials-header">
        <p>STUDYVAULT CBU</p>
        <h1>{courseName}</h1>
        <span>Choose the type of study material you want to access.</span>
      </div>

      <div className="materials-content materials-options">
        {materials.map(([title, path, description]) => (
          <div className="material-option" key={path}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link
              to={`/materials/${courseCode}/${path}`}
              className="material-button"
            >
              View {title} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseMaterials;