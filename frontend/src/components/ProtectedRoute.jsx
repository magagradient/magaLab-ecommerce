import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, checkingAuth } = useContext(AuthContext);

  // mientras se está verificando la sesión
  if (checkingAuth) {
    return null; // despues podemos poner un loader si querés
  }

  // Si termino la verificación y no hay usuario
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }

  // Si se especifica rol y el usuario no lo cumple
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}