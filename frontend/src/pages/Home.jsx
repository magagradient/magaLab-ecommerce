import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a PlayDream</h1>
            <p className="text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eos eius fuga explicabo veniam veritatis.
            </p>
            <Link
                to="/shop"
                className="bg-pink-500 text-white px-6 py-3 rounded hover:bg-pink-600"
            >
                Ver Tienda
            </Link>
        </section>
    );
}
