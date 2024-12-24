# Repositorio YoMeEncargo

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