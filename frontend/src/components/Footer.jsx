export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© {currentYear} Mi E-commerce. Todos los derechos reservados.</p>
                <p className="footer-links">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>{" "}
                    |{" "}
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>{" "}
                    |{" "}
                    <a href="/contact">Contacto</a>
                </p>
            </div>
        </footer>
    );
}
