import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/api";
import { AuthContext } from "./AuthContext";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchFavorites = async () => {
      try {
        // Ahora guardamos los productos completos
        const data = await getFavorites(token);
        setFavorites(data); // data debe ser un array de objetos completos
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [token]);

  const add = async (product) => {
    if (!token) return;
    try {
      await addFavorite(token, product.id_product);
      setFavorites((prev) => {
        // Evitamos duplicados por si ya existía
        if (prev.find((p) => p.id_product === product.id_product)) return prev;
        return [...prev, product];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (productId) => {
    if (!token) return;
    try {
      await removeFavorite(token, productId);
      setFavorites((prev) => prev.filter((p) => p.id_product !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (productId) => favorites.some((p) => p.id_product === productId);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
export default FavoritesProvider;