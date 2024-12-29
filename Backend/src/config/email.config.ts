import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Acceder a las variables de entorno usando process.env
export const emailConfig = {
    transporter: nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRET_KEY,
        },
    }),

    sendWelcomeEmail: async (userEmail: string, userName: string) => {
        try {
            const mailOptions = {
                from: '"YoMeEncargo" <' + process.env.MAILER_EMAIL + '>',
                to: userEmail,
                subject: "¡Bienvenido a YoMeEncargo!",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #43a6e8; text-align: center;">¡Bienvenido a YoMeEncargo!</h1>
                        <p>Hola ${userName},</p>
                        <p>Gracias por registrarte en YoMeEncargo. Estamos emocionados de tenerte con nosotros.</p>
                        <p>Con tu cuenta podrás:</p>
                        <ul>
                            <li>Encontrar mecánicos de confianza rápidamente</li>
                            <li>Agendar revisiones con flexibilidad horaria</li>
                            <li>Acceder a un reporte de revisión hecho por el mecánico</li>
                        </ul>
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="${process.env.FRONTEND_URL}/login" 
                                style="background-color: #43a6e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                                Iniciar Sesión
                            </a>
                        </div>
                        <p style="margin-top: 20px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
                        <p>¡Gracias por confiar en nosotros!</p>
                        <p>El equipo de YoMeEncargo</p>
                    </div>
                `,
            };

            await emailConfig.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error("Error sending welcome email:", error);
            return false;
        }
    },
};
