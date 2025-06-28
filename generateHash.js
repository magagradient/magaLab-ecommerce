const bcrypt = require("bcryptjs");

async function generateHash() {
    const plainPassword = "123456"; // cambiá por la que quieras
    const hash = await bcrypt.hash(plainPassword, 10);
    console.log(hash);
}

generateHash();
