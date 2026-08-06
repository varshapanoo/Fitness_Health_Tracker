import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          Fitness Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

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

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;