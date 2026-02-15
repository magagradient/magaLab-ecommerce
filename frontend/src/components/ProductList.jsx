import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductList({ filter }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("Cantidad de productos:", data.length);
        console.log("Productos completos:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // (Por ahora no uso filter, pero lo dejo preparado)
  const filteredProducts =
    filter && filter !== "all"
      ? products.filter((p) => p.category === filter)
      : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.slice(0, 12).map((product) => (
        <ProductCard
          key={product.id_product}
          product={product}
        />
      ))}
    </div>
  );
}
