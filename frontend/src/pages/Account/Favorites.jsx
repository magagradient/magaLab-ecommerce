import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/ProductCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (!favorites) return <p className="p-8">Cargando favoritos...</p>;

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mis favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No tenés favoritos todavía.</p>
          <Link to="/shop" className="text-blue-600 hover:underline">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id_product} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}