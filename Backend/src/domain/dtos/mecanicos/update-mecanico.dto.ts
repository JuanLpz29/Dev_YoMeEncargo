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
        if (this.certificado !== null) returnObject.certificado = this.certificado;
        if (this.url_foto !== null) returnObject.url_foto = this.url_foto;
        returnObject.valoracion = this.valoracion;

        return returnObject;
    }

    public static create(props: { [key: string]: any }): [string?, UpdateMecanicoDto?] {

        const { id, horario, certificado, url_foto, valoracion } = props;
        

        if (!id || isNaN(Number(id))) return ['Id no tiene un valor válido', undefined];

        if (!horario && !certificado && !url_foto && valoracion === undefined) {
            return ['No se enviaron valores para actualizar', undefined];
        }

        if (valoracion !== undefined) {
            const valoracionNum = Number(valoracion);
            if (isNaN(valoracionNum)) return ['Valoración debe ser un número válido', undefined];
        }

        return [undefined, new UpdateMecanicoDto(id, horario, certificado, url_foto, valoracion !== undefined ? Number(valoracion) : undefined)];

    }

}