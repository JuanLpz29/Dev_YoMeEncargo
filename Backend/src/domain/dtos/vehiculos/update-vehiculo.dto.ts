

export class UpdateVehiculoDto {

    private constructor(
        public readonly id: number,
        public readonly marca?: string,
        public readonly modelo?: string,
        public readonly anio?: number,
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};

        if (this.marca) returnObject.marca = this.marca;
        if (this.modelo) returnObject.modelo = this.modelo;
        if (this.anio) returnObject.anio = this.anio;

        return returnObject
    }

    public static create(props: { [key: string]: any }): [string?, UpdateVehiculoDto?] {
        const { id, marca, modelo } = props;
        const anio = props.anio ? +props.anio : undefined;
        if (!id || isNaN(Number(id))) return ['ID inválido', undefined];

        (anio)
            ? isNaN(Number(anio))
                ? ['Año inválido', undefined]
                : null
            : null;



        return [undefined, new UpdateVehiculoDto(id, marca, modelo, anio)];
    }

}