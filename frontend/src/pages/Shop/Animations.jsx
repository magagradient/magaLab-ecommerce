function Animations() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Animaciones</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Piezas digitales animadas, loops visuales y experimentos de arte generativo.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="border rounded-xl p-6">Animación 1</div>
                <div className="border rounded-xl p-6">Animación 2</div>
                <div className="border rounded-xl p-6">Animación 3</div>
            </div>
        </section>
    );
}

export default Animations;
