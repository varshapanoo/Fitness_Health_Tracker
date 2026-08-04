// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children })
// {
//     const token = localStorage.getItem("token");
//     if(!token)
//     {
//         return <Navigate to="/login" replace />;
//     }
//     return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;