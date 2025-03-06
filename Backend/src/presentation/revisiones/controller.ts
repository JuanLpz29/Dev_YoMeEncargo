import { Request, Response } from 'express';
import { CreateRevisionDto, UpdateRevisionDto } from '../../domain';
import { prisma } from '../../data';

// model Revision {
//   id          Int @id @default (autoincrement())
//   id_mecanico Int @db.Integer
//   id_reserva  Int @db.Integer
//   reporte     String @db.VarChar
//   comentario  String @db.Text
//   pago        Pago @default (PENDIENTE)

//   mecanico Mecanico @relation(fields: [id_mecanico], references: [id])
//   reserva  Reserva @relation(fields: [id_reserva], references: [id])
// }

export class RevisionesController {

    //* DI
    constructor() { }

    public createRevision = async (req: Request, res: Response) => {
        const [error, createRevisionDto] = CreateRevisionDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const newRevision = await prisma.revision.create({
            data: createRevisionDto!
        });

        return res.json(newRevision);
    };

    public getRevisiones = async (req: Request, res: Response) => {
        const revisiones = await prisma.revision.findMany();
        res.json(revisiones);
    };

    public getRevisionById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser un número' });

        const revision = await prisma.revision.findFirst({
            where: { id }
        });

        (revision)
            ? res.json(revision)
            : res.status(404).json({ error: 'Revisión no encontrada' });
    };

    public getRevisionesByMecanico = async (req: Request, res: Response) => {
        const id_mecanico = +req.params.id_mecanico;
        if (isNaN(id_mecanico)) return res.status(400).json({ error: 'El id del mecánico debe ser un número' });
        const revisiones = await prisma.revision.findMany({
            where: { 
                mecanico: {
                    id_usuario: id_mecanico
                }
            },
            include: {
                mecanico: true,
                reserva: {
                    include: {
                        vehiculo: {
                            include: {
                                usuario: true
                            }
                        }
                    }
                }
            }
        });

        (revisiones )
            ? res.json(revisiones)
            : res.status(404).json({ error: 'Revisión no encontrada' });
    };

    public updateRevision = async (req: Request, res: Response) => {
        const { pago } = req.body;
        console.log("req.params.id >>>", req.params.id);
            console.log("req.params.id + >>>", +req.params.id);
            console.log("req.body >>>", req.body);
        const id = +req.params.id;
        const [error, updateRevisionDto] = UpdateRevisionDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });

        const revision = await prisma.revision.findFirst({
            where: { id: updateRevisionDto!.id }
        });

        if (!revision) return res.status(404).json({ error: 'Revisión no encontrada' });

        const updatedRevision = await prisma.revision.update({
            where: { id },
            data: {
                ...updateRevisionDto!.values,
                pago: pago // Asegúrate de usar el valor del enum aquí
            }
        });
        return res.json(updatedRevision);
    };

    public deleteRevision = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser un número' });

        const revision = await prisma.revision.findFirst({
            where: { id }
        });

        if (!revision) return res.status(404).json({ error: 'Revisión no encontrada' });

        await prisma.revision.delete({
            where: { id }
        });

        return res.json({ message: 'Revisión eliminada' });
    };

    async getRevisionParaCompartir(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const revision = await prisma.revision.findUnique({
                where: { id: parseInt(id) },
                include: {
                    mecanico: {
                        include: {
                            usuario: true
                        }
                    },
                    reserva: {
                        include: {
                            vehiculo: true
                        }
                    }
                }
            });

            if (!revision) {
                return res.status(404).json({ error: 'Revisión no encontrada' });
            }

            // Formatear los datos que quieres compartir
            const datosCompartidos = {
                fecha: revision.reserva.fecha,
                mecanico: `${revision.mecanico.usuario.nombre} ${revision.mecanico.usuario.apellido}`,
                vehiculo: `${revision.reserva.vehiculo.marca} ${revision.reserva.vehiculo.modelo}`,
                reporte: revision.reporte,
                comentario: revision.comentario
            };

            return res.json(datosCompartidos);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Error al obtener la revisión' });
        }
    }

    async saveReport(req: Request, res: Response) {
        try {
            const reportData = req.body;
            
            // Crear la revisión en la base de datos
            const revision = await prisma.revision.create({
                data: {
                    id_mecanico: reportData.id_mecanico, // Asegúrate de enviar esto desde el frontend
                    id_reserva: reportData.id_reserva,   // Asegúrate de enviar esto desde el frontend
                    reporte: JSON.stringify(reportData),  // Guardamos todo el reporte como JSON string
                    comentario: reportData.comentarios || '',
                    pago: 'PENDIENTE'
                }
            });

            return res.status(201).json({
                id: revision.id,
                message: 'Reporte guardado exitosamente'
            });
        } catch (error) {
            console.error('Error al guardar el reporte:', error);
            return res.status(500).json({ error: 'Error al guardar el reporte' });
        }
    }
}