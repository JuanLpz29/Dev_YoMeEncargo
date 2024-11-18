


export class CreateMecanicoDto {

    private constructor(
        public readonly id_usuario: number,
        public readonly horario: string,
        public readonly certificado: string,
        public readonly url_foto: string,
        public readonly valoracion: number
    ) { }

    public static create(props: { [key: string]: any }): [string?, CreateMecanicoDto?] {

        const { id_usuario, horario, certificado, url_foto } = props;

        if (!certificado) return ['El certificado es requerido'];
        if (!url_foto) return ['La foto es requerida'];
        if (!id_usuario) return ['El id_usuario es requerido'];
        if (!horario) return ['El horario es requerido'];

        const idUsuarioNumber = Number(id_usuario);
        if (isNaN(idUsuarioNumber)) return ['El id_usuario debe ser un número válido'];

        return [undefined, new CreateMecanicoDto(idUsuarioNumber, horario, certificado, url_foto, 0)];

    }

}