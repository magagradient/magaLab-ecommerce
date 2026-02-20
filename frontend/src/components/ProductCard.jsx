import { useState } from "react";

export default function ProductCard({ product }) {
  const [fav, setFav] = useState(false);

  if (!product) return null;

  // Buscar la imagen cover de forma explícita
  const coverImage = product.images?.find(
    (img) => img.image_type === "cover"
  );

  const imageSrc =
    coverImage?.image_url ||
    `https://picsum.photos/500/500?random=${product.id_product}`;

  return (
    <div className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800">

      {/* Imagen principal */}
      <div className="aspect-square bg-zinc-800 mb-3 overflow-hidden">
        <img
          src={imageSrc}
          alt={product.title || "producto"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título */}
      <h3 className="text-sm font-medium mb-2">
        {product.title || "Producto sin nombre"}
      </h3>

      {/* Precio */}
      <p className="text-emerald-400 mb-3">
        ${product.price || 0}
      </p>

      {/* Botones */}
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