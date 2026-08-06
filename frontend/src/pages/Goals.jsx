import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";

function Goals() {
  const [goal, setGoal] = useState({
    title: "",
    target: "",
    current: "",
    unit: "",
    deadline: "",
  });

  const [goals, setGoals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(res.data.goals);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await API.put(`/goals/${editId}`, goal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Goal Updated Successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/goals", goal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Goal Added Successfully");
      }

      setGoal({
        title: "",
        target: "",
        current: "",
        unit: "",
        deadline: "",
      });

      fetchGoals();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const editGoal = (item) => {
    setGoal({
      title: item.title,
      target: item.target,
      current: item.current,
      unit: item.unit,
      deadline: item.deadline?.slice(0, 10),
    });

    setEditId(item._id);
    setIsEditing(true);
  };

  const deleteGoal = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Goal Deleted Successfully");
      fetchGoals();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <MainLayout>
    <div className="container mt-4">

      <div className="card shadow mb-4">
        <div className="card-body">

          <h2 className="text-center mb-4">
            {isEditing ? "Update Goal" : "Add Goal"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="title"
              placeholder="Goal Title"
              value={goal.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
              name="target"
              placeholder="Target"
              value={goal.target}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              className="form-control mb-3"
              name="current"
              placeholder="Current Progress"
              value={goal.current}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="unit"
              placeholder="Unit (kg, km, days)"
              value={goal.unit}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              name="deadline"
              value={goal.deadline}
              onChange={handleChange}
              required
            />

            <button className="btn btn-primary w-100">
              {isEditing ? "Update Goal" : "Add Goal"}
            </button>

          </form>

        </div>
      </div>

      <h2 className="mb-3">My Goals</h2>

      {goals.length === 0 ? (
        <p>No Goals Found</p>
      ) : (
        goals.map((item) => {
          const progress = Math.min(
            (item.current / item.target) * 100,
            100
          );

          return (
            <div className="card shadow mb-3" key={item._id}>
              <div className="card-body">

                <h4>{item.title}</h4>

                <p>
                  Progress: {item.current} / {item.target} {item.unit}
                </p>

                <div className="progress mb-3">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${progress}%` }}
                  >
                    {progress.toFixed(0)}%
                  </div>
                </div>

                <p>
                  Deadline: {new Date(item.deadline).toLocaleDateString()}
                </p>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => editGoal(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteGoal(item._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          );
        })
      )}

    </div>
    </MainLayout>
  );
}

export default Goals;