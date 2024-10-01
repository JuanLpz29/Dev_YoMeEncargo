import { Router } from 'express';

import { UsuariosRoutes } from './usuarios/routes';
import { MecanicosRoutes } from './mecanicos/routes';
import { VehiculosRoutes } from './vehiculos/routes';
import { ReservasRoutes } from './reservas/routes';
import { RevisionesRoutes } from './revisiones/routes';




export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        router.use('/api/usuarios', UsuariosRoutes.routes);
        router.use('/api/mecanicos', MecanicosRoutes.routes);
        router.use('/api/vehiculos', VehiculosRoutes.routes);
        router.use('/api/reservas', ReservasRoutes.routes);
        router.use('/api/revisiones', RevisionesRoutes.routes);


        return router;
    }


}