import {
  FaDumbbell,
  FaUtensils,
  FaFire,
  FaAppleAlt,
} from "react-icons/fa";

function DashboardCards({ title, value, color }) {

  const getIcon = () => {
    switch (title) {
      case "Total Workouts":
        return <FaDumbbell size={40} />;

      case "Total Meals":
        return <FaUtensils size={40} />;

      case "Calories Burned":
        return <FaFire size={40} />;

      case "Calories Consumed":
        return <FaAppleAlt size={40} />;

      default:
        return null;
    }
  };

  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div
        className="card text-white shadow h-100"
        style={{
          background: color,
          border: "none",
          borderRadius: "20px",
        }}
      >
        <div className="card-body text-center">

          <div className="mb-3">
            {getIcon()}
          </div>

          <h5>{title}</h5>

          <h2 className="fw-bold">
            {value}
          </h2>

        </div>
      </div>
    </div>
  );
}

export default DashboardCards;