const API_URL = "http://localhost:3000/api"; 

export async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Error al traer productos");
        const data = await response.json();
        return data.data || data; 
    } catch (error) {
        console.error(error);
        return [];
    }
}
