import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
// import "./ProductList.css"; // si querés agregar estilos separados

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((data) => {
                console.log("Productos recibidos:", data);
                setProducts(data);
            })
            .catch((err) => console.error("Error al cargar productos:", err));
    }, []);

    return (
        <div className="product-list">
            <h2>Productos</h2>
            {products.length === 0 ? (
                <p>Cargando productos...</p>
            ) : (
                <div className="products-grid">
                    {products.map((p, index) => (
                        <div className="product-card" key={`${p.id_product}-${index}`}>
                            <h3>{p.title}</h3>
                            {p.category && <p>Categoria: {p.category.name}</p>}
                            {p.series && <p>Serie: {p.series.title}</p>}
                            <p>Precio: ${p.price}</p>
                            {p.keywords.length > 0 && (
                                <p>Keywords: {p.keywords.map((k) => k.name).join(", ")}</p>
                            )}
                            {p.colors.length > 0 && (
                                <p>Colores: {p.colors.map((c) => c.name).join(", ")}</p>
                            )}
                            {p.styles.length > 0 && (
                                <p>Estilos: {p.styles.map((s) => s.name).join(", ")}</p>
                            )}
                            {p.themes.length > 0 && (
                                <p>Themes: {p.themes.map((t) => t.name).join(", ")}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
