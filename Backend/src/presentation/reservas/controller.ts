import { Request, Response } from 'express';
import { CreateReservaDto } from '../../domain/dtos/reservas/create-reserva.dto';
import { UpdateReservaDto } from '../../domain';
import { prisma } from '../../data';
import moment from 'moment-timezone';

export class ReservasController {

    //* DI
    constructor() { }

    public getReservas = async (req: Request, res: Response) => {
        const reservas = await prisma.reserva.findMany();

        // Convertir las fechas recuperadas a la zona horaria de Chile
        const reservasConZonaHoraria = reservas.map(reserva => ({
            ...reserva,
            fecha: moment.tz(reserva.fecha, 'UTC').tz('America/Santiago').format(),
            horaInicio: moment.tz(reserva.horaInicio, 'UTC').tz('America/Santiago').format(),
            horaFin: moment.tz(reserva.horaFin, 'UTC').tz('America/Santiago').format(),
        }));

        return res.json(reservasConZonaHoraria);
    };


    public getReservaById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
        const reserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

        // Convertir las fechas recuperadas a la zona horaria de Chile
        const reservaConZonaHoraria = {
            ...reserva,
            fecha: moment.tz(reserva.fecha, 'UTC').tz('America/Santiago').format(),
            horaInicio: moment.tz(reserva.horaInicio, 'UTC').tz('America/Santiago').format(),
            horaFin: moment.tz(reserva.horaFin, 'UTC').tz('America/Santiago').format(),
        };

        return res.json(reservaConZonaHoraria);
    };

    public createReserva = async (req: Request, res: Response) => {

        const [error, createReservaDto] = CreateReservaDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const newReserva = await prisma.reserva.create({
            data: createReservaDto!
        });

        return res.json(newReserva);

    };

    public updateReserva = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateReservaDto] = UpdateReservaDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });

        const updatedReserva = await prisma.reserva.update({
            where: { id },
            data: updateReservaDto!.values
        });

        return res.json(updatedReserva);

    };

    public deleteReserva = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

        const reserva = await prisma.reserva.findUnique({
            where: { id }
        });

        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

        await prisma.reserva.delete({
            where: { id }
        });

        return res.json({ message: 'Reserva eliminada' });
    };
}