import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useContext(AuthContext);

  // si no hay usuario logueado
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }

  // si se especifica rol y el usuario no lo cumple
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}