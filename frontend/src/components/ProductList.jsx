import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductList({ filter, searchQuery, colors }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let queryParams = [];
    if (colors) queryParams.push(`colors=${colors}`);          
    if (filter && filter !== "all") queryParams.push(`category=${filter}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    if (searchQuery) {
      searchProducts(searchQuery)
        .then((data) => setProducts(data.results))
        .catch(console.error);
    } else {
      getProducts(queryString)   
        .then(setProducts)
        .catch(console.error);
    }
  }, [searchQuery, filter, colors]);  

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