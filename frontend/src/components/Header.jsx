import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { favorites } = useFavorites();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "The Lab", path: "/lab" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="bg-black text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    Play<span className="text-pink-500">Dream</span>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `hover:text-pink-400 transition ${
                                    isActive ? "text-pink-400" : ""
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Right icons */}
                <div className="flex items-center space-x-5">

                    <NavLink to="/search" className="hover:text-pink-400 transition">
                        <Search size={20} />
                    </NavLink>

                    {/* ❤️ Favorites */}
                    <NavLink
                        to="/account/favorites"
                        className="relative hover:text-pink-400 transition"
                    >
                        <Heart size={20} />

                        {favorites.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {favorites.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink to="/cart" className="hover:text-pink-400 transition">
                        <ShoppingCart size={20} />
                    </NavLink>

                    <NavLink to="/account/profile" className="hover:text-pink-400 transition">
                        <User size={20} />
                    </NavLink>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden hover:text-pink-400"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-800">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 hover:bg-gray-900"
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    <div className="border-t border-gray-800 mt-2">
                        <NavLink
                            to="/account/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 hover:bg-gray-900"
                        >
                            Account
                        </NavLink>

                        <NavLink
                            to="/account/favorites"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 hover:bg-gray-900"
                        >
                            Favorites
                        </NavLink>

                        <NavLink
                            to="/search"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 hover:bg-gray-900"
                        >
                            Search
                        </NavLink>

                        <NavLink
                            to="/cart"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 hover:bg-gray-900"
                        >
                            Cart
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
