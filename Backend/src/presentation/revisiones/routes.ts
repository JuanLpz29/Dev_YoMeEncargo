import { Router } from 'express';
import { RevisionesController } from './controller';
import multer from 'multer';
import fs from 'fs';

export class RevisionesRoutes {

    static get routes(): Router {

        const router = Router();

        const revisionesController = new RevisionesController();

        router.get('/', revisionesController.getRevisiones);
        router.get('/:id', revisionesController.getRevisionById);
        router.post('/', revisionesController.createRevision);
        router.put('/:id', revisionesController.updateRevision);
        router.delete('/:id', revisionesController.deleteRevision);
        router.get('/revisiones/compartir/:id', revisionesController.getRevisionParaCompartir);
        router.post('/revisiones', revisionesController.saveReport);

        return router;
    }


}