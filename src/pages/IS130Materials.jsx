import { Link } from "react-router-dom";

function IS130Materials() {
  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>IS130</h1>

        <span>
          Choose the type of study material you want to access.
        </span>
      </div>

      <div className="materials-content materials-options">

        <div className="material-option">
          <h2>Lecture Notes</h2>
          <Link to="/materials/is130/notes" className="material-button">
            View Lecture Notes
          </Link>
        </div>

        <div className="material-option">
          <h2>Videos</h2>
          <Link to="/materials/is130/videos" className="material-button">
            View Videos
          </Link>
        </div>

        <div className="material-option">
          <h2>Tests</h2>
          <Link to="/materials/is130/tests" className="material-button">
            View Tests
          </Link>
        </div>

        <div className="material-option">
          <h2>Exam Past Papers</h2>
          <Link to="/materials/is130/exams" className="material-button">
            View Exam Papers
          </Link>
        </div>

        <div className="material-option">
          <h2>Other Materials</h2>
          <Link to="/materials/is130/other" className="material-button">
            View Other Materials
          </Link>
        </div>

      </div>

    </div>
  );
}

export default IS130Materials;