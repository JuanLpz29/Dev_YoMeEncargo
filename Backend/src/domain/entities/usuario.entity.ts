import { CustomError } from '../index';

export class UsuarioEntity {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public celular: string,
        public correo: string,
        public contrasena: string,
        public rol: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { id, nombre, apellido, celular, correo, contrasena, rol } = object;

        if (id == null) throw CustomError.badRequest('Missing id');
        if (!nombre) throw CustomError.badRequest('Missing nombre');
        if (!apellido) throw CustomError.badRequest('Missing apellido');
        if (!celular) throw CustomError.badRequest('Missing celular');
        if (!correo) throw CustomError.badRequest('Missing correo');
        if (!contrasena) throw CustomError.badRequest('Missing contrasena');
        if (!rol) throw CustomError.badRequest('Missing rol');

        return new UsuarioEntity(id, nombre, apellido, celular, correo, contrasena, rol);
    }
}
