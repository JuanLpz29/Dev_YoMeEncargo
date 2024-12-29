import { useNavigate } from "react-router-dom";

const ModalReservation = ({onBack, onNext, mechanic, selectedDate, selectedTime }) => {
    const navigate = useNavigate();

    // Formatear la fecha para mostrarla
    const formattedDate = selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString() : 'No seleccionada';
    const formattedTime = selectedTime || 'No seleccionada';


    return (
        <div className="p-6 flex flex-col justify-center items-center max-w-md mx-auto w-full">
            <h3 className="text-2xl font-bold text-myColor text-center">Detalles de la Reserva</h3>
            <div className="bg-offCyan p-4 rounded-md mt-4">
                <p className="text-gray-700 mb-2">
                    <strong>Mecánico:</strong> {mechanic?.name || 'No especificado'}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Fecha:</strong> {formattedDate}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Hora:</strong> {formattedTime}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Servicio:</strong> Estándar
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Valor:</strong> ${mechanic?.price || '30.000'}
                </p>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <button
                    onClick={onNext}
                    className="bg-myColor text-white py-3 px-4 rounded-md hover:bg-myGray hover:text-myColor transition-colors"
                >
                    Ir a pagar
                </button>
                <button
                    onClick={onBack}
                    className="border border-myColor text-myColor py-3 px-4 rounded-md hover:bg-myGray hover:text-white transition-colors"
                >
                    Volver al formulario
                </button>
            </div>
        </div>
    );
};

export default ModalReservation; 