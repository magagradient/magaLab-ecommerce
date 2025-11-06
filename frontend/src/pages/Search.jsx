import { useState } from "react";
import { searchProducts } from "../services/api.js";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        try {
            const data = await searchProducts(query);
            setResults(data);
        } catch (err) {
            setError("Error al buscar productos. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Buscar productos</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por nombre, palabra clave..."
                    className="flex-1 border border-gray-300 rounded-lg p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Buscar
                </button>
            </form>

            {loading && <p className="text-gray-500">Buscando...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && results.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((product) => (
                        <li
                            key={product.id_product}
                            className="border rounded-lg p-4 hover:shadow transition"
                        >
                            <h2 className="font-medium">{product.title}</h2>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {product.description}
                            </p>
                            <p className="font-semibold mt-2">${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && !results.length && query && (
                <p className="text-gray-500">No se encontraron resultados.</p>
            )}
        </div>
    );
}

export default Search;
