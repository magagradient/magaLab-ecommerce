function Style() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Estilos</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Explorá las obras según su estilo visual: desde el glitch y lo abstracto hasta lo minimalista o experimental.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="border rounded-xl p-6">Glitch</div>
                <div className="border rounded-xl p-6">Minimal</div>
                <div className="border rounded-xl p-6">Abstracto</div>
            </div>
        </section>
    );
}

export default Style;
