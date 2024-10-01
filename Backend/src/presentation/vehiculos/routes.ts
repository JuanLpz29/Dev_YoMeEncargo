import { Router } from 'express';
import { VehiculosController } from './controller';


export class VehiculosRoutes {

    static get routes(): Router {

        const router = Router();

        const vehiculosController = new VehiculosController();

        router.get('/', vehiculosController.getVehiculos);
        router.get('/:id', vehiculosController.getVehiculoById);
        router.post('/', vehiculosController.createVehiculo);
        router.put('/:id', vehiculosController.updateVehiculo);
        router.delete('/:id', vehiculosController.deleteVehiculo);

        return router;
    }


}