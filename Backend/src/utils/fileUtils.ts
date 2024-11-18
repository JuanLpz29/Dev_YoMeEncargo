import fs from 'fs';

// Función para verificar y crear directorios
export const ensureDirectoriesExist = (directories: string[]) => {
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};
