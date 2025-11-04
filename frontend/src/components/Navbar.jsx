import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo o nombre del sitio */}
                <Link to="/" className="nav-logo">
                    Mi E-commerce
                </Link>

                {/* Enlaces de navegación */}
                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "active" : "")}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Sobre mí
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Contacto
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
