const bcrypt = require('bcryptjs');
const { Users } = require('../../database/indexModels'); // ajustá según tu ruta

const emailToUpdate = "carlos@example.com";  // Cambiá por el email que quieras actualizar
const newPlainPassword = "123456";           // Cambiá por la contraseña nueva que quieras

(async () => {
    try {
        const hashed = await bcrypt.hash(newPlainPassword, 10);
        const result = await Users.update(
            { password: hashed },
            { where: { email: emailToUpdate } }
        );

        if (result[0] === 0) {
            console.log(`No se encontró usuario con email ${emailToUpdate}`);
        } else {
            console.log(`Contraseña actualizada para ${emailToUpdate}`);
        }
        process.exit(0);
    } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        process.exit(1);
    }
})();
