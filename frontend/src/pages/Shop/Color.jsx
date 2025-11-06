function Color() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Colores</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Seleccioná las obras por paleta de color o composición cromática.
            </p>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="w-full h-40 rounded-xl bg-pink-400"></div>
                <div className="w-full h-40 rounded-xl bg-blue-400"></div>
                <div className="w-full h-40 rounded-xl bg-green-400"></div>
                <div className="w-full h-40 rounded-xl bg-yellow-400"></div>
            </div>
        </section>
    );
}

export default Color;
