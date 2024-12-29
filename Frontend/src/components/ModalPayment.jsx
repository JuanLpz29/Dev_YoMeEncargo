import React, { useState } from 'react';
import { CreditCard, HandCoins } from 'lucide-react';

const ModalPayment = ({ onBack, onNext, mechanic, selectedDate, selectedTime }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit');

    // Formatear la fecha y hora para mostrar
    const formattedDate = selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString() : 'No seleccionada';
    const formattedTime = selectedTime || 'No seleccionada';
    const price = mechanic?.price || '30.000';

    const handleSimulatedPayment = () => {
        setLoading(true);
        // Simular un proceso de pago
        setTimeout(() => {
            setLoading(false);
            // Redirigir a modalVoucher
            onNext({ paymentMethod });
        }, 2000);
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold text-myColor text-center mb-6">Pago de Servicio</h2>

            {/* Resumen de la reserva */}
            <div className="bg-offCyan p-4 rounded-md w-full mb-6 flex flex-col justify-center items-center">
                
                <p className="text-gray-700 mb-2">
                    <strong>Mecánico:</strong> {mechanic?.name}
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
                    <strong>Total a pagar:</strong> ${price}
                </p>
            </div>

            {/* Opciones de pago con íconos */}
            <div className="w-full space-y-4 mb-6">
                <label className="block border border-myColor rounded-md p-4 cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio text-myColor"
                        />
                        <CreditCard className="w-6 h-6 text-myColor" />
                        <span className="text-myColor">Tarjeta de Crédito/Débito</span>
                    </div>
                </label>
                
                <label className="block border border-myColor rounded-md p-4 cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="transfer"
                            checked={paymentMethod === 'transfer'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio text-myColor"
                        />
                        <HandCoins className="w-6 h-6 text-myColor" />
                        <span className="text-myColor">Efectivo o Transferencia</span>
                    </div>
                </label>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 w-full">
                <button
                    onClick={handleSimulatedPayment}
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-md flex items-center justify-center gap-2 ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-myColor text-white hover:bg-myGray hover:text-myColor'
                    } transition-colors`}
                >
                    <CreditCard className="w-5 h-5" />
                    {loading ? 'Procesando pago...' : 'Realizar pago'}
                </button>
                <button
                    onClick={onBack}
                    disabled={loading}
                    className="border border-myColor text-myColor py-3 px-4 rounded-md hover:bg-myGray hover:text-white transition-colors"
                >
                    Volver a detalles
                </button>
            </div>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-myColor mx-auto"></div>
                        <p className="text-center mt-4">Procesando su pago...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalPayment;