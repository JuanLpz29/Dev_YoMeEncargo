import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentModal from './paymentmodal';

const HandlerPayment = () => {
    const location = useLocation();
    const { mechanic, date, time, service, price } = location.state || {};
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(true); // Modal abierto por defecto

    const handleClosePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    const handlePaymentComplete = () => {
        console.log('Payment completed');
        setPaymentModalOpen(false);
    };

    return (
        <div>
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={handleClosePaymentModal}
                onComplete={handlePaymentComplete}
                mechanic={mechanic}
                date={date}
                time={time}
                service={service}
                price={price}
            />
        </div>
    );
};

export default HandlerPayment;