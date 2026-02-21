import { useState } from "react";

export default function ProductCard({ product }) {
  const [fav, setFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;
  

  // Ordenar imágenes para que el cover quede primero
  const sortedImages = (product.images || []).sort((a, b) => {
    if (a.image_type === "cover") return -1;
    if (b.image_type === "cover") return 1;
    return 0;
  });

  const coverImage = sortedImages[0];
  const hoverImage = sortedImages[1];

  const coverSrc =
    coverImage?.image_url ||
    `https://picsum.photos/500/500?random=${product.id_product}`;

  const hoverSrc = hoverImage?.image_url;

  return (
    <div className="bg-zinc-900 rounded-xl p-4 text-white border border-zinc-800">
      
      {/* Imagen */}
      <div
        className="relative aspect-square bg-zinc-800 mb-3 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen principal */}
        <img
          src={coverSrc}
          alt={product.title || "producto"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && hoverSrc ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Imagen hover */}
        {hoverSrc && (
          <img
            src={hoverSrc}
            alt={product.title || "producto"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Flechita overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-end pr-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-white text-lg">
            →
          </div>
        </div>
      </div>

      {/* Título */}
      <h3 className="text-sm font-medium mb-1">
        {product.title || "Producto sin nombre"}
      </h3>

      {/* Descripción */}
      <p className="text-xs text-zinc-400 line-clamp-2 mb-2">
        {product.description || ""}
      </p>

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