import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const toggleCart = () => setIsOpen(prev => !prev);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/cart-items?user_id=${user.id_user}`, {
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
      console.error("Error al traer el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, loading, fetchCart, clearCart, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);