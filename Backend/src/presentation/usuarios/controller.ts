import { Request, Response } from 'express';
import { prisma } from '../../data';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../../domain';

export class UsuariosController {

    //* DI
    constructor() { }


    public getUsuarios = async (req: Request, res: Response) => {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    };

    public getUsuarioById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser un número' });

        const usuario = await prisma.usuario.findFirst({
            where: { id }
        });

        if (usuario) {
            const { contrasena, ...usuarioSinContrasena } = usuario;
            return res.json(usuarioSinContrasena);
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    };

    public createUsuario = async (req: Request, res: Response) => {
        const [error, createUsuarioDto] = CreateUsuarioDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const existeCorreo = await this.validateEmail(createUsuarioDto!.correo);
        if (existeCorreo) {
            return res.status(400).json({ error: 'El correo ya está en uso' });
        }

        const newUsuario = await prisma.usuario.create({
            data: createUsuarioDto!
        });

        return res.json(newUsuario);
    };

    public updateUsuario = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const [error, updateUsuarioDto] = UpdateUsuarioDto.create({ id, ...req.body });
            
            if (error) {
                return res.status(400).json({ error });
            }

            const usuario = await prisma.usuario.findFirst({
                where: { id: updateUsuarioDto!.id }
            });

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const updatedUsuario = await prisma.usuario.update({
                where: { id },
                data: updateUsuarioDto!.values
            });

            return res.json(updatedUsuario);
            
        } catch (error) {
            return res.status(500).json({ 
                error: 'Error al actualizar usuario',
                message: (error as Error).message 
            });
        }
    };

    public deleteUsuario = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'El id debe ser un número' });

        const usuario = await prisma.usuario.findFirst({
            where: { id }
        });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        await prisma.usuario.delete({
            where: { id }
        });

        res.json({ message: 'Usuario eliminado' });
    };

    // Otras Funciones

    // Función para validar si el correo ya está en uso
    private validateEmail = async (email: string): Promise<boolean> => {
        const existeCorreo = await prisma.usuario.findFirst({
            where: { correo: email }
        });

        // Retorna verdadero si el correo ya está en uso, falso en caso contrario
        return !!existeCorreo;
    };

}