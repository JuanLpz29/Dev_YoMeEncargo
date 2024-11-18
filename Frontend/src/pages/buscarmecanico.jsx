import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createVehiculo } from "../actions/yo-me-encargo";

const BuscarMecanico = () => {
	const [formData, setFormData] = useState({
		make: "",
		model: "",
		licensePlate: "",
		year: "",
	});

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

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
		if (!formData.make.trim()) newErrors.make = "La marca es requerida";
		if (!formData.model.trim()) newErrors.model = "El modelo es requerido";
		if (!formData.year.trim()) newErrors.year = "El año es requerido";
		if (!formData.licensePlate.trim())
			newErrors.licensePlate = "La patente es requerida";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// ! Se debe cambiar el id_usuario por el id del usuario logueado
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const vehiculoData = {
					id_usuario: 1,
					marca: formData.make,
					modelo: formData.model,
					anio: formData.year,
					patente: formData.licensePlate,
				};

				await createVehiculo(vehiculoData);
				navigate("/listamech");
			} catch (error) {
				console.error("Error al registrar el vehículo:", error);
			}
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md">
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-bold text-purple-600">
						Ingresa los datos de tu vehículo
					</h2>
					<button
						onClick={handleBack}
						className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-full p-1"
						aria-label="Cerrar"
					>
						<X size={24} />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label
							htmlFor="make"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Marca
						</label>
						<input
							type="text"
							id="make"
							name="make"
							value={formData.make}
							onChange={handleChange}
							placeholder="Marca del vehículo"
							className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400 ${
								errors.make
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.make && (
							<p className="mt-1 text-xs text-red-500">
								{errors.make}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="model"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Modelo
						</label>
						<input
							type="text"
							id="model"
							name="model"
							value={formData.model}
							onChange={handleChange}
							placeholder="Modelo del vehículo"
							className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400 ${
								errors.model
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.model && (
							<p className="mt-1 text-xs text-red-500">
								{errors.model}
							</p>
						)}
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
							className={`w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400 ${
								errors.licensePlate
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.licensePlate && (
							<p className="mt-1 text-xs text-red-500">
								{errors.licensePlate}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor="year"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Año
						</label>
						<input
							type="number"
							id="year"
							name="year"
							value={formData.year}
							onChange={handleChange}
							placeholder="Año del vehículo"
							className={`w-full p-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-400 ${
								errors.year
									? "border-red-500"
									: "border-gray-300"
							}`}
						/>
						{errors.year && (
							<p className="mt-1 text-xs text-red-500">
								{errors.year}
							</p>
						)}
					</div>
					<div className="flex flex-col space-y-2 pt-4">
						<button
							type="submit"
							className="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
						>
							Ingresar
						</button>
						<button
							type="button"
							onClick={handleBack}
							className="w-full bg-white text-purple-600 py-2 px-4 rounded-full border border-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
						>
							Volver
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default BuscarMecanico;
