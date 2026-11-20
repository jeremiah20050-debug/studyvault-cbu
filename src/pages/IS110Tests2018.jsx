import { useParams } from "react-router-dom";

function IS110Tests2018() {
  const { intake } = useParams();

  return (
    <div className="materials-page">

      <div className="materials-header">
        <p>STUDYVAULT CBU</p>

        <h1>IS110 — Tests</h1>

        <span>
          Intake: {intake}
        </span>
      </div>

      <div className="materials-content">

        <div className="material-option">
          <h2>No Uploads</h2>

          <p>
            There are currently no tests uploaded for this intake.
          </p>
        </div>

      </div>

    </div>
  );
}

export default IS110Tests2018;