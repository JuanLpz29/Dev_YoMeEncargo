import moment from 'moment-timezone';

export class UpdateReservaDto {

    private constructor(
        public readonly id: number,
        public readonly fecha?: Date,
        public readonly horaInicio?: Date,
        public readonly horaFin?: Date,
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};

        if (this.fecha) returnObject.fecha = this.fecha;
        if (this.horaInicio) returnObject.horaInicio = this.horaInicio;
        if (this.horaFin) returnObject.horaFin = this.horaFin;

        return returnObject
    }

    public static create(props: { [key: string]: any }): [string?, UpdateReservaDto?] {
        const { id, fecha, horaInicio, horaFin } = props;
        if (!id || isNaN(Number(id))) return ['ID inválido', undefined];

        

        const chileTimeZone = 'America/Santiago';

        let newFecha = fecha;
        let newHoraInicio = horaInicio;
        let newHoraFin = horaFin;

        // Validar y ajustar fecha
        if (fecha) {
            try {
                newFecha = moment.tz(fecha, chileTimeZone).format();
                if (newFecha === 'Invalid date') {
                    return ['Fecha inválida', undefined];
                }
            } catch (error) {
                return ['Error al procesar la fecha', undefined];
            }
        }

        // Validar y ajustar horaInicio
        if (horaInicio) {
            try {
                if (horaInicio.length <= 5) {
                    // Si solo se pasa una hora ("HH:mm"), la combinamos con la fecha
                    newHoraInicio = moment.tz(`${fecha}T${horaInicio}`, chileTimeZone).format();
                } else {
                    newHoraInicio = moment.tz(horaInicio, chileTimeZone).format();
                }
                if (newHoraInicio === 'Invalid date') {
                    return ['Hora de inicio inválida', undefined];
                }
            } catch (error) {
                return ['Error al procesar la hora de inicio', undefined];
            }
        }

        // Validar y ajustar horaFin
        if (horaFin) {
            try {
                if (horaFin.length <= 5) {
                    // Si solo se pasa una hora ("HH:mm"), la combinamos con la fecha
                    newHoraFin = moment.tz(`${fecha}T${horaFin}`, chileTimeZone).format();
                } else {
                    newHoraFin = moment.tz(horaFin, chileTimeZone).format();
                }
                if (newHoraFin === 'Invalid date') {
                    return ['Hora de fin inválida', undefined];
                }
            } catch (error) {
                return ['Error al procesar la hora de fin', undefined];
            }
        }

        


        return [undefined, new UpdateReservaDto(id, newFecha, newHoraInicio, newHoraFin)];
    }
}