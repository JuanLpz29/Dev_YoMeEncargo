import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createMecanico, updateUsuario } from "../actions/yo-me-encargo";

const ModalPM = ({ isOpen, onClose }) => {
	const [certificate, setCertificate] = useState(null);
	const [photo, setPhoto] = useState(null);

	const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar la vista de agradecimiento
	const [availability, setAvailability] = useState("");

	const navigate = useNavigate();

	const handleFileChange = (e, setFile) => {
		const file = e.target.files[0];
		if (file) {
			setFile(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!certificate || !photo) {
			alert("Por favor, suba ambos archivos antes de continuar.");
			return;
		}

		try {
			const usuario = JSON.parse(localStorage.getItem("usuario"));
            console.log("certificate >>>", certificate);
            console.log("photo >>>", photo);

			const formData = new FormData(); // Crear una instancia de FormData
			formData.append("id_usuario", usuario.id);
			formData.append("certificado", certificate); // Agregar el archivo certificado
			formData.append("foto", photo); // Agregar el archivo foto
			formData.append("horario", "Lunes a Viernes 9:00-18:00");
			formData.append("valoracion", 0);

            

			// Llamar a la API para crear el mecánico
			await createMecanico(formData); // Enviar formData

            await updateUsuario({
				id: usuario.id,
				rol: "MECANICO",
			});

			setIsSubmitted(true);
		} catch (error) {
			console.error("Error al registrar al mecánico:", error);
			alert(
				"Hubo un error al registrar al mecánico. Por favor, inténtelo nuevamente."
			);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("usuario");
		console.log("Usuario deslogueado");
		navigate("/login");
	};

	if (!isOpen) return null;

	return (
		<div
			className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
		>
			<div
				className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{!isSubmitted ? (
					// Vista del formulario
					<>
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-myColor">
								Validar Profesionalidad
							</h2>
							<button
								onClick={onClose}
								className="text-myGray font-semibold hover:text-red-500 w-8 h-8 flex items-center justify-center border-2 border-offCyan rounded-full"
							>
								X
							</button>
						</div>
						<p className="text-myGray text-base mb-4">
							Por favor sube un archivo PDF que valide tu
							profesión. Este puede ser un título universitario o
							alguna certificación de una institución académica.
						</p>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-myColor font-semibold mb-2">
									Suba su certificado (PDF)
								</label>
								<input
									type="file"
									accept=".pdf"
									onChange={(e) =>
										handleFileChange(e, setCertificate)
									}
									className="w-full p-2 bg-gray-100 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-myColor font-semibold mb-2">
									Suba una foto tipo retrato (PNG,JPG,JPEG)
								</label>
								<input
									type="file"
									accept="image/*"
									onChange={(e) =>
										handleFileChange(e, setPhoto)
									}
									className="w-full p-2 bg-gray-100 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
								/>
							</div>
							<div>
								<label className="block text-myColor font-semibold mb-2">
									Horario de Disponibilidad
								</label>
								<div className="flex space-x-4">
									<div>
										<label className="block text-myColor font-semibold mb-2">
											Día Inicial
										</label>
										<select
											value={availability.startDay}
											onChange={(e) =>
												setAvailability({
													...availability,
													startDay: e.target.value,
												})
											}
											className="w-full p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
										>
											<option value="Lunes">Lunes</option>
											<option value="Martes">
												Martes
											</option>
											<option value="Miércoles">
												Miércoles
											</option>
											<option value="Jueves">
												Jueves
											</option>
											<option value="Viernes">
												Viernes
											</option>
											<option value="Sábado">
												Sábado
											</option>
											<option value="Domingo">
												Domingo
											</option>
										</select>
									</div>
									<div>
										<label className="block text-myColor font-semibold mb-2">
											Día Final
										</label>
										<select
											value={availability.endDay}
											onChange={(e) =>
												setAvailability({
													...availability,
													endDay: e.target.value,
												})
											}
											className="w-full p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
										>
											<option value="Lunes">Lunes</option>
											<option value="Martes">
												Martes
											</option>
											<option value="Miércoles">
												Miércoles
											</option>
											<option value="Jueves">
												Jueves
											</option>
											<option value="Viernes">
												Viernes
											</option>
											<option value="Sábado">
												Sábado
											</option>
											<option value="Domingo">
												Domingo
											</option>
										</select>
									</div>
									<div>
										<label className="block text-myColor font-semibold mb-2">
											Hora Inicial
										</label>
										<select
											value={availability.startTime}
											onChange={(e) =>
												setAvailability({
													...availability,
													startTime: e.target.value,
												})
											}
											className="w-full p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
										>
											{Array.from(
												{ length: 16 },
												(_, i) => (
													<option
														key={i}
														value={`${i + 7}:00`}
													>{`${i + 7}:00`}</option>
												)
											)}
										</select>
									</div>
									<div>
										<label className="block text-myColor font-semibold mb-2">
											Hora Final
										</label>
										<select
											value={availability.endTime}
											onChange={(e) =>
												setAvailability({
													...availability,
													endTime: e.target.value,
												})
											}
											className="w-full p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
										>
											{Array.from(
												{ length: 16 },
												(_, i) => (
													<option
														key={i}
														value={`${i + 7}:00`}
													>{`${i + 7}:00`}</option>
												)
											)}
										</select>
									</div>
								</div>
							</div>
							<div className="flex justify-end space-x-2">
								<button
									type="submit"
									// onClick={() => setIsSubmitted(true)}
									className="px-4 py-2 bg-myColor hover:bg-myGray text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
								>
									Enviar
								</button>
							</div>
						</form>
					</>
				) : (
					// Vista de agradecimiento
					<>
						<h2 className="text-2xl font-bold text-myColor mb-4">
							¡Gracias por trabajar con nosotros!
						</h2>
						<p className="text-myGray text-base mb-6">
							Nuestro equipo se encargará de revisar tu solicitud
							y validar que eres un mecánico profesional. Una vez
							que este proceso haya finalizado verás reflejado el
							cambio de rol al volver a iniciar sesión. Te
							invitamos a volver a iniciar sesión para ver los
							cambios.
						</p>
						<button
							onClick={handleLogout}
							className="px-4 py-2 bg-myColor hover:bg-myGray text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
						>
							Volver a Iniciar Sesión
						</button>
					</>
				)}
			</div>
		</div>
	);
};

ModalPM.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalPM;