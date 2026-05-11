import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";


const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, checkingAuth } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/cart_items?user_id=${user.id_user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.data);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error al traer el carrito:", error.message, error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id_product) => {
    if (!user) {
      alert("Tenés que iniciar sesión para agregar al carrito.");
      return;
    }
    try {
      console.log("agregando al carrito, user:", user.id_user, "producto:", id_product);

      const cartRes = await fetch(`http://localhost:3000/api/shopping_carts/user/${user.id_user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cartData = await cartRes.json();
      console.log("status shopping cart:", cartRes.status);
      console.log("cart data:", cartData);

      if (!cartRes.ok) {
        console.error("No se encontró el carrito del usuario");
        return;
      }
      const id_cart = cartData.data.id_cart;

      const res = await fetch(`http://localhost:3000/api/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id_cart, id_product, quantity: 1 }),
      });

      console.log("status cart item:", res.status);

      if (res.ok) {
        await fetchCart();
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    if (!checkingAuth && user) {
      fetchCart();
    }
  }, [user, checkingAuth]);

  return (
    <CartContext.Provider value={{ cart, setCart, loading, fetchCart, clearCart, isOpen, toggleCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);