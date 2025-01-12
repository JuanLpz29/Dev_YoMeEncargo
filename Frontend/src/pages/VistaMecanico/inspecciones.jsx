import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Trash2, Clock, MapPin } from "lucide-react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Modal from "../../components/Modal";
import * as Avatar from "@radix-ui/react-avatar";
import { getRevisionesByMecanico } from "../../actions/yo-me-encargo";
import moment from "moment-timezone";

const Inspecciones = () => {
	const navigate = useNavigate();
	const [revisiones, setRevisiones] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRevision, setSelectedRevision] = useState(null);
	const [loading, setLoading] = useState(true);

	// Obtener el ID del mecánico del localStorage
	const usuario = JSON.parse(localStorage.getItem("usuario"));

	useEffect(() => {
		const obtenerDatosRevisiones = async () => {
			try {
				const data = await getRevisionesByMecanico(usuario.id);
				setRevisiones(data);
			} catch (error) {
				console.error(
					"Error al obtener datos de las revisiones:",
					error
				);
			}
		};
		obtenerDatosRevisiones();
		setLoading(false);
	}, [usuario.id]);


	const handleDeleteInspection = (id) => {
		setRevisiones((prevRevisiones) =>
			prevRevisiones.filter((revision) => revision.id !== id)
		);
	};

	const formatDate = (dateString) => {
		const date = moment.utc(dateString);
		return date.format("DD/MM/YYYY");
	};

	const formatTime = (timeString) => {
		const time = moment(timeString).tz("America/Santiago");
		return time.format("HH:mm");
	};

	const openModal = (revision) => {
		setSelectedRevision(revision);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedRevision(null);
	};

	return (
		<>
			<NavBar />

			<div className="container mx-auto px-4 py-8 min-h-screen bg-offCyan">
				<h1 className="text-3xl font-bold text-center text-myColor mb-8">
					Inspecciones Programadas
				</h1>
				<div className="text-center mb-8">
					<button
						onClick={() => window.location.reload()}
						className="bg-myColor text-white hover:bg-myHover hover:text-white px-4 py-2 rounded-md"
					>
						Recargar
					</button>
				</div>

				{loading ? (
					<div className="text-center">
						<p>Cargando solicitudes...</p>
					</div>
				) : revisiones.length === 0 ? (
					<div className="text-center">
						<p className="text-xl text-gray-600">
							No hay inspecciones programadas.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{revisiones.map((revision) => (
							<div
								key={revision.id}
								className="bg-myGray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
							>
								<div className="flex flex-col p-4">
									<div className="flex items-center space-x-4 mb-4">
										<Avatar.Root className="flex-none rounded-full ring-offset-2 ring-myColor ring-2">
											<Avatar.Image
												src={"/default-avatar.png"}
												className="w-16 h-16 rounded-full object-cover"
											/>
											<Avatar.Fallback className="w-16 h-16 text-4xl rounded-full text-myColor font-semibold  bg-gray-200 flex items-center justify-center">
												{revision.reserva?.vehiculo
													?.usuario.nombre?.[0] || "?"}
											</Avatar.Fallback>
										</Avatar.Root>

										<div className="flex-1">
											<h2 className="text-xl font-semibold text-myColor mb-1">
												{
													revision.reserva?.vehiculo
														?.usuario?.nombre
												}{" "}
												{
													revision.reserva?.vehiculo
														?.usuario?.apellido
												}
												
												<span className="text-sm text-myHover ml-2">														{
														revision.reserva?.vehiculo
															?.usuario?.celular
													}</span>

												
											</h2>

											<h2 className="text-xl font-semibold text-white mb-1">
												{
													revision.reserva?.vehiculo
														?.marca
												}{" "}
												{
													revision.reserva?.vehiculo
														?.modelo
												}{" "}
												{
													revision.reserva?.vehiculo
														?.anio
												}
											</h2>
											<p className="text-primary text-sm">
												{
													revision.reserva?.vehiculo
														?.patente
												}
											</p>
										</div>

										<button
											onClick={() =>
												handleDeleteInspection(
													revision.id
												)
											}
											className={`py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors flex items-center justify-center ml-4 ${revision.estado === "PENDIENTE"
													? "cursor-not-allowed opacity-50"
													: ""
												}`}
											disabled={
												revision.estado === "PENDIENTE"
											}
										>
											<Trash2 className="w-5 h-5 mr-2" />
										</button>
									</div>

									<div className="space-y-2 text-white">
										<p className="flex items-center">
											<Calendar className="w-5 h-5 mr-2" />
											Fecha:{" "}
											{formatDate(revision.reserva.fecha)}
										</p>
										<p className="flex items-center">
											<Clock className="w-5 h-5 mr-2" />
											Hora:{" "}
											{formatTime(
												revision.reserva.horaInicio
											)}{" "}
											-{" "}
											{formatTime(
												revision.reserva.horaFin
											)}
										</p>
										<p className="flex items-center">
											<MapPin className="w-5 h-5 mr-2" />
											{revision.reserva?.ubicacion}
										</p>
										<p
											className={`flex items-center ${revision.pago === "PENDIENTE"
													? "text-orange-500"
													: "text-green-500"
												}`}
										>
											{revision.pago}
										</p>
									</div>

									<button
										onClick={() =>
											window.open("/reporte", "_blank")
										}
										className={`mt-4 bg-myColor text-white hover:bg-myHover hover:text-white px-4 py-2 rounded-md mb-4 ${revision.pago === "REALIZADA"
												? "cursor-not-allowed opacity-50"
												: ""
											}`}
										disabled={revision.pago === "REALIZADA"}
									>
										Realizar Inspección
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<Footer />

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				revision={selectedRevision}
				tipo="cancelacion"
			/>
		</>
	);
};

export default Inspecciones;
