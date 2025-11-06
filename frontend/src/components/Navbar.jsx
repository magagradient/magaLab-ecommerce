import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink to="/" className="nav-logo">
                    Mi E-commerce
                </NavLink>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                            Sobre mí
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                            Contacto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sold" className={({ isActive }) => (isActive ? "active" : "")}>
                            Vendidos
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
