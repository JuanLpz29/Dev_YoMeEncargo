import { Router } from 'express';
import { MecanicosController } from './controller';
import { uploadCreate } from '../../config';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class MecanicosRoutes {
    static get routes(): Router {
        const router = Router();
        const mecanicosController = new MecanicosController();

        router.get('/', mecanicosController.getMecanicos);
        router.get('/with-user', mecanicosController.getMecanicosWithUser);
        router.get('/:id', [AuthMiddleware.validateJWT], mecanicosController.getMecanicoById);

        const cpUploadCreate = uploadCreate.fields([
            { name: 'certificado', maxCount: 1 },
            { name: 'foto', maxCount: 1 }
        ]);
        router.post('/', [AuthMiddleware.validateJWT], cpUploadCreate, mecanicosController.createMecanico);

        const cpUploadUpdate = uploadCreate.fields([
            { name: 'certificado', maxCount: 1 },
            { name: 'foto', maxCount: 1 }
        ]);
        router.put('/:id', [AuthMiddleware.validateJWT], cpUploadUpdate, mecanicosController.updateMecanico);

        router.delete('/:id', mecanicosController.deleteMecanico);

        return router;
    }
}
