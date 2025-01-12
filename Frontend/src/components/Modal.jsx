import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalMecanico from "./ModalMecanico";
import ModalFormulario from "./ModalFormulario";
import ModalReservation from "./ModalReservation";
import ModalPayment from './ModalPayment';
import ModalVoucher from './ModalVoucher';

const Modal = ({ isOpen, onClose, type: initialType, props }) => {
    const [currentType, setCurrentType] = useState(initialType);
    const [selectedTime, setSelectedTime] = useState(null); // Estado para selectedTime
    const [vehiculo, setVehiculo] = useState(null);
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

    const handleSwitchToReservation = (data) => {
        setVehiculo(data.vehiculo);
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
                        mecanico={props.mecanico}
                        selectedDate={props.selectedDate}
                        onClose={onClose}
                        onReservar={handleSwitchToForm}
                    />
                );
            case "formulario":
                return (
					<ModalFormulario
						onBack={handleBack}
						onNext={handleSwitchToReservation}
						mechanic={props.mecanico}
						selectedDate={props.selectedDate}
						selectedTime={selectedTime}
					/>
				);
            case "reservation":
                return (
					<ModalReservation
						onBack={() => setCurrentType("formulario")}
						onNext={handleSwitchToPayment}
						selectedTime={selectedTime}
						mecanico={props.mecanico}
						selectedDate={props.selectedDate}
					/>
				);
            case "payment":
                return (
                    <ModalPayment 
                        onBack={() => setCurrentType("reservation")}
                        onNext={handleSwitchToVoucher}
                        selectedTime={selectedTime}
                        mecanico={props.mecanico}
                        selectedDate={props.selectedDate}
                        vehiculo={vehiculo}
                    />
                );
            case "voucher":
                return (
                    <ModalVoucher 
                        selectedTime={selectedTime}
                        paymentMethod={paymentMethod}
                        mecanico={props.mecanico}
                        selectedDate={props.selectedDate}
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

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	props: PropTypes.object,
};


export default Modal;