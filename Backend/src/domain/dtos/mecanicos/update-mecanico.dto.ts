


export class UpdateMecanicoDto {

    private constructor(
        public readonly id: number,
        public readonly horario?: string,
        public readonly certificado?: string,
        public readonly url_foto?: string,
        public readonly valoracion?: number
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};

        returnObject.horario = this.horario;
        returnObject.certificado = this.certificado;
        returnObject.url_foto = this.url_foto;

        return returnObject;
    }

    public static create(props: { [key: string]: any }): [string?, UpdateMecanicoDto?] {

        const { id, horario, certificado, url_foto } = props;

        if (!id || isNaN(Number(id))) return ['Id no tiene un valor válido', undefined];

        if (!horario || !certificado || !url_foto) return ['No se enviaron todos los campos', undefined];

        return [undefined, new UpdateMecanicoDto(id, horario, certificado, url_foto, 0)];

    }

}