
import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { prisma, RolEnum, ServicioEnum, PagoEnum } from '../../data/'
import { RegisterUserDto, LoginUserDto, CustomError, UsuarioEntity } from '../../domain/'






export class AuthService {

    constructor() { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const { nombre, apellido, celular, correo, contrasena } = registerUserDto;

        const existUser = await prisma.usuario.findFirst({
            where: {
                correo: correo
            }
        });

        if (existUser) {
            throw CustomError.badRequest('El correo ya está en uso');
        }

        try {
            const hashedPassword = await bcryptAdapter.hash(contrasena);

            const newContribuyente = await prisma.usuario.create({
                data: {
                    nombre: nombre,
                    apellido: apellido,
                    celular: celular,
                    correo: correo,
                    contrasena: hashedPassword,
                }
            });

            // TODO: Enviar el correo de validación (simulado)

            const { contrasena: _, ...usuarioEntity } = newContribuyente;

            const token = await JwtAdapter.generateToken({ id: newContribuyente.id });
            if (!token) throw CustomError.internalServer('Error al generar el token JWT');

            return {
                user: usuarioEntity,
                token: token,
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const { correo, contrasena } = loginUserDto;

        const user = await prisma.usuario.findFirst({
            where: {
                correo: correo
            }
        });

        if (!user) {
            throw CustomError.badRequest('Usuario no encontrado');
        }

        const isValidPassword = await bcryptAdapter.compare(contrasena, user.contrasena);

        if (!isValidPassword) {
            throw CustomError.badRequest('Contraseña incorrecta');
        }

        const { contrasena: _, ...usuarioEntity } = UsuarioEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id, rol:user.rol });
        if (!token) throw CustomError.internalServer('Error al generar el token JWT');

        return {
            user: usuarioEntity,
            token: token,
        };

    }

    //TODO: Implementar
    private sendEmailValidationLink = async (email: string) => { }

    //TODO: Implementar
    public validateEmail = async (token: string) => { }
}