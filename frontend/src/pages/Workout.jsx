import { useState, useEffect } from "react";
import API from "../services/api";

function Workout() {
  const [workout, setWorkout] = useState({
    exerciseName: "",
    category: "",
    duration: "",
    caloriesBurned: "",
  });

  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState(""); // Added search state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorkouts(res.data.workouts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await API.put(`/workouts/${editId}`, workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Workout Updated Successfully");

        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/workouts", workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Workout Added Successfully");
      }

      setWorkout({
        exerciseName: "",
        category: "",
        duration: "",
        caloriesBurned: "",
      });

      fetchWorkouts();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const editWorkout = (item) => {
    setWorkout({
      exerciseName: item.exerciseName,
      category: item.category,
      duration: item.duration,
      caloriesBurned: item.caloriesBurned,
    });

    setEditId(item._id);
    setIsEditing(true);
  };

  const deleteWorkout = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Workout Deleted Successfully");

      fetchWorkouts();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting workout");
    }
  };

  return (
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">

        <div className="card shadow mb-4">
          <div className="card-body">
            <h2 className="text-center mb-4">
              {isEditing ? "Update Workout" : "Add Workout"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Exercise Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="exerciseName"
                  value={workout.exerciseName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={workout.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Duration (Minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  name="duration"
                  value={workout.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Calories Burned</label>
                <input
                  type="number"
                  className="form-control"
                  name="caloriesBurned"
                  value={workout.caloriesBurned}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                {isEditing ? "Update Workout" : "Add Workout"}
              </button>
            </form>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-6 mb-2">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search Workout..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-center mb-4">Workout History</h2>

        {workouts.length === 0 ? (
          <div className="alert alert-info text-center">
            No workouts found.
          </div>
        ) : (
          workouts
            .filter((item) =>
              item.exerciseName
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((item) => {
              if (!date) return true;
              return (
                new Date(item.date).toISOString().slice(0, 10) === date
              );
            })
            .map((item) => (
              <div className="card shadow mb-3" key={item._id}>
                <div className="card-body">

                  <h4 className="mb-3">{item.exerciseName}</h4>

                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>

                  <p>
                    <strong>Duration:</strong> {item.duration} Minutes
                  </p>

                  <p>
                    <strong>Calories Burned:</strong> {item.caloriesBurned}
                  </p>

                  <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
                    <button
                      className="btn btn-warning flex-fill"
                      onClick={() => editWorkout(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() => deleteWorkout(item._id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))
        )}

      </div>
    </div>
  </div>
);
}

export default Workout;