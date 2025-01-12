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

        if (fecha) {
            try {
                newFecha = moment.tz(fecha, ['DD/M/YYYY', 'DD/MM/YYYY', 'D/MM/YYYY', 'D/M/YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'DD-MM-YYYY'], true, chileTimeZone).format();
                if (newFecha === 'Invalid date') {
                    return ['Fecha inválida', undefined];
                }
            } catch (error) {
                return ['Error al procesar la fecha', undefined];
            }
        }

        if (horaInicio) {
            try {
                if (horaInicio.length <= 5) {
                    newHoraInicio = moment.tz(newFecha.split('T')[0] + `T${horaInicio}`, chileTimeZone).format();
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

        if (horaFin) {
            try {
                if (horaFin.length <= 5) {
                    newHoraFin = moment.tz(newFecha.split('T')[0] + `T${horaFin}`, chileTimeZone).format();
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

        if (newFecha) {
            newFecha = moment.tz(newFecha, chileTimeZone).utc().format();
        }

        if (newHoraInicio) {
            newHoraInicio = moment.tz(newHoraInicio, chileTimeZone).utc().format();
        }

        if (newHoraFin) {
            newHoraFin = moment.tz(newHoraFin, chileTimeZone).utc().format();
        }

        return [undefined, new CreateReservaDto(newFecha, newHoraInicio, newHoraFin, id_vehiculo, ubicacion)];
    }
}
