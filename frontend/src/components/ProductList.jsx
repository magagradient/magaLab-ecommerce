import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductList({ filter, searchQuery, colors, keywords }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
  
    if (colors) params.append("colors", colors);
    if (filter && filter !== "all") params.append("category", filter);
    if (keywords) params.append("keywords", keywords);
  
    const queryString = params.toString() ? `?${params.toString()}` : "";
    
  
    if (searchQuery) {
      searchProducts(searchQuery)
        .then((data) => setProducts(data.results))
        .catch(console.error);
    } else {
      getProducts(queryString)
        .then(setProducts)
        .catch(console.error);
    }
  
  }, [searchQuery, filter, colors, keywords]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.slice(0, 12).map((product) => (
        <ProductCard
          key={product.id_product}
          product={product}
        />
      ))}
    </div>
  );
}