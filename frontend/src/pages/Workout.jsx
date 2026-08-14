import { useState, useEffect } from "react";
import {
  FaDumbbell,
  FaClock,
  FaFire,
  FaCalendarAlt,
} from "react-icons/fa";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

        toast.success("Workout Updated Successfully");

        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/workouts", workout, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Workout Added Successfully");
      }

      setWorkout({
        exerciseName: "",
        category: "",
        duration: "",
        caloriesBurned: "",
      });

      fetchWorkouts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
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
    const confirmed = window.confirm(
    "Are you sure you want to delete this workout?"
  );

  if (!confirmed) {
    return;
  }
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Workout Deleted Successfully");

      fetchWorkouts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting workout");
    }
  };

  const filteredWorkouts = workouts
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
  .filter((item) => {
    if (!selectedCategory) return true;

    return item.category === selectedCategory;
  })
  .sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }

    if (sortBy === "caloriesHigh") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "caloriesLow") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return 0;
  });

  return (
    <MainLayout>
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

  <select
    className="form-select"
    name="category"
    value={workout.category}
    onChange={handleChange}
    required
  >
    <option value="">Select Category</option>

    <option value="Cardio">Cardio</option>

    <option value="Strength">Strength</option>

    <option value="Yoga">Yoga</option>

    <option value="HIIT">HIIT</option>

    <option value="Cycling">Cycling</option>

    <option value="Walking">Walking</option>

    <option value="Stretching">Stretching</option>

    <option value="Other">Other</option>
  </select>
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

  {/* Date Filter */}
  <div className="col-12 col-md-4 mb-2">
    <input
      type="date"
      className="form-control"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>

  {/* Search Filter */}
  <div className="col-12 col-md-4 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="Search Workout..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Category Filter */}
  <div className="col-12 col-md-4 mb-2">
    <select
      className="form-select"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Cardio">Cardio</option>
      <option value="Strength">Strength</option>
      <option value="Yoga">Yoga</option>
      <option value="HIIT">HIIT</option>
      <option value="Cycling">Cycling</option>
      <option value="Walking">Walking</option>
      <option value="Stretching">Stretching</option>
      <option value="Other">Other</option>
    </select>
  </div>
  {/* Sort Filter */}
  <div className="col-12 col-md-6 col-lg-3 mb-2">
    <select
      className="form-select"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="caloriesHigh">Highest Calories</option>
      <option value="caloriesLow">Lowest Calories</option>
    </select>
  </div>

</div>

        <div className="d-flex justify-content-between align-items-center mb-4">
  <h2 className="mb-0">
    Workout History
  </h2>

  <span className="badge bg-secondary">
    {filteredWorkouts.length} workouts
  </span>
</div>

        {workouts.length === 0 ? (
  <div className="card shadow-sm border-0 text-center py-5">
    <div className="card-body">
      <div className="display-4 mb-3">🏋️</div>

      <h4>No Workouts Yet</h4>

      <p className="text-muted mb-0">
        Start your fitness journey by adding your first workout.
      </p>
    </div>
  </div>
) : filteredWorkouts.length === 0 ? (
  <div className="card shadow-sm border-0 text-center py-5">
    <div className="card-body">
      <div className="display-4 mb-3">🔍</div>

      <h4>No Matching Workouts</h4>

      <p className="text-muted">
        No workouts match your current search or filters.
      </p>

      <button
        className="btn btn-outline-primary"
        onClick={() => {
          setSearch("");
          setDate("");
          setSelectedCategory("");
          setSortBy("newest");
        }}
      >
        Clear Filters
      </button>
    </div>
  </div>
) : (
  <div className="row">
  {filteredWorkouts.map((item) => (
    <div className="col-12 col-md-6 mb-4" key={item._id}>
  <div className="card shadow-sm border-0 h-100">

    <div className="card-body">

      {/* Workout Header */}
      <div className="d-flex justify-content-between align-items-start mb-3">

        <div className="d-flex align-items-center">

          <div className="fs-2 me-3">
            <FaDumbbell />
          </div>

          <div>
            <h4 className="mb-1">
              {item.exerciseName}
            </h4>

            <span className="badge bg-primary">
              {item.category}
            </span>
          </div>

        </div>

      </div>

      {/* Workout Information */}
      <div className="row text-center mb-3">

        <div className="col-4">

          <FaClock className="mb-2" />

          <p className="mb-0 text-muted small">
            Duration
          </p>

          <strong>
            {item.duration} min
          </strong>

        </div>

        <div className="col-4">

          <FaFire className="mb-2" />

          <p className="mb-0 text-muted small">
            Calories
          </p>

          <strong>
            {item.caloriesBurned} kcal
          </strong>

        </div>

        <div className="col-4">

          <FaCalendarAlt className="mb-2" />

          <p className="mb-0 text-muted small">
            Date
          </p>

          <strong>
            {new Date(item.date).toLocaleDateString()}
          </strong>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-3">

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
</div>
  ))}
  </div>
)}

      </div> 
    </div>
  </div>
  </MainLayout>
);
}

export default Workout;