import { Link } from "react-router-dom";

function Cart() {
    // más adelante se va a conectar con el backend
    const cartItems = [];

    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Tu carrito</h1>

            {cartItems.length === 0 ? (
                <div>
                    <p className="text-gray-600 mb-6">Todavía no agregaste productos.</p>
                    <Link
                        to="/shop"
                        className="inline-block px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                    >
                        Ir a la tienda
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto text-left">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b py-4"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-gray-500">${item.price}</p>
                            </div>
                            <button className="text-red-500 hover:underline">Eliminar</button>
                        </div>
                    ))}

                    <div className="text-right mt-10">
                        <p className="text-xl font-semibold mb-4">
                            Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                        </p>
                        <Link
                            to="/cart/checkout"
                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        >
                            Finalizar compra
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Cart;
