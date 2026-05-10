import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function TopBar() {
  const { favorites } = useFavorites();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toggleCart } = useCart();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (!searchTerm.trim()) return;
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-surface border-b border-outline-variant z-50">
      <div className="h-full grid grid-cols-3 items-center px-10">

        {/* Logo */}
        <div className="flex items-center justify-start">
          <Link to="/" style={{ fontFamily: "Space Grotesk", letterSpacing: "-0.05em", color: "#ffb4ab" }} className="text-2xl font-bold hover:opacity-80 transition-opacity">
            MAGA_LAB
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 bg-surface-container text-on-surface text-sm border border-outline-variant focus:outline-none focus:border-error transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center justify-end gap-3">

          <Link to="/account/favorites" className="relative group">
            <Heart className="w-5 h-5 text-on-surface-variant group-hover:text-[#ffb4ab] transition-colors duration-75" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ffb4ab] text-[#690005] text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          <button onClick={toggleCart} className="group">
            <ShoppingCart className="w-5 h-5 text-on-surface-variant group-hover:text-[#ffb4ab] transition-colors duration-75" />
          </button>

          <Link to={user ? "/account/profile" : "/account/login"} className="group">
            <User className="w-5 h-5 text-on-surface-variant group-hover:text-[#ffb4ab] transition-colors duration-75" />
          </Link>

        </div>
      </div>
    </div>
  );
}