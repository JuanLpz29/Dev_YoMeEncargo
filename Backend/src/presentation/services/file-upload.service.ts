import path from 'path';
import { Response, Request, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../../domain';
import { ensureDirectoriesExist } from '../../utils/fileUtils';

const uploadDirectories = ['uploads/certificados/', 'uploads/foto/'];
ensureDirectoriesExist(uploadDirectories);

// Configuración del almacenamiento con multer
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'certificado' ? 'uploads/certificados/' : 'uploads/foto/';
        cb(null, path.resolve(__dirname, '../../../', folder));
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExtension}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const validExtensions = ['png', 'gif', 'jpg', 'jpeg'];
        const fileExtension = path.extname(file.originalname).slice(1);
        if (!validExtensions.includes(fileExtension)) {
            return cb(new Error(`Invalid extension: ${fileExtension}, valid ones: ${validExtensions.join(', ')}`) as any, false);
        }
        cb(null, true);
    }
});

export class FileUploadService {
    uploadSingle = upload.single('certificado'); // Cambia 'certificado' por el nombre del campo en tu formulario
    uploadMultiple = upload.fields([
        { name: 'certificado', maxCount: 1 },
        { name: 'foto', maxCount: 1 }
    ]);

    async handleSingleUpload(req: Request, res: Response, next: NextFunction) {
        this.uploadSingle(req, res, (error) => {
            if (error) {
                return next(error);
            }
            res.json({ fileName: req.file?.filename });
        });
    }

    async handleMultipleUpload(req: Request, res: Response, next: NextFunction) {
        this.uploadMultiple(req, res, (error) => {
            if (error) {
                return next(error);
            }
            const fileNames = {
                certificado: (req.files as { [key: string]: Express.Multer.File[] })?.certificado?.[0]?.filename,
                foto: (req.files as { [key: string]: Express.Multer.File[] })?.foto?.[0]?.filename
            };
            res.json(fileNames);
        });
    }

    validateFile(req: Request, res: Response, next: NextFunction) {
        const validExtensions = ['png', 'gif', 'jpg', 'jpeg'];
        
        return this.uploadMultiple(req, res, (error) => {
            if (error) return next(error);
            
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            for (const fileArray of Object.values(files)) {
                const fileExtension = path.extname(fileArray[0].originalname).slice(1);
                if (!validExtensions.includes(fileExtension)) {
                    return next(CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones: ${validExtensions.join(', ')}`));
                }
            }
            next();
        });
    }
}
