import { Link } from "react-router-dom";

function Shop() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Shop</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Descubrí todas las colecciones de PlayDream. Explorá por estilos, temas, colores o series exclusivas.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Link
                    to="/shop/series"
                    className="p-8 border rounded-2xl hover:bg-gray-100 transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">Series</h2>
                    <p>Conjuntos de obras que comparten un mismo concepto visual.</p>
                </Link>

                <Link
                    to="/shop/style"
                    className="p-8 border rounded-2xl hover:bg-gray-100 transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">Estilos</h2>
                    <p>Explorá los diferentes estilos y estéticas visuales.</p>
                </Link>

                <Link
                    to="/shop/theme"
                    className="p-8 border rounded-2xl hover:bg-gray-100 transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">Temas</h2>
                    <p>Obras agrupadas por ideas, símbolos o narrativas visuales.</p>
                </Link>

                <Link
                    to="/shop/color"
                    className="p-8 border rounded-2xl hover:bg-gray-100 transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">Colores</h2>
                    <p>Elegí por gamas y composiciones cromáticas.</p>
                </Link>

                <Link
                    to="/shop/animations"
                    className="p-8 border rounded-2xl hover:bg-gray-100 transition"
                >
                    <h2 className="text-2xl font-semibold mb-2">Animaciones</h2>
                    <p>Piezas en movimiento y experimentos visuales digitales.</p>
                </Link>
            </div>
        </section>
    );
}

export default Shop;
