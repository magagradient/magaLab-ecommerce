import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function TopBar() {
  const { favorites } = useFavorites();

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-black text-white z-50">
      <div className="h-full grid grid-cols-3 items-center px-6">

        {/* Logo */}
        <div className="flex items-center justify-start">
          <Link to="/" className="text-xl font-bold">
            PlayDream
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 rounded bg-neutral-800 text-sm focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center justify-end gap-5">

          {/* ❤️ Favorites */}
          <Link to="/account/favorites" className="relative">
            <Heart className="w-5 h-5 hover:text-pink-400 transition" />

            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* 🛒 Cart */}
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 hover:text-pink-400 transition" />
          </Link>

          {/* 👤 User */}
          <Link to="/account/login">
            <User className="w-5 h-5 hover:text-pink-400 transition" />
          </Link>

        </div>

      </div>
    </div>
  );
}
