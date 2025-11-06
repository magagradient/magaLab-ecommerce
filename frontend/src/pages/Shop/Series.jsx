function Series() {
    return (
        <section className="py-16 px-6 text-center">
            <h1 className="text-4xl font-bold mb-6">Series</h1>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                Cada serie es una colección conceptual de obras digitales que exploran una misma estética, tema o narrativa visual.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Acá va el map con las series más adelante */}
                <div className="border rounded-xl p-6">Serie ejemplo</div>
                <div className="border rounded-xl p-6">Serie ejemplo</div>
                <div className="border rounded-xl p-6">Serie ejemplo</div>
            </div>
        </section>
    );
}

export default Series;
