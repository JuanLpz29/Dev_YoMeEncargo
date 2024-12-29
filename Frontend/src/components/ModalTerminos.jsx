const ModalTerminos = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    const content = {
        terminos: {
            title: "Términos de Uso",
            text: `
                1. Aceptación de los Términos
                Al acceder y utilizar YoMeEncargo, aceptas estos términos de uso y te comprometes a cumplirlos.

                2. Uso del Servicio
                - Debes ser mayor de 18 años para usar nuestros servicios
                - La información proporcionada debe ser veraz y precisa
                - Te comprometes a no usar el servicio con fines ilegales

                3. Responsabilidades
                - YoMeEncargo no se hace responsable de daños indirectos
                - Los usuarios son responsables de mantener la confidencialidad de sus cuentas

                4. Modificaciones
                Nos reservamos el derecho de modificar estos términos en cualquier momento
            `
        },
        privacidad: {
            title: "Política de Privacidad",
            text: `
                1. Información que Recolectamos
                - Datos personales: nombre, correo, teléfono
                - Información del vehículo
                - Historial de servicios

                2. Uso de la Información
                - Proporcionar y mejorar nuestros servicios
                - Comunicarnos contigo
                - Procesar pagos y transacciones

                3. Protección de Datos
                - Implementamos medidas de seguridad para proteger tu información
                - No compartimos tus datos con terceros sin tu consentimiento

                4. Tus Derechos
                - Acceder a tus datos personales
                - Solicitar correcciones o eliminación
                - Opt-out de comunicaciones promocionales
            `
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
                // Si el clic fue en el fondo oscuro (no en el contenido del modal)
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()} // Evita que los clics dentro del modal lo cierren
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-myColor">
                            {content[type].title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="prose max-w-none">
                        {content[type].text.split('\n').map((line, index) => (
                            <p key={index} className="mb-2 text-gray-700">
                                {line}
                            </p>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-myColor text-white rounded-md hover:bg-opacity-90"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTerminos;