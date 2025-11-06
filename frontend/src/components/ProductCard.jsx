import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Link to={`/product/${product.id_product}`}>
                <img
                    src={product.image || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">${product.price}</p>
                </div>
            </Link>
        </div>
    );
}
