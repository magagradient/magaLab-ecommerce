const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Carpeta donde se guardan las imágenes
const uploadDir = path.join(__dirname, "../../uploads/products");

// Crea la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `product-${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
