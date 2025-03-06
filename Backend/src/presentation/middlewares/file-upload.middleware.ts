import { NextFunction, Request, Response } from 'express';

export class FileUploadMiddleware {
    static validateMecanicoData = (req: Request, res: Response, next: NextFunction) => {
        const { id_usuario, horario } = req.body;

        // Validar campos requeridos en el cuerpo de la solicitud
        if (!id_usuario) {
            return res.status(400).json({ message: 'El id_usuario es requerido' });
        }

        if (!horario) {
            return res.status(400).json({ message: 'El horario es requerido' });
        }

        // Verificar si los archivos 'certificado' y 'foto' están presentes
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files || !files['certificado'] || !files['foto']) {
            return res.status(400).json({ message: 'Los archivos certificado y foto son requeridos' });
        }

        // Si se pasa la validación, proceder al siguiente middleware
        next();
    };
}
