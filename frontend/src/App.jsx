import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";

// Products
import Products from "./pages/Shop/Products.jsx";
import Series from "./pages/Shop/Series.jsx";
import Animations from "./pages/Shop/Animations.jsx";
import Color from "./pages/Shop/Color.jsx";
import Style from "./pages/Shop/Style.jsx";
import Theme from "./pages/Shop/Theme.jsx";

import Sold from "./pages/Sold.jsx";
import Lab from "./pages/Lab.jsx";
import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// Cart
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Cart/Checkout.jsx";

// Account
import Login from "./pages/Account/Login.jsx";
import Register from "./pages/Account/Register.jsx";
import Logout from "./pages/Account/Logout.jsx";
import Profile from "./pages/Account/Profile.jsx";
import Favorites from "./pages/Account/Favorites.jsx";
import ChangePassword from "./pages/Account/ChangePassword.jsx";
import ForgotPassword from "./pages/Account/ForgotPassword.jsx";
import ResetPassword from "./pages/Account/ResetPassword.jsx";

import FavoritesProvider from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen">

          {/* Top layout */}
          <TopBar />
          <Navbar />

          {/* Main content */}
          <main className="pt-28 flex-grow">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Products */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/series" element={<Series />} />
              <Route path="/products/animations" element={<Animations />} />
              <Route path="/products/color" element={<Color />} />
              <Route path="/products/style" element={<Style />} />
              <Route path="/products/theme" element={<Theme />} />

              {/* Sold */}
              <Route path="/sold" element={<Sold />} />

              {/* Lab */}
              <Route path="/lab" element={<Lab />} />

              {/* Cart */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/checkout" element={<Checkout />} />

              {/* Search */}
              <Route path="/search" element={<Search />} />

              {/* Info */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Account */}
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/register" element={<Register />} />
              <Route path="/account/logout" element={<Logout />} />
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/favorites" element={<Favorites />} />
              <Route path="/account/change-password" element={<ChangePassword />} />
              <Route path="/account/forgot-password" element={<ForgotPassword />} />
              <Route path="/account/reset-password/:token" element={<ResetPassword />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
