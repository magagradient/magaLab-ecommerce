import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/api";
import { AuthContext } from "./AuthContext";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const { token, user } = useContext(AuthContext);
  const userId = user?.id_user;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(token, userId);
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [token, userId]);

  const add = async (product) => {
    if (!token || !userId) return;

    try {
      await addFavorite(token, userId, product.id_product);

      setFavorites((prev) => {
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

      setFavorites((prev) =>
        prev.filter((p) => p.id_product !== productId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (productId) =>
    favorites.some((p) => p.id_product === productId);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
export default FavoritesProvider;