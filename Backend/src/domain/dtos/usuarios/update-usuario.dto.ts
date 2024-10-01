

export class UpdateUsuarioDto {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly apellido?: string,
        public readonly celular?: string,
        public readonly contrasena?: string
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};

        if (this.nombre) returnObject.nombre = this.nombre;
        if (this.apellido) returnObject.apellido = this.apellido;
        if (this.celular) returnObject.celular = this.celular;
        if (this.contrasena) returnObject.contrasena = this.contrasena;

        return returnObject;
    }

    public static create(props: { [key: string]: any }): [string?, UpdateUsuarioDto?] {

        const { id, nombre, apellido, celular, contrasena } = props;

        if (!id || isNaN(Number(id))) return ['Id no tiene un valor válido', undefined];

        return [undefined, new UpdateUsuarioDto(id, nombre, apellido, celular, contrasena)];
    }

}