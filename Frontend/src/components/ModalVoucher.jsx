import React, { useRef } from 'react';
import { Check, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ModalVoucher = ({ mecanico, selectedDate, selectedTime, price = "30.000", paymentMethod }) => {
    const navigate = useNavigate();
    const voucherRef = useRef(null);
    
    const formattedDate = selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString() : 'No seleccionada';
    const formattedTime = selectedTime || 'No seleccionada';

    // Función para mostrar el método de pago de forma amigable
    const getPaymentMethodText = (method) => {
        switch(method) {
            case 'credit':
                return 'Tarjeta de crédito/débito';
            case 'transfer':
                return 'Transferencia bancaria';
            default:
                return 'No especificado';
        }
    };

    const handleDownloadPDF = async () => {
        const element = voucherRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 896, // max-w-4xl = 56rem = 896px
                height: element.scrollHeight,
                onclone: (document) => {
                    const el = document.querySelector('.voucher-content');
                    if (el) {
                        el.style.width = '896px'; // Forzar el ancho
                        el.style.padding = '2rem';
                        el.style.margin = '0 auto';
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape', // Cambiar a landscape para mejor ajuste
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            const margin = 10;
            pdf.addImage(
                imgData, 
                'PNG', 
                margin, 
                margin, 
                pdfWidth - (margin * 2), 
                pdfHeight - (margin * 2)
            );

            pdf.save('comprobante-reserva.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div ref={voucherRef} className="voucher-content bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <div className="bg-green-100 p-4 rounded-full inline-flex mb-4">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-myColor mb-2">
                        ¡Tu reserva fue realizada con éxito!
                    </h2>
                </div>

                {/* Detalles de la transacción */}
                <div className="bg-offCyan p-6 rounded-lg w-full mb-6 text-myColor">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-myGray">Mecánico</span>
                            <span className="font-semibold">{mecanico.usuario.nombre} {mecanico.usuario.apellido}</span>
                        </div>
                        
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-myGray">Número de Celular </span>
                            <span className="font-semibold">{mecanico.usuario.celular}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-myGray">Fecha</span>
                            <span className="font-semibold">{formattedDate}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-myGray">Hora</span>
                            <span className="font-semibold">{formattedTime}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                            <span className="text-myGray">Método de pago</span>
                            <span className="font-semibold">{getPaymentMethodText(paymentMethod)}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-myGray">Total</span>
                            <div className="text-right">
                                {/* <span className="text-green-500 text-sm">Success</span> */}
                                <p className="font-bold text-lg">${price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 w-full mt-6">
                <p className="text-sm text-myHover font-medium">Tu mecánico se pondrá en contacto contigo a la brevedad.</p>
                <p className="text-sm text-myHover font-medium">En caso que no se comunique también puedes optar por llamarlo al número indicado en el voucher.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-myColor text-white py-3 px-4 rounded-md hover:bg-myGray hover:text-myColor transition-colors flex items-center justify-center gap-2"
                >
                    <Home className="w-5 h-5" />
                    Finalizar
                </button>
                
                <button
                    onClick={handleDownloadPDF}
                    className="border border-myColor text-myColor py-3 px-4 rounded-md hover:bg-myGray hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Descargar Comprobante
                </button>
            </div>
        </div>
    );
};

export default ModalVoucher; 