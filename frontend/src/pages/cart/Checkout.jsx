import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useLocation } from "../../context/LocationContext";
import { createMPPreference, createPayPalOrder } from "../../services/api";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { cart, clearCart } = useCart();
  const { country, formatPrice } = useLocation();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (parseFloat(item.product?.price) * item.quantity), 0);
  const token = localStorage.getItem("token");

  const handleCheckout = async () => {
    try {
      // 1. Crear la orden
      const orderRes = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user.id_user,
          total: total.toFixed(2),
          status: "pending",
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error("Error al crear la orden");
      const id_order = orderData.data.id_order;

      // 2. Crear orders_products
      for (const item of cart) {
        await fetch("http://localhost:3000/api/orders_products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_order,
            id_product: item.product.id_product,
            quantity: item.quantity,
            unit_price: item.product.price,
          }),
        });
      }

      // 3. Según el país redirigir a MP o Paypal
      if (country === "AR") {
        const items = cart.map((item) => ({
          title: item.product.title,
          unit_price: parseFloat(item.product.price),
          quantity: item.quantity,
        }));

        console.log("items que se mandan a MP:", items);
        const { init_point } = await createMPPreference(token, items, id_order);
        clearCart();
        window.location.href = init_point;

      } else {
        const items = cart.map((item) => ({
          title: item.product.title,
          unit_price: parseFloat(item.product.price),
          quantity: item.quantity,
        }));

        const { approval_url } = await createPayPalOrder(token, items, id_order);
        clearCart();
        window.location.href = approval_url;
      }

    } catch (error) {
      console.error("Error en el checkout:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#141218] px-16 py-12" style={{ fontFamily: "Space Grotesk" }}>
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <div className="inline-block px-2 py-1 bg-[#ffb4ab] text-[#690005] text-xs font-semibold uppercase tracking-[0.5em] mb-4">
            CHECKOUT
          </div>
          <h1 className="text-[40px] font-bold text-[#e6e0e9] uppercase tracking-tighter leading-none">
            CONFIRMAR_COMPRA
          </h1>
        </div>

        {/* Resumen */}
        <div className="border border-[#494551] mb-8">
          <div className="border-b border-[#494551] px-6 py-3 text-[#cbc4d2] text-xs uppercase tracking-widest">
            RESUMEN_DE_ORDEN
          </div>

          {cart.length === 0 ? (
            <p className="px-6 py-4 text-[#cbc4d2] text-xs uppercase">[CARRITO_VACÍO]</p>
          ) : (
            cart.map((item) => (
              <div key={item.id_item} className="flex justify-between items-center px-6 py-4 border-b border-[#494551]">
                <span className="text-[#e6e0e9] text-sm uppercase">{item.product?.title}</span>
                <span className="text-[#ffb4ab] text-sm">{formatPrice(item.product?.price)}</span>
              </div>
            ))
          )}

          <div className="flex justify-between items-center px-6 py-4">
            <span className="text-[#cbc4d2] text-xs uppercase tracking-widest">TOTAL</span>
            <span className="text-[#ffb4ab] text-xl font-bold">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Info usuario */}
        <div className="border border-[#494551] mb-8 px-6 py-4 space-y-2">
          <p className="text-[#cbc4d2] text-xs uppercase tracking-widest">USUARIO</p>
          <p className="text-[#e6e0e9] text-sm">{user?.email}</p>
          <p className="text-[#cbc4d2] text-xs uppercase tracking-widest mt-2">MÉTODO_DE_PAGO</p>
          <p className="text-[#e6e0e9] text-sm uppercase">
            {country === "AR" ? "MERCADOPAGO" : "PAYPAL"}
          </p>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full py-4 bg-[#ffb4ab] text-[#690005] font-bold uppercase tracking-widest hover:bg-transparent hover:border hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">check_circle</span>
          {country === "AR" ? "PAGAR_CON_MERCADOPAGO" : "PAGAR_CON_PAYPAL"}
        </button>

      </div>
    </section>
  );
}