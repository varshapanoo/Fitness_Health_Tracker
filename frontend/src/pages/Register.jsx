// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";

// const Register = () => {

//     // ADD THIS
//     const token = localStorage.getItem("token");

//     if (token) {
//         return <Navigate to="/dashboard" replace />;
//     }

//     // Your existing state variables
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     // Your existing functions
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Existing registration code
//     };

//     return
// };

// export default Register;
    // Remaining code...
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", user);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Register
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;