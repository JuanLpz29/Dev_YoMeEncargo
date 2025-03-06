import React, { useState } from "react";
import { createVehiculo } from "../actions/yo-me-encargo";

const usuario = JSON.parse(localStorage.getItem("usuario"));

const ModalFormulario = ({ mechanic, selectedDate, onBack, onNext}) => {
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        licensePlate: "",
        year: "",
        location: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, } = e.target;


        if (name === "licensePlate") {
            const rawValue = value.replace(/-/g, "").slice(0, 6).toUpperCase();
            const formattedValue = rawValue.replace(
                /(\w{2})(\w{2})?(\w{2})?/,
                (match, p1, p2, p3) => {
                    return [p1, p2, p3].filter(Boolean).join("-");
                }
            );
            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedValue,
            }));
        } else if (name === "year") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value.slice(0, 4),
            }));
        } else if (name === "location") { // Agregar manejo para location
            setFormData((prevData) => ({
                ...prevData,
                location: value, // Actualiza el estado de formData
            }));
            
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const symbolAndEmojiRegex = /[^\w\s-]|[\u{1F600}-\u{1F64F}]/gu;

        if (!formData.make.trim()) newErrors.make = "La marca es requerida";
        if (!formData.model.trim()) newErrors.model = "El modelo es requerido";
        if (!formData.year.trim()) newErrors.year = "El año es requerido";
        if (!formData.licensePlate.trim())
            newErrors.licensePlate = "La patente es requerida";
        if(!formData.location.trim()) newErrors.location = "La dirección es requerida";

        Object.keys(formData).forEach((key) => {
            if (symbolAndEmojiRegex.test(formData[key])) {
                newErrors[key] = "No se permiten caracteres especiales o emojis.";
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const vehiculoData = {
                    id_usuario: usuario.id,
                    marca: formData.make,
                    modelo: formData.model,
                    anio: formData.year,
                    patente: formData.licensePlate,
                    
                };

                onNext({
                    vehiculo: vehiculoData,
                    mechanic: mechanic,
                    selectedDate: selectedDate,
                    location: formData.location,
                });
            } catch (error) {
                console.error("Error al registrar el vehículo:", error);
            }
        }
    };

    return (
            <div className="p-8 rounded-lg shadow-lg flex flex-col max-w-2xl mx-auto w-full">
                <div className="flex flex-col justify-between items-center border-b pb-4">
                    <h2 className="text-lg font-bold text-myColor">
                    Ingresa los datos de tu vehículo
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección de la reserva
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ej: Avenida Alemania 784"
                        className={`w-full p-2 text-myGray border border-myColor focus:border-blue-400 rounded-md ${
                            errors.location ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
                </div>
                <div>
                    <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                        Marca
                    </label>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        placeholder="Marca del vehículo"
                        className={`w-full p-2 text-myGray border border-myColor focus:border-blue-400 rounded-md ${
                            errors.make ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.make && <p className="text-xs text-red-500">{errors.make}</p>}
                </div>
                <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                        Modelo
                    </label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Modelo del vehículo"
                        className={`w-full p-2 text-myGray border border-myColor rounded-md ${
                            errors.model ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.model && <p className="text-xs text-red-500">{errors.model}</p>}
                </div>
                <div>
                    <label
                        htmlFor="licensePlate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Patente
                    </label>
                    <input
                        type="text"
                        id="licensePlate"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        placeholder="XX-XX-XX"
                        maxLength="8"
                        className={`w-full p-2 text-myGray border border-myColor rounded-md ${
                            errors.licensePlate ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.licensePlate && <p className="text-xs text-red-500">{errors.licensePlate}</p>}
                </div>
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Año
                    </label>
                    <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={`w-full p-2 text-myGray border border-myColor rounded-md ${
                            errors.year ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                        <option value="">Seleccione un año</option>
                        {Array.from({ length: new Date().getFullYear() - 1959 + 2 }, (_, i) => (
                            <option key={1960 + i} value={1960 + i}>
                                {1960 + i}
                            </option>
                        )).reverse()}
                    </select>
                    {errors.year && <p className="text-xs text-red-500">{errors.year}</p>}
                </div>
                <div className="flex flex-col space-y-2">
                    <button
                        type="submit"
                        className="bg-myColor text-white hover:text-myColor py-2 px-4 rounded-md hover:bg-myGray"
                    >
                        Continuar
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        className="bg-gray-white py-2 px-4 rounded-md border border-myColor text-myColor hover:text-white hover:bg-myGray"
                    >
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalFormulario;
