import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-16 left-0 w-full h-12 bg-neutral-900 text-white z-40">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-center gap-8">

        <Link to="/">Home</Link>

        <div className="relative group">
          <span className="cursor-pointer">Products</span>

          {/* Dropdown */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-neutral-800 rounded shadow-lg">
            <ul className="py-2 text-sm">
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products">All</Link></li>
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products/series">Series</Link></li>
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products/animations">Animations</Link></li>
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products/color">Color</Link></li>
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products/style">Style</Link></li>
              <li><Link className="block px-4 py-2 hover:bg-neutral-700" to="/products/theme">Theme</Link></li>
            </ul>
          </div>
        </div>

        <Link to="/sold">Sold</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

      </div>
    </div>
  );
}
