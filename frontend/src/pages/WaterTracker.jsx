import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";

function WaterTracker() {
  const [goal, setGoal] = useState(3000);
  const [consumed, setConsumed] = useState(0);

  useEffect(() => {
    fetchWaterData();
  }, []);

  const fetchWaterData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/water", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoal(res.data.water.goal);
      setConsumed(res.data.water.consumed);
    } catch (error) {
      console.log(error);
    }
  };

  const saveGoal = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/water",
        { goal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Goal Updated Successfully");
      fetchWaterData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const drinkWater = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/water/drink",
        { amount: 250 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWaterData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetWater = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/water/reset",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWaterData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const percentage = Math.min((consumed / goal) * 100, 100);

  return (
    <MainLayout>
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                💧 Water Intake Tracker
              </h2>

              <label className="form-label">
                Daily Goal (mL)
              </label>

              <input
                type="number"
                className="form-control mb-3"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
              />

              <button
                className="btn btn-primary w-100 mb-3"
                onClick={saveGoal}
              >
                Save Goal
              </button>

              <h5>
                Water Consumed: {consumed} mL / {goal} mL
              </h5>

              <div className="progress mb-3" style={{ height: "25px" }}>
                <div
                  className="progress-bar bg-info"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage.toFixed(0)}%
                </div>
              </div>

              <button
                className="btn btn-success w-100 mb-2"
                onClick={drinkWater}
              >
                Drink 250 mL
              </button>

              <button
                className="btn btn-danger w-100"
                onClick={resetWater}
              >
                Reset
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
    </MainLayout>
  );
}

export default WaterTracker;