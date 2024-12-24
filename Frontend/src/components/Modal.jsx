import React, { useState } from "react";
import { X, FileUser, ChevronDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, mechanic, selectedDate, pdfUrl }) => {
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState("");
    const [showImageModal, setShowImageModal] = useState(false); // Controlar modal para imagen ampliada

    const token = localStorage.getItem("token");
    const loggedIn = token ? true : false;

    if (!isOpen) return null;

    const handleReservation = () => {
        // Aquí puedes agregar la lógica para guardar la fecha en la base de datos
        console.log(`Reservando mecánico ${mechanic.name} para la fecha ${selectedDate}`);
        // Navegar a la página de formulario de vehículo o login
        navigate(loggedIn ? "/VehicleForm" : "/Login");
    };

    const reviews = [
        { text: "Highly recommend, very knowledgeable" },
        { text: "Affordable and reliable service" },
        { text: "Friendly and skilled mechanic" },
        { text: "Very satisfied with the work done" },
        { text: "Punctual and thorough mechanic" },
        { text: "Excellent customer service" },
        { text: "Solved my car issues in no time" },
        { text: "Will definitely use his services again" },
    ];

    const availableTimes = [
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
    ];

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleBackgroundClick}
        >
            <div className="bg-offCyan rounded-lg shadow-xl w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Mechanic Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 rounded-full p-1"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex flex-col md:flex-row gap-8">
                    {/* Left Section - Profile and Reviews */}
                    <div className="flex-1 space-y-6">
                        {/* Profile Info */}
                        <div className="flex items-start space-x-4">
                            {/* Imagen ampliable */}
                            <img
                                src={mechanic.image}
                                alt={`Mechanic ${mechanic.name}`}
                                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                                onClick={() => setShowImageModal(true)}
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {mechanic.name}
                                </h3>
                                <div className="flex items-center space-x-1 my-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(mechanic.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-primary p-3 rounded-lg">
                                    <FileUser className="w-12 h-12 text-myColor" />
                                </div>
                                {/* <span className="text-sm text-gray-600 mt-2">
                                    Título Profesional
                                </span> */}
                                {/* Enlace para descargar PDF */}
                                <a
                                    href={pdfUrl}
                                    download
                                    className="text-sm text-myColor font-semibold hover:underline"
                                >
                                    Ver Certificado
                                </a>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                                Comentarios(8)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm"
                                    >
                                        {review.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="w-full md:w-64 space-y-4">
                        <div className="space-y-2">
                            <p className="text-gray-700 mb-4">
                                Fecha: {selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString() : 'No seleccionada'}
                            </p>


                            <label className="block text-sm font-medium text-gray-700">
                                Elegir Horario
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none"
                                >
                                    <option value="">Horarios Disponibles</option>
                                    {availableTimes.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                            </div>
                        </div>



                        <button
                            className="w-full bg-myColor text-white py-2 px-4 rounded-md
                                    hover:bg-myGray hover:text-myColor border hover:border-myColor focus:outline-none focus:ring-2
                                    focus:ring-myColor focus:ring-opacity-50 transition-colors"
                            onClick={() => loggedIn ? navigate('/VehicleForm') : navigate('/Login')}
                        >
                            Reservar mecánico
                        </button>



                        <button className="w-full border bg-primary border-myColor hover:border-primary text-myColor py-2 px-4 rounded-md hover:bg-myColor hover:text-primary focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors">
                            Dejar un comentario
                        </button>

                        <button className="absolute bottom-4 right-4 py-2 px-4 bg-primary text-red-500 text-sm rounded-md border border-gray-300 hover:border-red-600 focus:outline-none  active:bg-red-600 active:text-primary transition-colors">
                            Reportar
                        </button>

                    </div>
                </div>
            </div>

            {/* Modal para imagen ampliada */}
            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setShowImageModal(false)}
                >
                    <div>
                        <img
                            src={mechanic.image}
                            alt={`Mechanic ${mechanic.name}`}
                            className="max-w-full max-h-screen"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
