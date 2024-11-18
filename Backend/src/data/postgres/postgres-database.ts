import { PrismaClient, Rol, Servicio, Pago } from "@prisma/client";



export const prisma = new PrismaClient();

export const RolEnum = {
    ADMIN: Rol.ADMIN,
    USUARIO: Rol.USUARIO,
    MECANICO: Rol.MECANICO
}

export const ServicioEnum = {
    ESTANDAR: Servicio.ESTANDAR,
    PREMIUM: Servicio.PREMIUM
}

export const PagoEnum = {
    PENDIENTE: Pago.PENDIENTE,
    PAGADO: Pago.PAGADO
}