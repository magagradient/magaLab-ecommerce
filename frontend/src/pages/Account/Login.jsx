import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api"; 

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // tu API espera un objeto con email y password
            const res = await loginUser(form);

            if (!res.token) throw new Error("Token no recibido");

            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            navigate("/account/profile");
        } catch (err) {
            console.error(err);
            setError(err?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
                >
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>

            <div className="mt-4 text-sm text-center">
                <Link to="/account/forgot-password" className="text-blue-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                </Link>
                <p className="mt-2">
                    ¿No tenés cuenta?{" "}
                    <Link to="/account/register" className="text-blue-600 hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>
        </section>
    );
}
