import { Router } from 'express';
import { MecanicosController } from './controller';
import { uploadCreate } from '../../config';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class MecanicosRoutes {
    static get routes(): Router {
        const router = Router();
        const mecanicosController = new MecanicosController();

        router.get('/', [AuthMiddleware.validateJWT, AuthMiddleware.checkRole(['USUARIO'])], mecanicosController.getMecanicos);
        router.get('/:id', mecanicosController.getMecanicoById);

        const cpUploadCreate = uploadCreate.fields([
            { name: 'certificado', maxCount: 1 },
            { name: 'foto', maxCount: 1 }
        ]);
        router.post('/', [AuthMiddleware.validateJWT, AuthMiddleware.checkRole(['MECANICO'])], cpUploadCreate, mecanicosController.createMecanico);

        router.delete('/:id', mecanicosController.deleteMecanico);

        return router;
    }
}
