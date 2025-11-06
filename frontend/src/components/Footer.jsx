export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© {currentYear} Mi E-commerce. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
