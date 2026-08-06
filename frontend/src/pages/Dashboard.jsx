import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaUtensils,
  FaFire,
  FaAppleAlt,
} from "react-icons/fa";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import QuickActions from "../components/QuickActions";
import MainLayout from "../layouts/MainLayout";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCards from "../components/DashboardCards";
import DashboardChart from "../components/DashboardChart";
import PieChartComponent from "../components/PieChartComponent";
import LineChartComponent from "../components/LineChartComponent";

import generatePDF from "../utils/generatePDF";

function Dashboard() {
  //const navigate = useNavigate();
  const { token } = useAuth();

  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = async () => {
    try {
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
    <MainLayout>

      <DashboardHeader
        onDownload={() =>
          generatePDF({
            totalWorkouts,
            totalMeals,
            caloriesBurned,
            caloriesConsumed,
          })
        }
      />

      <div className="row">

        <DashboardCards
          title="Total Workouts"
          value={totalWorkouts}
          icon={<FaDumbbell />}
          color="linear-gradient(135deg,#0d6efd,#4f9bff)"
        />

        <DashboardCards
          title="Total Meals"
          value={totalMeals}
          icon={<FaUtensils />}
          color="linear-gradient(135deg,#198754,#34d399)"
        />

        <DashboardCards
          title="Calories Burned"
          value={caloriesBurned}
          icon={<FaFire />}
          color="linear-gradient(135deg,#fd7e14,#f59e0b)"
        />

        <DashboardCards
          title="Calories Consumed"
          value={caloriesConsumed}
          icon={<FaAppleAlt />}
          color="linear-gradient(135deg,#dc3545,#ff6b81)"
        />

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

      <QuickActions />

    </MainLayout>
  );
}

export default Dashboard;