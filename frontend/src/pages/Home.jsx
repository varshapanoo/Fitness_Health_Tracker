import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  return token
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/register" replace />;
};

export default Home;

// import { Navigate } from "react-router-dom";

// function Home() {
//   const token = localStorage.getItem("token");

//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Navigate to="/register" replace />;
// }

// export default Home;

// function Home() {
//   return (
//     <div>
//       <h2>Welcome to Fitness Tracker</h2>
//       <p>Track your workouts and stay healthy.</p>
//     </div>
//   );
// }

// export default Home;

