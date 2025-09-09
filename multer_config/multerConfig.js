// /multer_config/multerConfig.js
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    // destination controla onde iremos armazenar os arquivos enviados
    destination: "uploads/produtos",
    // cb é só uma função de retorno que o Multer te entrega na função do diskStorage.
    filename: (req, file, cb) => {
        // Chamamos cb(null, "nome.ext") para dizer o nome do arquivo
        cb(null, Date.now() + (path.extname(file.originalname) || ""));
    }
});
const uploadImagem = multer({ storage });
module.exports = uploadImagem;