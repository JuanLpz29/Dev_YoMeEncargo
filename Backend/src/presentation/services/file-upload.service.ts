import path from 'path';
import { Response, Request } from 'express';
import multer, { StorageEngine } from 'multer';
import { Uuid } from '../../config';
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
        const fileName = `${Uuid.v4()}${fileExtension}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const validExtensions = ['png', 'gif', 'jpg', 'jpeg'];
        const fileExtension = path.extname(file.originalname).slice(1);
        if (!validExtensions.includes(fileExtension)) {
            return cb(CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones: ${validExtensions.join(', ')}`));
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

    async handleSingleUpload(req: any, res: any, next: any) {
        this.uploadSingle(req, res, (error) => {
            if (error) {
                return next(error);
            }
            res.json({ fileName: req.file.filename });
        });
    }

    async handleMultipleUpload(req: any, res: any, next: any) {
        this.uploadMultiple(req, res, (error) => {
            if (error) {
                return next(error);
            }
            const fileNames = {
                certificado: req.files['certificado'][0].filename,
                foto: req.files['foto'][0].filename
            };
            res.json(fileNames);
        });
    }
}
