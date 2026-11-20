import { Link, useLocation } from "react-router-dom";

function IS110Materials() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedResource = searchParams.get("resource");

  // Determine which resource the user selected
  const isMaterials = selectedResource === "materials";
  const isPastPapers = selectedResource === "past-papers";
  const isExamPapers = selectedResource === "exam-papers";

  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>IS110 — Information Systems</h1>

        <span>
          Choose the type of study material you want to access.
        </span>
      </div>

      <div className="materials-content materials-options">

        {/* LECTURE NOTES */}
        {(isMaterials || !selectedResource) && (
          <div className="material-option">

            <h2>Lecture Notes</h2>

            <p>
              Access lecture notes and learning materials for IS110.
            </p>

            <Link
              to="/materials/is110/notes"
              className="material-button"
            >
              View Lecture Notes →
            </Link>

          </div>
        )}


        {/* VIDEOS */}
        {!selectedResource && (
          <div className="material-option">

            <h2>Videos</h2>

            <p>
              Watch video lessons and other learning content for IS110.
            </p>

            <Link
              to="/materials/is110/videos"
              className="material-button"
            >
              View Videos →
            </Link>

          </div>
        )}


        {/* TESTS */}
        {!selectedResource && (
          <div className="material-option">

            <h2>Tests</h2>

            <p>
              Choose your intake to access available tests.
            </p>

            <Link
              to="/materials/is110/tests"
              className="material-button"
            >
              View Test Papers →
            </Link>

          </div>
        )}


        {/* PAST PAPERS */}
        {(isPastPapers || !selectedResource) && (
          <div className="material-option">

            <h2>Past Papers</h2>

            <p>
              Choose your intake to access previous examination papers.
            </p>

            <Link
              to="/materials/is110/exams"
              className="material-button"
            >
              View Past Papers →
            </Link>

          </div>
        )}


        {/* EXAM PAPERS */}
        {(isExamPapers || !selectedResource) && (
          <div className="material-option">

            <h2>Exam Papers</h2>

            <p>
              Access available examination papers for IS110.
            </p>

            <Link
              to="/materials/is110/exams"
              className="material-button"
            >
              View Exam Papers →
            </Link>

          </div>
        )}


        {/* OTHER MATERIALS */}
        {!selectedResource && (
          <div className="material-option">

            <h2>Other Materials</h2>

            <p>
              Access additional study resources for IS110.
            </p>

            <Link
              to="/materials/is110/other"
              className="material-button"
            >
              View Other Materials →
            </Link>

          </div>
        )}

      </div>

    </div>
  );
}

export default IS110Materials;