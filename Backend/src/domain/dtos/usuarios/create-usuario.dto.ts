


export class CreateUsuarioDto {

    private constructor(
        public readonly nombre: string,
        public readonly apellido: string,
        public readonly celular: string,
        public readonly correo: string,
        public readonly contrasena: string
    ) { }

    public static create(props: { [key: string]: any }): [string?, CreateUsuarioDto?] {

        const { nombre, apellido, celular, correo, contrasena } = props;

        if (!nombre || !apellido || !celular || !correo || !contrasena) return ['No se enviaron todos los campos', undefined];

        return [undefined, new CreateUsuarioDto(nombre, apellido, celular, correo, contrasena)];
    }

}