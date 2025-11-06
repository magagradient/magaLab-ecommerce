import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Series from "./pages/Shop/Series.jsx";
import Style from "./pages/Shop/Style.jsx";
import Theme from "./pages/Shop/Theme.jsx";
import Color from "./pages/Shop/Color.jsx";
import Animations from "./pages/Shop/Animations.jsx";
import ProductPage from "./pages/Shop/Products.jsx";

import Lab from "./pages/Lab.jsx";

import Sold from "./pages/Sold.jsx";

import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Cart/Checkout.jsx";

import Search from "./pages/Search.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

// Account
import Login from "./pages/Account/Login.jsx";
import Register from "./pages/Account/Register.jsx";
import Logout from "./pages/Account/Logout.jsx";
import Profile from "./pages/Account/Profile.jsx";
import Favorites from "./pages/Account/Favorites.jsx";
import ChangePassword from "./pages/Account/ChangePassword.jsx";
import ForgotPassword from "./pages/Account/ForgotPassword.jsx";
import ResetPassword from "./pages/Account/ResetPassword.jsx";

function App() {
  return (
    <Router>
      <div className="app-container flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/series" element={<Series />} />
            <Route path="/shop/style" element={<Style />} />
            <Route path="/shop/theme" element={<Theme />} />
            <Route path="/shop/color" element={<Color />} />
            <Route path="/shop/animations" element={<Animations />} />
            <Route path="/shop/sold" element={<Sold />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Lab */}
            <Route path="/lab" element={<Lab />} />

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<Checkout />} />

            {/* Search */}
            <Route path="/search" element={<Search />} />

            {/* Info pages */}
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

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
