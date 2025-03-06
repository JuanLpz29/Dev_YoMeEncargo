

export class UpdateRevisionDto {

    private constructor(
        public readonly id: number,
        public readonly reporte?: string,
        public readonly comentario?: string,
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};

        if (this.reporte) returnObject.reporte = this.reporte;
        if (this.comentario) returnObject.comentario = this.comentario;


        return returnObject;
    }

    public static create(props: { [key: string]: any }): [string?, UpdateRevisionDto?] {

        const { id, reporte, comentario,  } = props;

        if (!id || isNaN(Number(id))) return ['Id no tiene un valor válido', undefined];

        return [undefined, new UpdateRevisionDto(id, reporte, comentario)];
    }
}