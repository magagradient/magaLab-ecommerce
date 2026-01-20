import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id_product}`} className="product-card-link">
                <div className="product-image-wrapper">
                    <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.title}
                        className="product-image"
                    />
                </div>

                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">${product.price}</p>
                </div>
            </Link>

            <div className="product-actions">
                <button className="buy-button">Comprar</button>
                <button className="fav-button">♡</button>
            </div>
        </div>
    );
}
