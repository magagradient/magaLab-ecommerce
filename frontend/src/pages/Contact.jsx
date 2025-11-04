export default function Contact() {
    return (
        <section className="contact">
            <div className="contact-container">
                <h1>Contacto</h1>
                <p>¿Tenés alguna duda, propuesta o querés colaborar? Escribime 🙂</p>

                <form className="contact-form">
                    <input type="text" placeholder="Tu nombre" required />
                    <input type="email" placeholder="Tu correo" required />
                    <textarea placeholder="Tu mensaje" rows="5" required></textarea>
                    <button type="submit">Enviar mensaje</button>
                </form>
            </div>
        </section>
    );
}
