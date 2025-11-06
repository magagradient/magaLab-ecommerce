import { useState } from "react";
import { forgotPassword } from "../../services/api"; // implementá requestPasswordReset(email)

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);
        try {
            await forgotPassword(email);
            setMessage("Si el correo existe, recibirá un email con instrucciones para restablecer la contraseña.");
            setEmail("");
        } catch (err) {
            console.error(err);
            setError(err?.message || "Error al solicitar restablecimiento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Olvidé mi contraseña</h1>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Tu correo" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
                <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white py-2 rounded">
                    {loading ? "Enviando..." : "Solicitar restablecimiento"}
                </button>
            </form>
        </section>
    );
}
