import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Si no hay usuario logueado, redirige al login
  if (!user) {
    navigate("/account/login");
    return null;
  }

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      {user.avatar_url && (
        <img src={user.avatar_url} alt="Avatar" className="mt-4 w-24 h-24 rounded-full" />
      )}

      <div className="mt-6 space-x-3">
        <Link to="/account/favorites" className="text-blue-600">Mis favoritos</Link>
        <Link to="/account/change-password" className="text-blue-600">Cambiar contraseña</Link>
        <button
          onClick={() => {
            logout();  // usamos la función del contexto
            navigate("/");
          }}
          className="ml-4 text-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}