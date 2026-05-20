import ProductList from "../components/ProductList";

export default function Sold() {
  return (
    <section className="sold-page">
      <h1>Productos vendidos</h1>
      <ProductList isSold={true} />
    </section>
  );
}
