import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";

function Nutrition() {
  const [meal, setMeal] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
    mealType: "Breakfast",
  });

  const [meals, setMeals] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const res = await API.get("/nutrition", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMeals(res.data.meals || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Unable to load meals"
      );
    }
  };

  const handleChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  };

  const validateMeal = () => {
    const foodName = meal.foodName.trim();

    if (!foodName) {
      toast.error("Food name is required.");
      return false;
    }

    if (meal.calories === "" || Number(meal.calories) < 0) {
      toast.error("Calories must be 0 or greater.");
      return false;
    }

    if (meal.protein === "" || Number(meal.protein) < 0) {
      toast.error("Protein must be 0 or greater.");
      return false;
    }

    if (
      meal.carbohydrates === "" ||
      Number(meal.carbohydrates) < 0
    ) {
      toast.error("Carbohydrates must be 0 or greater.");
      return false;
    }

    if (meal.fat === "" || Number(meal.fat) < 0) {
      toast.error("Fat must be 0 or greater.");
      return false;
    }

    if (
      !["Breakfast", "Lunch", "Dinner", "Snack"].includes(
        meal.mealType
      )
    ) {
      toast.error("Please select a valid meal type.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMeal()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const mealData = {
        foodName: meal.foodName.trim(),
        calories: Number(meal.calories),
        protein: Number(meal.protein),
        carbohydrates: Number(meal.carbohydrates),
        fat: Number(meal.fat),
        mealType: meal.mealType,
      };

      if (isEditing) {
        await API.put(`/nutrition/${editId}`, mealData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Meal updated successfully.");

        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/nutrition", mealData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Meal added successfully.");
      }

      setMeal({
        foodName: "",
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
        mealType: "Breakfast",
      });

      fetchMeals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to save meal. Please try again."
      );
    }
  };

  const editMeal = (item) => {
    setMeal({
      foodName: item.foodName,
      calories: item.calories,
      protein: item.protein,
      carbohydrates: item.carbohydrates,
      fat: item.fat,
      mealType: item.mealType,
    });

    setEditId(item._id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setMeal({
      foodName: "",
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
      mealType: "Breakfast",
    });

    setIsEditing(false);
    setEditId(null);
  };

  const deleteMeal = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      await API.delete(`/nutrition/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Meal deleted successfully.");

      fetchMeals();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete meal."
      );
    }
  };

  const filteredMeals = meals
    .filter((item) =>
      item.foodName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((item) => {
      if (!date) {
        return true;
      }

      return (
        new Date(item.date).toISOString().slice(0, 10) === date
      );
    });

  return (
    <MainLayout>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">

            {/* Add / Update Meal */}
            <div className="card shadow mb-4">
              <div className="card-body">

                <h2 className="text-center mb-4">
                  {isEditing ? "Update Meal" : "Add Meal"}
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">
                      Food Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="foodName"
                      value={meal.foodName}
                      onChange={handleChange}
                      maxLength="100"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Calories
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="calories"
                      value={meal.calories}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Protein (g)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="protein"
                      value={meal.protein}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Carbohydrates (g)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="carbohydrates"
                      value={meal.carbohydrates}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Fat (g)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="fat"
                      value={meal.fat}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Meal Type
                    </label>

                    <select
                      className="form-select"
                      name="mealType"
                      value={meal.mealType}
                      onChange={handleChange}
                    >
                      <option value="Breakfast">
                        Breakfast
                      </option>

                      <option value="Lunch">
                        Lunch
                      </option>

                      <option value="Dinner">
                        Dinner
                      </option>

                      <option value="Snack">
                        Snack
                      </option>
                    </select>
                  </div>

                  <button
                    className="btn btn-success w-100"
                    type="submit"
                  >
                    {isEditing
                      ? "Update Meal"
                      : "Add Meal"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={cancelEdit}
                    >
                      Cancel Edit
                    </button>
                  )}

                </form>

              </div>
            </div>

            {/* Search and Date Filter */}
            <div className="row mb-4">

              <div className="col-12 col-md-6 mb-2">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />
              </div>

              <div className="col-12 col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Meal..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>

            </div>

            {/* Meal History */}
            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="mb-0">
                Meal History
              </h2>

              <span className="badge bg-secondary">
                {filteredMeals.length} meals
              </span>

            </div>

            {meals.length === 0 ? (
              <div className="card shadow-sm border-0 text-center py-5">
                <div className="card-body">

                  <div className="display-4 mb-3">
                    🍽️
                  </div>

                  <h4>No Meals Yet</h4>

                  <p className="text-muted mb-0">
                    Start tracking your nutrition by
                    adding your first meal.
                  </p>

                </div>
              </div>
            ) : filteredMeals.length === 0 ? (
              <div className="card shadow-sm border-0 text-center py-5">
                <div className="card-body">

                  <div className="display-4 mb-3">
                    🔍
                  </div>

                  <h4>No Matching Meals</h4>

                  <p className="text-muted">
                    No meals match your current search
                    or date filter.
                  </p>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      setSearch("");
                      setDate("");
                    }}
                  >
                    Clear Filters
                  </button>

                </div>
              </div>
            ) : (
              <div className="row">

                {filteredMeals.map((item) => (
                  <div
                    className="col-12 col-md-6 col-lg-4 mb-4"
                    key={item._id}
                  >

                    <div className="card shadow-sm border-0 h-100">

                      <div className="card-body d-flex flex-column">

                        <h4 className="mb-3">
                          {item.foodName}
                        </h4>

                        <p>
                          <strong>
                            Meal Type:
                          </strong>{" "}
                          {item.mealType}
                        </p>

                        <p>
                          <strong>
                            Calories:
                          </strong>{" "}
                          {item.calories} kcal
                        </p>

                        <p>
                          <strong>
                            Protein:
                          </strong>{" "}
                          {item.protein} g
                        </p>

                        <p>
                          <strong>
                            Carbohydrates:
                          </strong>{" "}
                          {item.carbohydrates} g
                        </p>

                        <p>
                          <strong>
                            Fat:
                          </strong>{" "}
                          {item.fat} g
                        </p>

                        <div className="d-flex gap-2 mt-auto pt-3">

                          <button
                            className="btn btn-warning flex-fill"
                            onClick={() =>
                              editMeal(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger flex-fill"
                            onClick={() =>
                              deleteMeal(item._id)
                            }
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

export default Nutrition;