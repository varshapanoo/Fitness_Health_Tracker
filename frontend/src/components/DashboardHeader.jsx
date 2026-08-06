import { FaDownload } from "react-icons/fa";

const DashboardHeader = ({ onDownload }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

        <div>
          <h2 className="fw-bold mb-1">
            🏋️ Fitness & Health Tracker
          </h2>

          <h5 className="text-primary">
            {greeting} 👋
          </h5>

          <p className="text-muted mb-1">
            Track your workouts, nutrition and health progress.
          </p>

          <small className="text-secondary">
            {today}
          </small>
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