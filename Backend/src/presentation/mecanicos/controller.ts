import { Request, Response } from 'express';
import { prisma } from '../../data';
import { CreateMecanicoDto, UpdateMecanicoDto } from '../../domain';
import fs from 'fs';
import path from 'path';

interface Files {
    [fieldname: string]: Express.Multer.File[];
}

export class MecanicosController {

    //* DI
    constructor() { }

    public createMecanico = async (req: Request, res: Response) => {
        const files: Files | undefined = req.files as Files;
        const certificado = files['certificado'] ? files['certificado'][0].filename : null;
        const url_foto = files['foto'] ? files['foto'][0].filename : null;

        try {
            const [error, createMecanicoDto] = CreateMecanicoDto.create({ ...req.body, certificado, url_foto });
            if (error) {
                this.deleteFiles(certificado, url_foto);
                return res.status(400).json({ error });
            }

            const userExists = await prisma.usuario.findUnique({
                where: { id: createMecanicoDto!.id_usuario }
            });
            if (!userExists) {
                this.deleteFiles(certificado, url_foto);
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const mecanicoExists = await prisma.mecanico.findUnique({
                where: { id_usuario: createMecanicoDto!.id_usuario }
            });
            if (mecanicoExists) {
                this.deleteFiles(certificado, url_foto);
                return res.status(400).json({ message: 'El usuario ya es un mecánico' });
            }

            const newMecanico = await prisma.mecanico.create({
                data: createMecanicoDto!
            });

            return res.json(newMecanico);
        } catch (error) {
            this.deleteFiles(certificado, url_foto);
            return res.status(500).json({ message: 'Error al crear el mecánico' });
        }
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


    private deleteFiles(certificado: string | null, url_foto: string | null) {
        if (certificado) {
            const certificadoPath = path.join(__dirname, '../../../uploads/certificados', certificado);
            console.log(`Trying to delete certificado: ${certificadoPath}`); // Verifica la ruta
            fs.unlink(certificadoPath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${certificado}:`, err);
                } else {
                    console.log(`Successfully deleted certificado: ${certificado}`);
                }
            });
        }

        if (url_foto) {
            const fotoPath = path.join(__dirname, '../../../uploads/fotos', url_foto);
            console.log(`Trying to delete foto: ${fotoPath}`); // Verifica la ruta
            fs.unlink(fotoPath, (err) => {
                if (err) {
                    console.error(`Error deleting file ${url_foto}:`, err);
                } else {
                    console.log(`Successfully deleted foto: ${url_foto}`);
                }
            });
        }
    }


}