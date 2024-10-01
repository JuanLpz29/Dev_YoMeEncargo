-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'USUARIO', 'MECANICO');

-- CreateEnum
CREATE TYPE "Servicio" AS ENUM ('ESTANDAR', 'PREMIUM');

-- CreateEnum
CREATE TYPE "Pago" AS ENUM ('PENDIENTE', 'PAGADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR NOT NULL,
    "apellido" VARCHAR NOT NULL,
    "celular" VARCHAR NOT NULL,
    "correo" VARCHAR NOT NULL,
    "contrasena" VARCHAR NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR NOT NULL,
    "modelo" VARCHAR NOT NULL,
    "anio" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "horaInicio" TIMESTAMP NOT NULL,
    "horaFin" TIMESTAMP NOT NULL,
    "servicio" "Servicio" NOT NULL DEFAULT 'ESTANDAR',
    "id_vehiculo" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mecanico" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "certificado" VARCHAR NOT NULL,
    "horario" VARCHAR NOT NULL,
    "valoracion" REAL,
    "url_foto" VARCHAR NOT NULL,

    CONSTRAINT "Mecanico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" SERIAL NOT NULL,
    "id_mecanico" INTEGER NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "reporte" VARCHAR NOT NULL,
    "comentario" TEXT NOT NULL,
    "pago" "Pago" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Mecanico_id_usuario_key" ON "Mecanico"("id_usuario");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "Vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mecanico" ADD CONSTRAINT "Mecanico_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_id_mecanico_fkey" FOREIGN KEY ("id_mecanico") REFERENCES "Mecanico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
