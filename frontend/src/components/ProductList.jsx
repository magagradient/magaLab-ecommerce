import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";
import "../styles/product-list.css";


export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="products-grid">
            {products.slice(0, 9).map((product) => (
                <ProductCard
                    key={product.id_product}
                    product={product}
                />
            ))}
        </div>
    );
}
