import { Router } from 'express';
import { AuthRoutes, MecanicosRoutes, ReservasRoutes, RevisionesRoutes, UsuariosRoutes, VehiculosRoutes } from '.';






export class AppRoutes {


    static get routes(): Router {

        const router = Router();

        router.use('/api/usuarios', UsuariosRoutes.routes);
        router.use('/api/mecanicos', MecanicosRoutes.routes);
        router.use('/api/vehiculos', VehiculosRoutes.routes);
        router.use('/api/reservas', ReservasRoutes.routes);
        router.use('/api/revisiones', RevisionesRoutes.routes);

        router.use('/api/auth', AuthRoutes.routes);


        return router;
    }


}