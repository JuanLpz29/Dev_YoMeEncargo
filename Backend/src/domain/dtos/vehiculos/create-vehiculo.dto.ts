


export class CreateVehiculoDto {

    private constructor(
        public readonly id_usuario: number,
        public readonly marca: string,
        public readonly modelo: string,
        public readonly anio: number,
        public readonly patente: string,
    ) { }

    public static create(props: { [key: string]: any }): [string?, CreateVehiculoDto?] {

        const id_usuario = +props.id_usuario;
        const anio = +props.anio;

        if (isNaN(id_usuario)) return ['ID de usuario inválido', undefined];
        if (isNaN(anio)) return ['Año inválido', undefined];

        const { marca, modelo, patente } = props;

        if (!id_usuario || !marca || !modelo || !anio || !patente) return ['No se enviaron todos los campos', undefined];

        return [undefined, new CreateVehiculoDto(id_usuario, marca, modelo, anio, patente)];
    }

}
