import { useState } from "react";

function Checkout() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
    };

    return (
        <section className="py-16 px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Finalizar compra</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-8 space-y-6"
            >
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Dirección
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                >
                    Confirmar pedido
                </button>
            </form>
        </section>
    );
}

export default Checkout;
