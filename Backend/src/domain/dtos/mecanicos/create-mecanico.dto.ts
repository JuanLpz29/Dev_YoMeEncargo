


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

        if (!id_usuario || !horario || !certificado || !url_foto) return ['No se enviaron todos los campos', undefined];

        return [undefined, new CreateMecanicoDto(id_usuario, horario, certificado, url_foto, 0)];

    }

}