import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateMecanicoDto, UpdateMecanicoDto } from '../../domain/dtos';

interface Files {
    [fieldname: string]: Express.Multer.File[];
}

export class MecanicosController {

    //* DI
    constructor() { }

    public createMecanico = async (req: Request, res: Response) => {

        const files: Files | undefined = req.files as Files;
        const certificado = files['certificado'] ? files['certificado'][0].filename : null;
        const foto = files['foto'] ? files['foto'][0].filename : null;

        if (!certificado || !foto) {
            return res.status(400).json({ message: 'No se enviaron todos los archivos' });
        }

        const id_usuario = +req.body.id_usuario;
        if (!id_usuario) return res.status(400).json({ message: 'ID de usuario inválido' });

        const horario = req.body.horario;

        const mecanicoData = {
            id_usuario: id_usuario,
            horario: horario,
            certificado: certificado,
            url_foto: foto
        };

        const [error, createMecanicoDto] = CreateMecanicoDto.create(mecanicoData);
        if (error) return res.status(400).json({ error });

        const newMecanico = await prisma.mecanico.create({
            data: createMecanicoDto!
        });

        return res.json(newMecanico);

    };

    public getMecanicos = async (req: Request, res: Response) => {
        const mecanicos = await prisma.mecanico.findMany();
        res.json(mecanicos);
    };

    public getMecanicoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!id) return res.status(400).json({ message: 'ID inválido' });

        const mecanico = await prisma.mecanico.findUnique({
            where: { id: id }
        });

        if (!mecanico) {
            return res.status(404).json({ message: 'Mecánico no encontrado' });
        }

        res.json(mecanico);
    };

    public updateMecanico = async (req: Request, res: Response) => {

    };

    public deleteMecanico = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!id) return res.status(400).json({ message: 'ID inválido' });

        const mecanico = await prisma.mecanico.findUnique({
            where: { id: id }
        });

        if (!mecanico) {
            return res.status(404).json({ message: 'Mecánico no encontrado' });
        }

        await prisma.mecanico.delete({
            where: { id: id }
        });

        res.json({ message: 'Mecánico eliminado' });
    };

}