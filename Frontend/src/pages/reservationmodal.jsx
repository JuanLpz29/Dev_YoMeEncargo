import React from "react";
import { useNavigate } from "react-router-dom";


const ReservationModal = ({ reservationDetails }) => {
    const navigate = useNavigate();

    const {
        mechanic = "JOHN DOE",
        date = "25/11/2024",
        time = "15:00",
        service = "ESTÁNDAR",
        price = "30000",
    } = reservationDetails || {};


    const handleNavigateToPayment = () => {
        navigate("/handlerpayment", {
            state: { mechanic, date, time, service, price }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">Detalles de la Reserva</h3>
                    <div className="bg-gray-100 p-4 rounded-md mt-4 text-center">
                        <p className="text-gray-700">
                            <strong>Mecánico:</strong> {mechanic}
                        </p>
                        <p className="text-gray-700">
                            <strong>Fecha:</strong> {date}
                        </p>
                        <p className="text-gray-700">
                            <strong>Hora:</strong> {time}
                        </p>
                        <p className="text-gray-700">
                            <strong>Servicio:</strong> {service}
                        </p>
                        <p className="text-gray-700">
                            <strong>Valor:</strong> ${price}
                        </p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleNavigateToPayment}
                            className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 
                                    focus:ring-purple-500 focus:ring-opacity-50 transition-colors">
                            Ir a pagar
                        </button>
                    </div>
                    <p className="text-center text-gray-600 mt-4">
                        ¿No estás seguro de los datos ingresados?
                    </p>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 
                                    focus:ring-purple-500 focus:ring-opacity-50 transition-colors">
                            Volver al formulario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
