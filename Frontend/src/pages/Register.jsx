import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { createUsuario } from "../actions/yo-me-encargo";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		password: "",
		acceptTerms: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName.trim())
			newErrors.firstName = "El nombre es requerido";
		if (!formData.lastName.trim())
			newErrors.lastName = "El apellido es requerido";
		if (!formData.phone.trim())
			newErrors.phone = "El número de celular es requerido";
		if (!formData.email.trim())
			newErrors.email = "El correo electrónico es requerido";
		if (!formData.password)
			newErrors.password = "La contraseña es requerida";
		if (formData.password && formData.password.length < 6) {
			newErrors.password =
				"La contraseña debe tener al menos 6 caracteres";
		}
		if (!formData.acceptTerms) {
			newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				const usuarioData = {
					nombre: formData.firstName,
					apellido: formData.lastName,
					celular: formData.phone,
					correo: formData.email,
					contrasena: formData.password,
				};

				const result = await createUsuario(usuarioData);
				console.log("Usuario registrado exitosamente:", result);

				// Guarda el token en localStorage
				if (result.token) {
					localStorage.setItem("token", result.token);
				}
				navigate("/login");
			} catch (error) {
				console.error("Error al registrar el usuario:", error);
			}
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* Left Section with Logo */}
			<div className="w-full md:w-1/2 bg-[#0F172A] flex items-center justify-center p-8 bg-logo-pattern bg-repeat bg-cover bg-center">

			</div>

			{/* Right Section with Registration Form */}
			<div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
				<div className="max-w-md w-full">
					<div className="flex justify-center mb-4">
						<img
							src="img/logoyme.svg"
							width={240}
							height={50}
							alt="YoMeEncargo logo"
							className="filter invert grayscale"
						/>
					</div>
					<h2 className=" text-center text-3xl font-bold text-gray-900 mb-8">
						Registro de Usuario
					</h2>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="Ingresa tu nombre"
									className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent ${errors.firstName
											? "border-red-500"
											: "border-gray-300"
										}`}
								/>
								{errors.firstName && (
									<p className="mt-1 text-xs text-red-500">
										{errors.firstName}
									</p>
								)}
							</div>
							<div>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Ingresa tu apellido"
									className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent ${errors.lastName
											? "border-red-500"
											: "border-gray-300"
										}`}
								/>
								{errors.lastName && (
									<p className="mt-1 text-xs text-red-500">
										{errors.lastName}
									</p>
								)}
							</div>
						</div>

						<div>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="+569 75 66 65 62"
								className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent ${errors.phone
										? "border-red-500"
										: "border-gray-300"
									}`}
							/>
							{errors.phone && (
								<p className="mt-1 text-xs text-red-500">
									{errors.phone}
								</p>
							)}
						</div>

						<div>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="ejemplo.email@gmail.com"
								className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent ${errors.email
										? "border-red-500"
										: "border-gray-300"
									}`}
							/>
							{errors.email && (
								<p className="mt-1 text-xs text-red-500">
									{errors.email}
								</p>
							)}
						</div>

						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Ingresa una contraseña de 6 caracteres"
								className={`w-full px-4 py-2 bg-gray-50 border rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent ${errors.password
										? "border-red-500"
										: "border-gray-300"
									}`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900"
							>
								{showPassword ? (
									<Eye size={20} />
								) : (
									<EyeOff size={20} />
								)}
							</button>
							{errors.password && (
								<p className="mt-1 text-xs text-red-500">
									{errors.password}
								</p>
							)}
						</div>

						<div className="flex items-start">
							<div className="flex items-center h-5">
								<input
									type="checkbox"
									name="acceptTerms"
									checked={formData.acceptTerms}
									onChange={handleChange}
									className="w-4 h-4 border-2 border-myColor rounded bg-gray-50 text-myColor focus:ring-myColor checked:bg-myColor"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label className="text-gray-900">
									Al registrarme, acepto los{" "}
									<a
										href="#"
										className="text-myColor hover:underline"
									>
										Términos de uso
									</a>{" "}
									&{" "}
									<a
										href="#"
										className="text-myColor hover:underline"
									>
										Política de Privacidad
									</a>
								</label>
								{errors.acceptTerms && (
									<p className="mt-1 text-xs text-red-500">
										{errors.acceptTerms}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-2 px-4 bg-myColor hover:bg-myGray text-white hover:text-myColor font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
						
						>
							Registrarme
						</button>
						<button
							onClick={() => navigate(-1)}
							className="flex justify-center mt-10 bg-myColor text-white py-2 px-4 rounded-full hover:bg-myGray focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50"
						>Volver
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
