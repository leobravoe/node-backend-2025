const DataBase = require('../database/DataBase');
const fs = require('fs').promises;
const path = require('path');
(async () => {
    try {
        // Define o local da pasta uploads
        const uploadsDir = path.resolve('uploads');
        // Remove toda a pasta /uploads (se existir)
        await fs.rm(uploadsDir, { recursive: true, force: true });
        // Recria a estrutura mínima para o Multer
        await fs.mkdir(path.join(uploadsDir, 'produtos'), { recursive: true });
        // Executa o SQL
        await DataBase.executeSQLFile('database/sqlbanco.sql');
    } catch (error) {
        console.error('Erro ao executar o arquivo SQL:', error);
    }
})();