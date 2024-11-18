import moment from 'moment-timezone';

export class CreateReservaDto {
    constructor(
        public readonly fecha: Date,
        public readonly horaInicio: Date,
        public readonly horaFin: Date,
        public readonly id_vehiculo: number,
        public readonly ubicacion: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateReservaDto?] {
        const { fecha, horaInicio, horaFin, ubicacion } = props;
        const id_vehiculo = +props.id_vehiculo;

        // Validaciones de campos obligatorios
        if (!fecha || !horaInicio || !horaFin || !id_vehiculo || !ubicacion) {
            return ['No se enviaron todos los campos correctamente', undefined];
        }

        if (isNaN(id_vehiculo)) {
            return ['ID de vehículo inválido', undefined];
        }

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

        // Devolver el nuevo DTO con las fechas ajustadas
        return [undefined, new CreateReservaDto(newFecha, newHoraInicio, newHoraFin, id_vehiculo, ubicacion)];
    }
}
