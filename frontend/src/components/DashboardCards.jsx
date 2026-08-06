import "./DashboardCards.css";

const DashboardCards = ({ title, value, color, icon }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div
        className="dashboard-card shadow"
        style={{ background: color }}
      >
        <div className="icon">{icon}</div>

        <h5>{title}</h5>

        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCards;