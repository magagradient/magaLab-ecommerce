const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS  
    }
});

const sendResetEmail = async (to, token) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`; 
    const mailOptions = {
        from: `"Magalab" <${process.env.MAIL_USER}>`,
        to,
        subject: "Restablecer tu contraseña",
        html: `
    <h3>Solicitud de reseteo de contraseña</h3>
    <p>Hacé clic en el siguiente enlace para continuar:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>Este enlace vence en 1 hora.</p>
    `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
