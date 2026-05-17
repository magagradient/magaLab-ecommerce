import { useNavigate } from "react-router-dom";

export default function CheckoutPending() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#141218] flex items-center justify-center px-4" style={{ fontFamily: "Space Grotesk" }}>
      <div className="w-full max-w-md border border-[#494551] p-8 text-center">
        <div className="inline-block px-2 py-1 bg-[#381e72] text-[#e6e0e9] text-xs font-semibold uppercase tracking-[0.5em] mb-4">
          PAGO_PENDIENTE
        </div>
        <h1 className="text-[40px] font-bold text-[#e6e0e9] uppercase tracking-tighter leading-none mb-4">
          PAGO_EN_PROCESO
        </h1>
        <p className="text-[#cbc4d2] text-xs uppercase tracking-widest mb-8">
          Tu pago está siendo procesado. Te notificaremos cuando se confirme.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 bg-[#ffb4ab] text-[#690005] font-bold uppercase tracking-widest hover:bg-transparent hover:border hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all"
        >
          → VOLVER_AL_INICIO
        </button>
      </div>
    </section>
  );
}