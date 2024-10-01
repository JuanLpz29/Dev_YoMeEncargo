import { Router } from 'express';
import { ReservasController } from './controller';


export class ReservasRoutes {

    static get routes(): Router {

        const router = Router();

        const reservasController = new ReservasController();

        router.get('/', reservasController.getReservas);
        router.get('/:id', reservasController.getReservaById);
        router.post('/', reservasController.createReserva);
        router.put('/:id', reservasController.updateReserva);
        router.delete('/:id', reservasController.deleteReserva);

        return router;
    }


}