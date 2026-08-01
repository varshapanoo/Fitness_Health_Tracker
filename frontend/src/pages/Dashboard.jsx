import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import DashboardChart from "../components/DashboardChart";
import PieChartComponent from "../components/PieChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import DashboardCards from "../components/DashboardCards";
import generatePDF from "../utils/generatePDF";

function Dashboard() {
  const navigate = useNavigate();

  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const workoutRes = await API.get("/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const workouts = workoutRes.data.workouts;

      setTotalWorkouts(workouts.length);

      const burned = workouts.reduce(
        (sum, item) => sum + item.caloriesBurned,
        0
      );

      setCaloriesBurned(burned);

      const nutritionRes = await API.get("/nutrition", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const meals = nutritionRes.data.meals;

      setTotalMeals(meals.length);

      const consumed = meals.reduce(
        (sum, item) => sum + item.calories,
        0
      );

      setCaloriesConsumed(consumed);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Fitness Tracker Dashboard
      </h2>

      <div className="row">

        <DashboardCards
          title="Total Workouts"
          value={totalWorkouts}
          color="linear-gradient(135deg,#0d6efd,#4f9bff)"
        />

        <DashboardCards
          title="Total Meals"
          value={totalMeals}
          color="linear-gradient(135deg,#198754,#34d399)"
        />

        <DashboardCards
          title="Calories Burned"
          value={caloriesBurned}
          color="linear-gradient(135deg,#fd7e14,#f59e0b)"
        />

        <DashboardCards
          title="Calories Consumed"
          value={caloriesConsumed}
          color="linear-gradient(135deg,#dc3545,#ff6b81)"
        />

      </div>

      <div className="text-center mt-4 mb-4">
  <button
    className="btn btn-danger"
    onClick={() =>
      generatePDF({
        totalWorkouts,
        totalMeals,
        caloriesBurned,
        caloriesConsumed,
      })
    }
  >
    📄 Download Fitness Report
  </button>
</div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="text-center mb-3">
            Workout & Meal Overview
          </h4>

          <DashboardChart
            workouts={totalWorkouts}
            meals={totalMeals}
          />
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="text-center mb-3">
            Calories Overview
          </h4>

          <PieChartComponent
            burned={caloriesBurned}
            consumed={caloriesConsumed}
          />
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <h4 className="text-center mb-3">
            Weekly Calories Trend
          </h4>

          <LineChartComponent />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">

        <button
          className="btn btn-primary"
          onClick={() => navigate("/workout")}
        >
          Workout
        </button>

        <button
          className="btn btn-success"
          onClick={() => navigate("/nutrition")}
        >
          Nutrition
        </button>

        <button
          className="btn btn-info"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

      </div>

    </div>
  );
}

export default Dashboard;