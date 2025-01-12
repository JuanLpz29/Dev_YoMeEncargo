import { Router } from 'express';
import { FilesController } from './controller';


export class FilesRoutes {

  static get routes(): Router {

    const router = Router();

    const filesController = new FilesController();

    // Rutas para archivos
    router.get('/certificados/:filename', filesController.getCertificado);
    router.get('/fotos/:filename', filesController.getFoto);

    return router;
  }


}