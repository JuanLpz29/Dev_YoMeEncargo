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
        console.log(req.body);
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

    public updateRevision = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateRevisionDto] = UpdateRevisionDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });

        const revision = await prisma.revision.findFirst({
            where: { id: updateRevisionDto!.id }
        });

        if (!revision) return res.status(404).json({ error: 'Revisión no encontrada' });

        const updatedRevision = await prisma.revision.update({
            where: { id },
            data: updateRevisionDto!.values
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
}