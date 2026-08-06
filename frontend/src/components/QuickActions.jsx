import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaUtensils,
  FaTint,
  FaBullseye,
} from "react-icons/fa";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Workout",
      icon: <FaDumbbell />,
      path: "/workout",
      color: "primary",
    },
    {
      title: "Nutrition",
      icon: <FaUtensils />,
      path: "/nutrition",
      color: "success",
    },
    {
      title: "Water",
      icon: <FaTint />,
      path: "/water",
      color: "info",
    },
    {
      title: "Goals",
      icon: <FaBullseye />,
      path: "/goals",
      color: "warning",
    },
  ];

  return (
    <div className="row mt-4">
      {actions.map((action) => (
        <div className="col-md-3 mb-3" key={action.title}>
          <div
            className={`card border-${action.color} shadow-sm h-100`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(action.path)}
          >
            <div className="card-body text-center">
              <div className="fs-1 mb-2">{action.icon}</div>
              <h5>{action.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;