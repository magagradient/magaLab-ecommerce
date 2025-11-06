import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/api"; // 👈 mantenemos este nombre, igual que en api.js

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await registerUser(form); // 👈 usamos el mismo nombre que en el import
            navigate("/account/login");
        } catch (err) {
            console.error(err);
            setError(err?.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
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
                    className="w-full bg-pink-500 text-white py-2 rounded"
                >
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                </button>
            </form>

            <p className="mt-4 text-sm">
                Ya tenés cuenta?{" "}
                <Link to="/account/login" className="text-blue-600">
                    Ingresá
                </Link>
            </p>
        </section>
    );
}
