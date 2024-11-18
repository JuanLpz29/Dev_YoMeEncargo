import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { ensureDirectoriesExist } from '../utils/fileUtils';
import { Request } from 'express';
import { Uuid } from './';

// Verificar y crear directorios
const uploadDirectories = ['uploads/certificados/', 'uploads/fotos/'];
ensureDirectoriesExist(uploadDirectories);

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

export const storageCreate = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadDir = file.fieldname === 'certificado'
            ? 'uploads/certificados/'
            : 'uploads/fotos/';
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const uuidName = Uuid.generate();

        const newFileName = `${uuidName}${extension}`;
        cb(null, newFileName);
    },
});

// Filtro para tipos de archivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    // Verificación del tipo de archivo para 'foto'
    if (file.fieldname === 'foto' && !allowedImageTypes.includes(file.mimetype)) {
        cb(new Error('Solo se permiten imágenes en formato JPEG, PNG, o GIF'));
        return;
    }

    cb(null, true); // Si pasa todas las validaciones, permite el archivo
};

export const uploadCreate = multer({
    storage: storageCreate,
    fileFilter,
});
