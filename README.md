# Acerca del Repositorio YoMeEncargo
Repositorio de mi proyecto de tesis. Desarrollo de Aplicación Web Progresiva (PWA) para Yo Me Encargo.
Una guía paso a paso del trabajo realizado puede verse en el siguiente enlace:                                                                                                                                      
https://ember-check-3c8.notion.site/DEV-YmE-b68798bad944471494a328bdcf5c7e5f

# Instrucciones de uso

## Ejecutar backend

cd backend
docker compose up -d
npm i
npx prisma migrate dev --name init
npm run dev

## Ejecutar frontend

cd frontend
npm i
npm run dev
