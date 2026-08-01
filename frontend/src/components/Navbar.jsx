import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          Fitness Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/workout">
                Workout
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/nutrition">
                Nutrition
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/bmi">
              BMI
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/water">
              Water
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/goals">
              Goals
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;