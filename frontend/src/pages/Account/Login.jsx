import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
      await login(form.email, form.password);
      navigate("/account/profile");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#141218] flex items-center justify-center px-4" style={{ fontFamily: "Space Grotesk" }}>
      <div className="w-full max-w-md border border-[#381e72] p-8">

        <div className="mb-8">
          <div className="inline-block px-2 py-1 bg-[#ffb4ab] text-[#690005] text-xs font-semibold uppercase tracking-[0.5em] mb-4">
            SYSTEM_ACCESS
          </div>
          <h1 className="text-[40px] font-bold text-[#e6e0e9] uppercase tracking-tighter leading-none">
            INICIAR_SESIÓN
          </h1>
        </div>

        {error && (
          <p className="text-[#ffb4ab] text-xs uppercase tracking-widest mb-4 border border-[#ffb4ab] px-4 py-2">
            [ERROR] {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#cbc4d2] text-xs uppercase tracking-widest mb-1 block">EMAIL</label>
            <input
              name="email"
              type="email"
              placeholder="usuario@dominio.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#1d1b20] border border-[#494551] text-[#e6e0e9] px-4 py-3 text-sm focus:outline-none focus:border-[#ffb4ab] transition-colors"
            />
          </div>

          <div>
            <label className="text-[#cbc4d2] text-xs uppercase tracking-widest mb-1 block">CONTRASEÑA</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-[#1d1b20] border border-[#494551] text-[#e6e0e9] px-4 py-3 text-sm focus:outline-none focus:border-[#ffb4ab] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#ffb4ab] text-[#690005] font-bold uppercase tracking-widest hover:bg-transparent hover:border hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all mt-4"
          >
            {loading ? "[PROCESANDO...]" : "INGRESAR_AL_SISTEMA"}
          </button>
        </form>

        <div className="mt-6 text-xs uppercase tracking-widest text-[#cbc4d2] space-y-2">
          <Link to="/account/forgot-password" className="block hover:text-[#ffb4ab] transition-colors">
            → OLVIDÉ_MI_CONTRASEÑA
          </Link>
          <Link to="/account/register" className="block hover:text-[#ffb4ab] transition-colors">
            → NO_TENGO_CUENTA
          </Link>
        </div>

      </div>
    </section>
  );
}