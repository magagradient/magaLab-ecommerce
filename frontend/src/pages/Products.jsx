import { useState } from "react";
import ProductList from "../components/ProductList";

export default function Products() {
    const [filter, setFilter] = useState("all");

    return (
        <section className="products-page">
            <h1>Catálogo de productos</h1>

            <div className="products-filter">
                <button onClick={() => setFilter("all")}>Todos</button>
                <button onClick={() => setFilter("series")}>Series</button>
                <button onClick={() => setFilter("animations")}>Animaciones</button>
            </div>

            <ProductList filter={filter} />
        </section>
    );
}
