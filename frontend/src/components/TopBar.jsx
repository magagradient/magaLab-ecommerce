import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-black text-white z-50">
      <div className="h-full grid grid-cols-3 items-center px-6">

        <div className="flex items-center justify-start">
          <Link to="/" className="text-xl font-bold">
            PlayDream
          </Link>
        </div>


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


        <div className="flex items-center justify-end gap-5">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/account/login">
            <User className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
