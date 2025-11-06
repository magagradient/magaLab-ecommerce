import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser as apiLogout } from "../../services/api"; // opcional: endpoint logout

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // limpiar localStorage/session y avisar al backend si corresponde
        const doLogout = async () => {
            try {
                await apiLogout?.();
            } catch (err) {
                console.warn("logout backend error:", err);
            } finally {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            }
        };
        doLogout();
    }, [navigate]);

    return (
        <section className="p-8 text-center">
            <p>Cerrando sesión...</p>
        </section>
    );
}
