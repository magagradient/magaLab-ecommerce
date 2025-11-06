import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">
                La página que buscás no existe o fue movida.
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}

export default NotFound;
