import React, { useState } from "react";
import ModalMecanico from "./ModalMecanico";
import ModalFormulario from "./ModalFormulario";
import ModalReservation from "./ModalReservation";
import ModalPayment from './ModalPayment';
import ModalVoucher from './ModalVoucher';

const Modal = ({ isOpen, onClose, type: initialType, props }) => {
    const [currentType, setCurrentType] = useState(initialType);
    const [selectedTime, setSelectedTime] = useState(null); // Estado para selectedTime
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Reiniciar el tipo cuando se cierra el modal
    React.useEffect(() => {
        if (!isOpen) {
            setCurrentType(initialType);
        }
    }, [isOpen, initialType]);

    if (!isOpen) return null;

    const handleSwitchToForm = (data) => {
        setSelectedTime(data.selectedTime); // Actualiza el estado de selectedTime
        setCurrentType("formulario");
    };

    const handleSwitchToReservation = () => {
        setCurrentType("reservation");
    };

    const handleBack = () => {
        setCurrentType("mecanico");
    };

    const handleSwitchToPayment = () => {
        console.log("Cambiando a modal de pago"); // Para debugging
        setCurrentType("payment");
    };

    const handleSwitchToVoucher = (data) => {
        setPaymentMethod(data.paymentMethod);
        setCurrentType("voucher");
    };

    const renderContent = () => {
        
        switch (currentType) {
            case "mecanico":
                return (
                    <ModalMecanico 
                        {...props} 
                        onClose={onClose}
                        onReservar={handleSwitchToForm}
                    />
                );
            case "formulario":
                return (
                    <ModalFormulario 
                        {...props}
                        onBack={handleBack}
                        onNext={handleSwitchToReservation}
                        mechanic={props.mechanic}
                        selectedDate={props.selectedDate}
                        selectedTime={selectedTime}
                    />
                );
            case "reservation":
                return (
                    <ModalReservation 
                        {...props}
                        onBack={() => setCurrentType("formulario")}
                        onNext={handleSwitchToPayment}
                        selectedTime={selectedTime}
                    />
                );
            case "payment":
                return (
                    <ModalPayment 
                        {...props}
                        onBack={() => setCurrentType("reservation")}
                        onNext={handleSwitchToVoucher}
                        selectedTime={selectedTime}
                    />
                );
            case "voucher":
                return (
                    <ModalVoucher 
                        {...props}
                        selectedTime={selectedTime}
                        paymentMethod={paymentMethod}
                    />
                );
            default:
                return <div className="p-6">Contenido no disponible</div>;
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {renderContent()}
            </div>
        </div>
    );
};

export default Modal;