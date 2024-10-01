import { Router } from 'express';
import { MecanicosController } from './controller';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configuración de multer para guardar archivos
const storageCreate = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = '';

        // Determina la carpeta de destino según el tipo de archivo
        if (file.fieldname === 'certificado') {
            uploadDir = 'uploads/certificados/';
        } else if (file.fieldname === 'foto') {
            uploadDir = 'uploads/foto/';
        }

        // Verifica si el directorio existe; si no, lo crea
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const { id_usuario } = req.body; // Asegúrate de que id_usuario está en el cuerpo de la solicitud

        let newFileName = '';

        // Formatea el nombre según el tipo de archivo
        if (file.fieldname === 'certificado') {
            newFileName = `certificado_${id_usuario}.pdf`; // Cambiar extensión si es necesario
        } else if (file.fieldname === 'foto') {
            newFileName = `avatar_${id_usuario}.png`; // Cambiar extensión si es necesario
        }

        cb(null, newFileName);
    },
});


// Inicialización de multer
const uploadCreate = multer({ storage: storageCreate });

export class MecanicosRoutes {
    static get routes(): Router {
        const router = Router();
        const mecanicosController = new MecanicosController();

        router.get('/', mecanicosController.getMecanicos);
        router.get('/:id', mecanicosController.getMecanicoById);

        const cpUploadCreate = uploadCreate.fields([{ name: 'certificado', maxCount: 1 }, { name: 'foto', maxCount: 1 }]);
        router.post('/', cpUploadCreate, mecanicosController.createMecanico);

        router.delete('/:id', mecanicosController.deleteMecanico);

        return router;
    }
}
