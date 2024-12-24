import React, { useState } from 'react';
import { X, CreditCard, HandCoins, Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, onComplete, mechanic, date, time, service, price }) => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();



    const handlePaymentComplete = () => {
        setStep(3);
        // In a real application, you would process the payment here

    };

    const handlePaymentMethodSelect = (method) => {
        setStep(2);
        // You can handle the selected payment method here
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {step === 1 && "Seleccionar método de pago"}
                        {step === 2 && "Confirmar pago"}
                        {step === 3 && "Comprobante"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-full p-1"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <button
                                onClick={() => handlePaymentMethodSelect('card')}
                                className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <div className="flex items-center">
                                    <CreditCard className="text-purple-600 mr-3" size={24} />
                                    <span className="font-medium">Tarjeta de débito</span>
                                </div>
                            </button>
                            <button
                                onClick={() => handlePaymentMethodSelect('cash')}
                                className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <div className="flex items-center">
                                    <HandCoins className="text-purple-600 mr-3" size={24} />
                                    <span className="font-medium">Efectivo</span>
                                </div>
                            </button>
                            {/* Se pueden agregar otros métodos de pago aquí */}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <p>Confirmar los detalles del pago</p>
                            <textarea
                                readOnly
                                value=
                                {`Mecánico: ${mechanic}
                                Fecha: ${date}
                                Hora: ${time}
                                Servicio: ${service}
                                Valor: $${price}`}
                                className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-700"
                                rows={5}
                            />
                            <button
                                onClick={handlePaymentComplete}
                                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
                            >
                                Confirmar pago
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <p>Pago completado con éxito</p>
                            <button
                                onClick={(() => navigate('/'))}
                                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
                            >
                                Volver al Home
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;