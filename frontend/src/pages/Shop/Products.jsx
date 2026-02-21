import { useLocation } from "react-router-dom";
import ProductList from "../../components/ProductList";

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const category = params.get("category") || "all";
  const query = params.get("term") || "";

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Catálogo de productos
      </h1>

      <ProductList filter={category} searchQuery={query} />
    </section>
  );
}