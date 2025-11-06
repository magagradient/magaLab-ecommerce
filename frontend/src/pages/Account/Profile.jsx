import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/api"; // implementá getProfile(token) -> user

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/account/login");
            return;
        }

        (async () => {
            try {
                const data = await getUserProfile(token);
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    if (loading) return <p className="p-8">Cargando perfil...</p>;
    if (!user) return <p className="p-8">No se encontró el usuario.</p>;

    return (
        <section className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <div className="mt-6 space-x-3">
                <Link to="/account/favorites" className="text-blue-600">Mis favoritos</Link>
                <Link to="/account/change-password" className="text-blue-600">Cambiar contraseña</Link>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
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
