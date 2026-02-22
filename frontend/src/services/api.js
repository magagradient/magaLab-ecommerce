const API_URL = "http://localhost:3000/api";

// helper genérico para manejar peticiones
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error en ${endpoint}`);
    }

    const data = await response.json().catch(() => ({}));
    return data.data || data; // soporte para { data: ... } o respuesta directa
  } catch (error) {
    console.error(`❌ Error en ${endpoint}:`, error.message);
    throw error;
  }
}

// productos

export const getProducts = (query = "") => request(`/products${query}`);

export const getProductById = (id) => request(`/products/${id}`);

export const searchProducts = (query) => request(`/products/search?term=${encodeURIComponent(query)}`);

export const filterProducts = (filters) =>
  request("/products/filter", {
    method: "POST",
    body: JSON.stringify(filters),
  });

// colores

export const getColors = () => request("/colors");

// usuarios / cuenta

export const registerUser = (userData) =>
  request("/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = (credentials) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const logoutUser = () => request("/users/logout", { method: "POST" });

export const getUserProfile = (token) =>
  request("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const changePassword = (token, passwords) =>
  request("/users/change-password", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(passwords),
  });

export const forgotPassword = (email) =>
  request("/users/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token, newPassword) =>
  request(`/users/reset-password/${token}`, {
    method: "POST",
    body: JSON.stringify({ password: newPassword }),
  });

//  favoritos

export const getFavorites = (token) =>
  request("/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addFavorite = (token, productId) =>
  request("/favorites", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ product_id: productId }),
  });

export const removeFavorite = (token, productId) =>
  request(`/favorites/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

//
//  carrito
//
export const getCart = (token) =>
  request("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (token, productId, quantity = 1) =>
  request("/cart", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ product_id: productId, quantity }),
  });

export const removeFromCart = (token, productId) =>
  request(`/cart/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export const checkout = (token, data) =>
  request("/cart/checkout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
