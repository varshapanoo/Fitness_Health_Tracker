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

      const res = await API.get("/nutrition", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMeals(res.data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await API.put(`/nutrition/${editId}`, meal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Meal Updated Successfully");
        setIsEditing(false);
        setEditId(null);
      } else {
        await API.post("/nutrition", meal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Meal Added Successfully");
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
      toast.error(error.response?.data?.message || "Error");
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
  };

  const deleteMeal = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/nutrition/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Meal Deleted Successfully");

      fetchMeals();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting meal");
    }
  };

  return (
    <MainLayout>
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">

        <div className="card shadow mb-4">
          <div className="card-body">

            <h2 className="text-center mb-4">
              {isEditing ? "Update Meal" : "Add Meal"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Food Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="foodName"
                  value={meal.foodName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Calories</label>
                <input
                  type="number"
                  className="form-control"
                  name="calories"
                  value={meal.calories}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Protein (g)</label>
                <input
                  type="number"
                  className="form-control"
                  name="protein"
                  value={meal.protein}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Carbohydrates (g)</label>
                <input
                  type="number"
                  className="form-control"
                  name="carbohydrates"
                  value={meal.carbohydrates}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fat (g)</label>
                <input
                  type="number"
                  className="form-control"
                  name="fat"
                  value={meal.fat}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Meal Type</label>

                <select
                  className="form-select"
                  name="mealType"
                  value={meal.mealType}
                  onChange={handleChange}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                </select>
              </div>

              <button className="btn btn-success w-100" type="submit">
                {isEditing ? "Update Meal" : "Add Meal"}
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
              placeholder="Search Meal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>

        <h2 className="text-center mb-4">
          Meal History
        </h2>

        {meals.length === 0 ? (
          <div className="toast toast-info text-center">
            No meals found.
          </div>
        ) : (
          meals
            .filter((item) =>
              item.foodName
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

                  <h4 className="mb-3">
                    {item.foodName}
                  </h4>

                  <p><strong>Meal Type:</strong> {item.mealType}</p>
                  <p><strong>Calories:</strong> {item.calories}</p>
                  <p><strong>Protein:</strong> {item.protein} g</p>
                  <p><strong>Carbohydrates:</strong> {item.carbohydrates} g</p>
                  <p><strong>Fat:</strong> {item.fat} g</p>

                  <div className="d-flex flex-column flex-sm-row gap-2 mt-3">

                    <button
                      className="btn btn-warning flex-fill"
                      onClick={() => editMeal(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() => deleteMeal(item._id)}
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
  </MainLayout>
);
}

export default Nutrition;