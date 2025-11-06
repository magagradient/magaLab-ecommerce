import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/api"; // implementá resetPassword({ token, newPassword })

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.newPassword !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            await resetPassword({ token, newPassword: form.newPassword });
            setSuccess("Contraseña actualizada. Ahora podés iniciar sesión.");
            setTimeout(() => navigate("/account/login"), 1500);
        } catch (err) {
            console.error(err);
            setError(err?.message || "Error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) return <p className="p-8">Token inválido.</p>;

    return (
        <section className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>

            {success && <p className="text-green-600 mb-4">{success}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="newPassword" type="password" placeholder="Nueva contraseña" value={form.newPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                <input name="confirmPassword" type="password" placeholder="Confirmar nueva contraseña" value={form.confirmPassword} onChange={handleChange} required className="w-full border rounded px-3 py-2" />

                <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white py-2 rounded">
                    {loading ? "Guardando..." : "Restablecer contraseña"}
                </button>
            </form>
        </section>
    );
}
