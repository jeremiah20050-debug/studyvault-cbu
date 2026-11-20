import { Link } from "react-router-dom";

function IS130Exams() {
  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>IS130 — Exam Past Papers</h1>

        <span>
          Select an academic year to view available exam papers.
        </span>
      </div>

      <div className="intake-section">

        <div className="intake-title">
          <h2>Select Academic Year</h2>
          <p>Choose an intake to view its exam papers.</p>
        </div>

        <div className="intake-grid">
          <Link to="/materials/is130/exams/2018-2019" className="intake-card">2018–2019</Link>
          <Link to="/materials/is130/exams/2019-2020" className="intake-card">2019–2020</Link>
          <Link to="/materials/is130/exams/2020-2021" className="intake-card">2020–2021</Link>
          <Link to="/materials/is130/exams/2021-2022" className="intake-card">2021–2022</Link>
          <Link to="/materials/is130/exams/2022-2023" className="intake-card">2022–2023</Link>
          <Link to="/materials/is130/exams/2023-2024" className="intake-card">2023–2024</Link>
          <Link to="/materials/is130/exams/2024-2025" className="intake-card">2024–2025</Link>
          <Link to="/materials/is130/exams/2025-2026" className="intake-card">2025–2026</Link>
        </div>

      </div>

    </div>
  );
}

export default IS130Exams;