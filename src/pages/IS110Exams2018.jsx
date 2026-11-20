import { useParams } from "react-router-dom";

function IS110Exams() {
  const { intake } = useParams();

  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>IS110 — Exam Past Papers</h1>

        <span>
          Intake: {intake}
        </span>
      </div>

      <div className="materials-content">

        <h2>No Uploads</h2>

        <p>
          There are currently no exam past papers uploaded for this intake.
        </p>

      </div>

    </div>
  );
}

export default IS110Exams;