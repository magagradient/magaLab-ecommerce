import { useState } from "react";

export default function ProductCard({ product }) {
  const [fav, setFav] = useState(false);

  if (!product) return null;

  return (
    <div className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800">

      <div className="aspect-square bg-zinc-800 mb-3 overflow-hidden">
        <img
          src={
            product.image_url ||
            `https://picsum.photos/500/500?random=${product.id_product}`
          }
          alt={product.title || "producto"}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-sm font-medium mb-2">
        {product.title || "Producto sin nombre"}
      </h3>

      <p className="text-emerald-400 mb-3">
        ${product.price || 0}
      </p>

      <div className="flex justify-between items-center">
        <button className="bg-white text-black px-4 py-1 rounded-full text-sm">
          Comprar
        </button>

        <button
          onClick={() => setFav(!fav)}
          className={fav ? "text-red-500 text-xl" : "text-white text-xl"}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
