import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="home">
            <div className="home-container">
                <h1>Bienvenido a Mi E-commerce</h1>
                <p>
                    Descubrí productos únicos, creados con dedicación y estilo.
                    Navegá por nuestras categorías y encontrá lo que estás buscando.
                </p>
                <Link to="/products" className="home-button">
                    Ver productos
                </Link>
            </div>
        </section>
    );
}
