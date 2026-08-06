import { FaDownload } from "react-icons/fa";

const DashboardHeader = ({ onDownload }) => {
  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

        <div>
          <h2 className="fw-bold mb-1">
            🏋️ Fitness & Health Tracker
          </h2>

          <p className="text-muted mb-0">
            Welcome back! Track your workouts, nutrition and health progress.
          </p>
        </div>

        <button
          className="btn btn-danger mt-3 mt-md-0"
          onClick={onDownload}
        >
          <FaDownload className="me-2" />
          Download Report
        </button>

      </div>
    </div>
  );
};

export default DashboardHeader;