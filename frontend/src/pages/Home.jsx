import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products?limit=6");
        const data = await res.json();
        if (res.ok) setProducts(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-16 overflow-hidden border-b border-outline-variant">

        {/* Fondo con imagen */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10"></div>
          <img
            src="/esfera1.jpeg"
            alt="Maga Lab hero"
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
          />
        </div>

        {/* Contenido */}
        <div className="relative z-20 max-w-4xl">
          <div
            className="inline-block px-2 py-1 bg-[#ffb4ab] text-[#690005] mb-4 uppercase tracking-[0.5em] text-xs font-semibold"
            style={{ fontFamily: "Space Grotesk" }}
          >
            SYSTEM_INITIALIZED
          </div>

          <h1
            className="text-[64px] leading-none tracking-tighter font-bold text-white mb-4"
            style={{ fontFamily: "Space Grotesk" }}
          >
            MAGA_LAB //<br />
            <span className="text-[#ffb4ab] italic">VISUAL_TRANSMISSION</span>
          </h1>

          <p
            className="text-lg text-[#cbc4d2] max-w-xl mb-8"
            style={{ fontFamily: "Inter" }}
          >
            ARTE DIGITAL EXPERIMENTAL. ALGORÍTMICAMENTE GENERADO. MANUALMENTE CURADO.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-4 bg-[#ffb4ab] text-[#690005] font-bold border border-[#ffb4ab] hover:bg-transparent hover:text-[#ffb4ab] transition-all flex items-center gap-2 shadow-[4px_4px_0px_#381e72]"
              style={{ fontFamily: "Space Grotesk" }}
            >
              EXPLORAR_ARCHIVO
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              className="px-8 py-4 border border-white text-white font-bold hover:bg-white hover:text-[#141218] transition-all"
              style={{ fontFamily: "Space Grotesk" }}
            >
              VER_OBRAS
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-16 flex items-center gap-4 text-[#cbc4d2] text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "Space Grotesk" }}
        >
          <div className="w-16 h-[1px] bg-[#ffb4ab]"></div>
          SCROLL_FOR_DATA
        </div>

      </section>

      {/* Product Gallery Section */}
      <section className="py-8 px-16 bg-[#141218]" style={{ fontFamily: "Space Grotesk" }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-l-4 border-[#ffb4ab] pl-4">
          <div>
            <h2 className="text-[40px] font-bold text-[#e6e0e9] uppercase tracking-tighter leading-none">
              CURRENT_RELEASES
            </h2>
            <p className="text-[#cbc4d2] text-xs uppercase mt-1">
              BATCH_ID: 0x992_44 // FILTERED_BY: RECENT
            </p>
          </div>
          <div className="hidden md:flex gap-6 text-xs text-[#cbc4d2] uppercase mt-4 md:mt-0">
            <span className="text-[#ffb4ab] underline decoration-2 underline-offset-8 cursor-pointer">ALL</span>
            <span className="hover:text-[#e6e0e9] cursor-pointer">TECHNO</span>
            <span className="hover:text-[#e6e0e9] cursor-pointer">AMBIENT</span>
            <span className="hover:text-[#e6e0e9] cursor-pointer">GLITCH</span>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-[#cbc4d2] text-xs uppercase tracking-widest">[LOADING_DATA...]</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id_product} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-4 border-2 border-[#ffb4ab] text-[#ffb4ab] font-bold hover:bg-[#ffb4ab] hover:text-[#690005] transition-all uppercase tracking-widest flex items-center gap-4"
            style={{ fontFamily: "Space Grotesk" }}
          >
            CARGAR_MÁS_OBRAS
            <span className="material-symbols-outlined">sync</span>
          </button>
        </div>

      </section>

      {/* Technical Specs Section */}
      <section className="py-8 px-16 bg-[#0f0d13] border-t border-[#494551]" style={{ fontFamily: "Space Grotesk" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="border-l border-[#ffb4ab] pl-4 space-y-2">
            <h4 className="font-bold text-xl text-[#ffb4ab] uppercase">ALTA_RESOLUCIÓN</h4>
            <p className="text-[#cbc4d2] text-sm">CADA OBRA ES GENERADA A MÁXIMA RESOLUCIÓN. LISTA PARA IMPRESIÓN, PANTALLA O DISTRIBUCIÓN DIGITAL SIN PÉRDIDA DE CALIDAD.</p>
          </div>

          <div className="border-l border-[#ffb4ab] pl-4 space-y-2">
            <h4 className="font-bold text-xl text-[#ffb4ab] uppercase">OBRA_ÚNICA</h4>
            <p className="text-[#cbc4d2] text-sm">CADA PIEZA ES IRREPETIBLE. UNA VEZ VENDIDA, SE MARCA COMO AGOTADA Y PASA AL ARCHIVO HISTÓRICO DE MAGA_LAB.</p>
          </div>

          <div className="border-l border-[#ffb4ab] pl-4 space-y-2">
            <h4 className="font-bold text-xl text-[#ffb4ab] uppercase">ENTREGA_DIGITAL</h4>
            <p className="text-[#cbc4d2] text-sm">TRAS LA COMPRA, RECIBÍS EL ARCHIVO DE FORMA INMEDIATA. DESCARGA SEGURA Y DIRECTA DESDE EL PANEL DE TU CUENTA.</p>
          </div>

        </div>
      </section>

    </main>
  );
}