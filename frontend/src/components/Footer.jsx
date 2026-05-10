export default function Footer() {
  return (
    <footer
      className="w-full py-8 px-16 flex flex-col md:flex-row justify-between items-center gap-2 bg-[#0f0d13] text-[#cbc4d2] text-xs uppercase tracking-widest border-t border-[#494551]"
      style={{ fontFamily: "Space Grotesk" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <span className="font-bold text-xl text-[#ffb4ab]">MAGA_LAB</span>
        <span className="opacity-50">©2025 MAGA_LAB // SISTEMA_DE_TRANSMISIÓN</span>
      </div>

      <div className="flex gap-8 items-center">
        <a href="#" className="hover:text-[#ffb4ab] hover:line-through transition-all duration-150">TÉRMINOS</a>
        <a href="#" className="hover:text-[#ffb4ab] hover:line-through transition-all duration-150">PRIVACIDAD</a>
        <a href="#" className="hover:text-[#ffb4ab] hover:line-through transition-all duration-150">CONTACTO</a>
      </div>

      <div className="flex gap-4">
        <button className="material-symbols-outlined hover:text-[#ffb4ab] transition-all">rss_feed</button>
        <button className="material-symbols-outlined hover:text-[#ffb4ab] transition-all">terminal</button>
      </div>
    </footer>
  );
}