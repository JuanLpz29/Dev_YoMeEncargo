

export class CreateRevisionDto {

    private constructor(
        public readonly id_mecanico: number,
        public readonly id_reserva: number,
        public readonly reporte: string,
        public readonly comentario: string,

    ) { }

    static create(props: { [key: string]: any }): [string?, CreateRevisionDto?] {

        const id_mecanico = +props.id_mecanico;
        const id_reserva = +props.id_reserva;
        const { reporte, comentario } = props;

        console.log(props);

        if (!id_mecanico || !id_reserva || !reporte || !comentario) {
            return ['No se enviaron todos los campos correctamente', undefined];
        }

        if (isNaN(id_mecanico)) {
            return ['ID de mecánico inválido', undefined];
        }

        if (isNaN(id_reserva)) {
            return ['ID de reserva inválido', undefined];
        }

        return [undefined, new CreateRevisionDto(id_mecanico, id_reserva, reporte, comentario)];

    }

}