import {  FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">

        <h5 className="text-center fw-bold mb-3">
          🏋️ Fitness & Health Tracker
        </h5>

        <p className="text-center">
          Track your workouts, nutrition, and fitness goals.
        </p>

        <div className="text-center mb-3">
          <FaGithub className="me-3 fs-4" />
          <FaLinkedin className="fs-4" />
        </div>

        <hr />

        <p className="text-center mb-0">
          © 2026 Fitness & Health Tracker | Developed by Varsha
        </p>

      </div>
    </footer>
  );
}

export default Footer;