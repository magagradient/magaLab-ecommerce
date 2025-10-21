// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div>
            <h2>Productos</h2>
            {products.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p.id_product}>
                            {p.title} - ${p.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
