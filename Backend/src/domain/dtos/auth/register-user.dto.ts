import { regularExps } from '../../../config';

export class RegisterUserDto {

    private constructor(
        public nombre: string,
        public apellido: string,
        public celular: string,
        public correo: string,
        public contrasena: string
    ) { }

    static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { nombre, apellido, celular, correo, contrasena } = props;

        if (!nombre) return ['Missing name'];
        if (!apellido) return ['Missing last name'];
        if (!celular) return ['Missing phone'];
        if (!regularExps.telefono.test(celular)) return ['Phone is not valid'];
        if (!correo) return ['Missing email'];
        if (!regularExps.email.test(correo)) return ['Email is not valid'];
        if (!contrasena) return ['Missing password'];
        if (contrasena.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(nombre, apellido, celular, correo, contrasena)];
    }


}