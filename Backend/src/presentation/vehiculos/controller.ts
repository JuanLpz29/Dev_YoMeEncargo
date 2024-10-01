import { Request, Response } from 'express';
import { CreateVehiculoDto, UpdateVehiculoDto } from '../../domain/dtos';
import { prisma } from '../../data/postgres';

export class VehiculosController {

    //* DI
    constructor() { }

    public getVehiculos = async (req: Request, res: Response) => {
        const vehiculos = await prisma.vehiculo.findMany();
        return res.json(vehiculos);
    };

    public getVehiculoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

        const vehiculo = await prisma.vehiculo.findFirst({
            where: { id }
        });

        if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });

        return res.json(vehiculo);
    };

    public createVehiculo = async (req: Request, res: Response) => {
        const [error, createVehiculoDto] = CreateVehiculoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const newVehiculo = await prisma.vehiculo.create({
            data: createVehiculoDto!
        });

        return res.json(newVehiculo);
    };

    public updateVehiculo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateVehiculoDto] = UpdateVehiculoDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });

        const vehiculo = await prisma.vehiculo.findFirst({
            where: { id: updateVehiculoDto!.id }
        });

        if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });


        const updatedVehiculo = await prisma.vehiculo.update({
            where: { id },
            data: updateVehiculoDto!.values
        });

        return res.json(updatedVehiculo);
    };

    public deleteVehiculo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

        const vehiculo = await prisma.vehiculo.findFirst({
            where: { id }
        });

        if (!vehiculo) return res.status(404).json({ error: 'Vehículo no encontrado' });

        await prisma.vehiculo.delete({
            where: { id }
        });

        return res.json({ message: 'Vehículo eliminado' });

    };

}