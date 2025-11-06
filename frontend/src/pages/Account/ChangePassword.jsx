import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/api"; // implementá changePassword({ token, currentPassword, newPassword })

export default function ChangePassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/account/login");
        return null;
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.newPassword !== form.confirmPassword) {
            setError("Las contraseñas nuevas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            await changePassword({ token, currentPassword: form.currentPassword, newPassword: form.newPassword });
            setSuccess("Contraseña actualizada correctamente.");
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            // opcional: forzar logout
            // localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/account/login");
        } catch (err) {
            console.error(err);
            setError(err?.message || "Error al cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Cambiar contraseña</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="currentPassword" type="password" placeholder="Contraseña actual" value={form.currentPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                <input name="newPassword" type="password" placeholder="Nueva contraseña" value={form.newPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                <input name="confirmPassword" type="password" placeholder="Confirmar nueva contraseña" value={form.confirmPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />

                <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white py-2 rounded">
                    {loading ? "Guardando..." : "Guardar nueva contraseña"}
                </button>
            </form>
        </section>
    );
}
