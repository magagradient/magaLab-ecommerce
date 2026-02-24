import ProductList from "../../components/ProductList";

export default function Shop() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">
        Todas las obras
      </h1>

      <ProductList />
    </section>
  );
}