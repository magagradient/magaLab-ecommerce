import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductList({ filter, searchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery)
        .then((data) => setProducts(data.results))
        .catch(console.error);
    } else {
      getProducts()
        .then(setProducts)
        .catch(console.error);
    }
  }, [searchQuery]);

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