// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = false; // or however you check auth

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
