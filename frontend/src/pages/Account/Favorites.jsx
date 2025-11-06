import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFavorites } from "../../services/api"; // implementá getFavorites(token)

export default function Favorites() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/account/login");
            return;
        }

        (async () => {
            try {
                const data = await getFavorites(token);
                setFavorites(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [navigate]);

    if (loading) return <p className="p-8">Cargando favoritos...</p>;

    return (
        <section className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Mis favoritos</h1>

            {!favorites || favorites.length === 0 ? (
                <div>
                    <p>No tenés favoritos todavía.</p>
                    <Link to="/shop" className="text-blue-600">Ir a la tienda</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((p) => (
                        <div key={p.id_product} className="border rounded-lg overflow-hidden">
                            <Link to={`/product/${p.id_product}`}>
                                <img src={p.image || "/placeholder.jpg"} alt={p.title} className="w-full h-48 object-cover" />
                                <div className="p-3">
                                    <h3 className="font-semibold">{p.title}</h3>
                                    <p className="text-sm text-gray-600">${p.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
