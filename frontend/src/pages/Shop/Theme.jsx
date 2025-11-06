function Theme() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Temas</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Cada tema representa un universo simbólico distinto: sueños, transformación, tiempo, energía, introspección.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="border rounded-xl p-6">Sueños</div>
                <div className="border rounded-xl p-6">Transformación</div>
                <div className="border rounded-xl p-6">Luz / Sombra</div>
            </div>
        </section>
    );
}

export default Theme;
