
# Acerca del Repositorio YoMeEncargo  
Este repositorio contiene el desarrollo de mi proyecto de tesis: **Yo Me Encargo**, una Aplicación Web Progresiva (PWA) diseñada para facilitar servicios de mecánicos para la revisión pre-compra de vehículos usados.  

Para ver una guía detallada paso a paso con fines educativos, puedes consultar el siguiente enlace a Notion:  
[Guía de Desarrollo](https://ember-check-3c8.notion.site/DEV-YmE-b68798bad944471494a328bdcf5c7e5f)

# Instrucciones de uso  

## Ejecutar backend  

Accede a la carpeta del backend:
   ```bash
   cd backend
   ```
Inicia los contenedores de Docker:
   ```bash
   docker compose up -d
   ```
Instala las dependencias:
   ```bash
   npm i
   ```
Realiza la migración de Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```
Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Ejecutar frontend

Accede a la carpeta del frontend:
```bash
cd frontend
```
Instala las dependencias:
```bash
npm i
```
Inicia el servidor de desarrollo del frontend:
```bash
npm run dev
```
