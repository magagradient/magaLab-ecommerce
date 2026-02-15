import { useState } from "react";
import ProductList from "../../components/ProductList";

export default function Products() {
  const [filter, setFilter] = useState("all");

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-white">
      
      <h1 className="text-3xl font-bold mb-8">
        Catálogo de productos
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Todos
        </button>

        <button
          onClick={() => setFilter("series")}
          className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Series
        </button>

        <button
          onClick={() => setFilter("animations")}
          className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
        >
          Animaciones
        </button>
      </div>

      <ProductList filter={filter} />
    </section>
  );
}
