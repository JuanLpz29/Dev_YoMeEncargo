import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { prisma } from '../../data';
import { UsuarioEntity } from '../../domain';

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provided' });
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ')[1] || '';

        try {
            const payload = await JwtAdapter.validateToken<{ id: string; rol: string }>(token);
            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const user = await prisma.usuario.findUnique({
                where: { id: parseInt(payload.id) }
            });
            if (!user) return res.status(401).json({ error: 'Invalid token - user not found' });

            // Asigna el rol desde el payload del token
            req.body.user = UsuarioEntity.fromObject({ ...user, rol: payload.rol });

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static checkRole(allowedRoles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.body.user as UsuarioEntity;

            // Verifica que el rol en el token coincida con los roles permitidos
            if (!user || !allowedRoles.includes(user.rol)) {
                return res.status(403).json({ error: 'Forbidden - insufficient permissions' });
            }
            next();
        };
    }
}
