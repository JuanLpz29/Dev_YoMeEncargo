import { useState, useEffect, useCallback } from "react";
import { Calendar, Gauge, Route } from "lucide-react";
import { GiCarDoor, GiCarWheel, GiCarSeat } from "react-icons/gi";
import { MdCarCrash } from "react-icons/md";
import { RiOilFill, RiUser3Fill } from "react-icons/ri";
import { RxIdCard } from "react-icons/rx";
import { PiEngineBold } from "react-icons/pi";
import { IoColorFill } from "react-icons/io5";
import { useParams } from "react-router-dom";
import {
	getRevisionesByMecanico,
} from "../../actions/yo-me-encargo";
import DownloadLink from "./ReportePDF";
import moment from "moment-timezone";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";

const ReportShared = () => {
	const usuario = JSON.parse(localStorage.getItem("usuario"));
	const { id } = useParams();
	const [revision, setRevision] = useState(null);
	const [loading, setLoading] = useState(true);
	const [existeReporte, setExistReporte] = useState(false);

	const formatDate = useCallback((dateString) => {
		return moment.utc(dateString).format("YYYY-MM-DD");
	}, []);

	useEffect(() => {
		const obtenerDatosRevisiones = async () => {
			try {
				const data = await getRevisionesByMecanico(usuario.id);
				const foundRevision = data.find(
					(revision) => revision.id === parseInt(id)
				);
				if (foundRevision) {
					setRevision(foundRevision);
				}
			} catch (error) {
				console.error(
					"Error al obtener datos de las revisiones:",
					error
				);
			}
			setLoading(false);
		};

		if (usuario?.id && id) {
			obtenerDatosRevisiones();
		}
	}, [usuario?.id, id]);

	const dataReporte = revision?.reporte
		? JSON.parse(JSON.parse(revision.reporte))
		: null;

	useEffect(() => {
		if (dataReporte) {
			setExistReporte(true);
		}
	}, [dataReporte]);

	const [vehicleData, setVehicleData] = useState({
		fechaInspeccion: formatDate(revision?.reserva?.fecha) || "",
		nombreMecanico: usuario?.nombre + " " + usuario?.apellido,
		marca: revision?.reserva?.vehiculo?.marca || "",
		modelo: revision?.reserva?.vehiculo?.modelo || "",
		año: "",
		combustible: "",
		transmision: "",
		traccion: "",
		kilometraje: "",
		cilindrada: "",
		color: "",
		tapiceria: "",
		numPuertas: "",
		vin: "",
		soap: { fecha: "", vigencia: "" },
		permisoCirculacion: { fecha: "", vigencia: "" },
		revisionTecnica: { fecha: "", vigencia: "" },
		emisionContaminantes: { fecha: "", vigencia: "" },
		estadoAceite: { estado: "", observaciones: "" },
		estadoFrenos: { estado: "", observaciones: "" },
		pruebaRuta: { realizada: false, observaciones: "" },
		estadoNeumaticos: { estado: "", observaciones: "" },
		id_mecanico: revision?.mecanico?.id,
		id_reserva: revision?.reserva?.id,
		comentarios: "",
	});

	useEffect(() => {
		if (revision) {
			setVehicleData((prev) => ({
				...prev,
				id_mecanico: revision?.mecanico?.id,
				id_reserva: revision?.reserva?.id,
				fechaInspeccion: formatDate(revision?.reserva?.fecha),
				nombreMecanico: usuario?.nombre + " " + usuario?.apellido,
				marca: revision.reserva.vehiculo.marca || "",
				modelo: revision.reserva.vehiculo.modelo || "",
				año: revision.reserva.vehiculo.anio || "",
				comentarios: revision?.comentario || "",
				...dataReporte,
			}));
		}
	}, [revision]);

	const today = new Date().toISOString().split("T")[0];

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Cargando...
			</div>
		);
	}

	return (
		<div className="bg-myColor">
			<NavBar />
			<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-myColor mb-6 flex flex-col items-center">
					Reporte de Inspección
				</h2>
				<form className="space-y-6">
					{/* Primera sección: Datos de la inspección */}
					<div className="flex space-x-4">
						<div className="w-1/2">
							<div className="p-4 rounded-lg">
								<h3 className="text-lg font-semibold text-myColor flex items-center gap-2 mb-2">
									<Calendar className="w-5 h-5" />
									Fecha de inspección
								</h3>
								<div
									className="relative w-full border border-myColor cursor-pointer"
									onClick={() => {
										const dateInput =
											document.querySelector(
												'input[name="fechaInspeccion"]'
											);
										if (dateInput) dateInput.showPicker();
									}}
								>
									<input
										type="date"
										name="fechaInspeccion"
										value={vehicleData.fechaInspeccion}
										className={`w-full border border-myColor rounded-md font-semibold ${
											!vehicleData.fechaInspeccion
												? "text-gray-400"
												: "text-myGray"
										} focus:border-myColor focus:ring-myColor cursor-not-allowed`}
										min={today}
										disabled
									/>
									<div className="absolute inset-0"></div>
								</div>
							</div>
						</div>
						<div className="w-1/2">
							<div className="p-4 rounded-lg">
								<h3 className="text-lg font-semibold text-myColor flex items-center gap-2 mb-2">
									<RiUser3Fill className="w-5 h-5" />
									Nombre del mecánico
								</h3>
								<div className="relative w-full border border-myColor">
									<input
										type="text"
										name="nombreMecanico"
										value={vehicleData.nombreMecanico}
										disabled
										className={`w-full border font-semibold border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2 bg-gray-100 cursor-not-allowed`}
									/>
								</div>
							</div>
						</div>
					</div>
					{/* Segunda sección: Información básica del vehículo */}
					<div className="flex space-x-4 text-myColor font-semibold">
						<div className="w-1/2">
							<div className="p-4 rounded-lg">
								Marca
								<input
									type="text"
									name="marca"
									value={vehicleData.marca}

									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								Modelo
								<input
									type="text"
									name="modelo"
									value={vehicleData.modelo}

									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								Año
								<select
									name="año"
									value={vehicleData.año}
									className={`w-full border border-myColor rounded-md ${
										!vehicleData.año
											? "text-gray-400"
											: "text-myGray"
									} focus:border-myColor focus:ring-myColor px-2 cursor-pointer`}
								>
									<option value="" disabled>
										Seleccione un año
									</option>
									{Array.from(
										{ length: 30 },
										(_, i) =>
											new Date().getFullYear() + 1 - i
									).map((year) => (
										<option
											key={year}
											value={year}
											className="text-myGray"
										>
											{year}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="w-1/2">
							<div className="p-4 rounded-lg">
								Combustible
								<input
									type="text"
									name="tipoCombustible"
									value={vehicleData.tipoCombustible}
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								Transmisión
								<input
									type="text"
									name="transmision"
									value={vehicleData.transmision}
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								Tracción
								<input
									type="text"
									name="traccion"
									value={vehicleData.traccion}
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
							</div>
						</div>
					</div>
					{/* Tercera sección: Información básica del vehículo LADO IZQUIERDO */}
					<div className="flex space-x-4 text-myColor font-semibold">
						<div className="w-1/2">
							<div className="p-4 rounded-lg mb-4">
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2">
									<Gauge className="w-5 h-5" />
									Kilometraje
								</h3>
								<input
									type="number"
									name="kilometraje"
									value={vehicleData.kilometraje}
									placeholder="Ej: 66774"
									onInput={(e) => {
										if (e.target.value.length > 6) {
											e.target.value =
												e.target.value.slice(0, 6);
										}
									}}
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
									<PiEngineBold className="w-5 h-5" />
									Cilindrada del motor
								</h3>
								<input
									type="text"
									name="cilindrada"
									value={vehicleData.cilindrada}
									placeholder="Ejemplo: 1.6"
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
									<IoColorFill className="w-5 h-5" />
									Color del vehículo
								</h3>
								<input
									type="text"
									name="color"
									value={vehicleData.color}
									placeholder="Gris, Blanco, etc."
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
									<GiCarSeat className="w-5 h-5" />
									Tapicería
								</h3>
								<input
									type="text"
									name="tapiceria"
									value={vehicleData.tapiceria}
									placeholder="Cuero, Tela, etc."
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
									<GiCarDoor className="w-5 h-5" />
									N° de puertas
								</h3>
								<select
									name="numPuertas"
									value={vehicleData.numPuertas}
									placeholder="Elegir"
									className={`w-full border border-myColor rounded-md text-gray-400 focus:border-myColor focus:ring-myColor cursor-pointer px-2 ${
										!vehicleData.numPuertas
											? "text-gray-400"
											: "text-myGray"
									}`}
								>
									<option value="" disabled selected>
										Elija una opción
									</option>
									<option value="2">2 puertas</option>
									<option value="3">3 puertas</option>
									<option value="4">4 puertas</option>
									<option value="5">5 puertas</option>
								</select>
								<h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
									<RxIdCard className="w-5 h-5" />
									VIN (chasis)
								</h3>
								<input
									type="text"
									name="vin"
									value={vehicleData.vin}
									placeholder="Ingrese el VIN del vehículo..."
									className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2"
								/>
							</div>
						</div>
						<div className="w-1/2">
							<div className="p-4 rounded-lg mb-2 text-myColor">
								{[
									"soap",
									"permisoCirculacion",
									"revisionTecnica",
									"emisionContaminantes",
								].map((doc) => (
									<div
										key={doc}
										className="flex items-center gap-2 mt-4 mb-6"
									>
										<div className="flex-1">
											<h3 className="block text-myColor mb-1">
												{doc.charAt(0).toUpperCase() +
													doc
														.slice(1)
														.replace(
															/([A-Z])/g,
															" $1"
														)}
											</h3>
											<div className="flex gap-4">
												<div
													className="relative w-1/2 cursor-pointer"
													onClick={() => {
														const dateInput =
															document.querySelector(
																`input[name="${doc}"]`
															);
														if (dateInput)
															dateInput.showPicker();
													}}
												>
													<input
														type="date"
														name={doc}
														value={
															vehicleData[doc]
																.fecha
														}
														className={`block w-full rounded-md border border-myColor px-2 py-2 ${
															!vehicleData[doc]
																.fecha
																? "text-gray-400"
																: "text-myGray"
														} focus:border-myColor focus:ring-myColor cursor-pointer`}
													/>
												</div>
												<select
													value={
														vehicleData[doc]
															.vigencia
													}
													className={`block w-1/2 rounded-md border border-myColor px-2 py-2 ${
														!vehicleData[doc]
															.vigencia
															? "text-gray-400"
															: "text-myGray"
													} focus:border-myColor focus:ring-myColor cursor-pointer`}
												>
													<option
														value=""
														disabled
														selected
													>
														Elija una opción
													</option>
													<option value="Vigente">
														Vigente
													</option>
													<option value="No vigente">
														No vigente
													</option>
													<option value="No homologado">
														No homologado
													</option>
												</select>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Cuarta sección: Información básica del vehículo LADO IZQUIERDO */}
					<div className="flex space-x-4 text-myColor font-semibold">
						<div className="w-1/2">
							<div className="bg-offCyan p-4 rounded-lg mb-4">
								<div className="flex items-center gap-2 mb-2">
									<RiOilFill className="w-5 h-5 text-myColor" />
									<label className="block text-sm font-medium text-gray-700">
										Estado del Aceite
									</label>
								</div>
								<div className="space-y-2">
									<select
										value={vehicleData.estadoAceite.estado}
										className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 ${
											!vehicleData.estadoAceite.estado
												? "text-gray-400"
												: "text-myGray"
										}`}
									>
										<option
											value=""
											disabled
											selected
											className="text-gray-400"
										>
											Elija una opción
										</option>
										<option
											value="Nuevo"
											className="text-myGray"
										>
											Nuevo
										</option>
										<option
											value="Bueno"
											className="text-myGray"
										>
											Bueno
										</option>
										<option
											value="Regular"
											className="text-myGray"
										>
											Regular
										</option>
										<option
											value="Malo"
											className="text-myGray"
										>
											Malo
										</option>
									</select>
									<textarea
										value={
											vehicleData.estadoAceite
												.observaciones
										}
										placeholder="Observaciones del aceite..."
										className="block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 text-sm text-myGray"
										rows="2"
									/>
								</div>
							</div>
							<div className="bg-offCyan p-4 rounded-lg mb-4">
								<div className="flex items-center gap-2 mb-2">
									<MdCarCrash className="w-5 h-5 text-myColor" />
									<label className="block text-sm font-medium text-gray-700">
										Estado de los Frenos
									</label>
								</div>
								<div className="space-y-2">
									<select
										value={vehicleData.estadoFrenos.estado}
										className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 ${
											!vehicleData.estadoFrenos.estado
												? "text-gray-400"
												: "text-myGray"
										}`}
									>
										<option
											value=""
											disabled
											selected
											className="text-gray-400"
										>
											Elija una opción
										</option>
										<option
											value="Nuevo"
											className="text-myGray"
										>
											Nuevo
										</option>
										<option
											value="Bueno"
											className="text-myGray"
										>
											Bueno
										</option>
										<option
											value="Regular"
											className="text-myGray"
										>
											Regular
										</option>
										<option
											value="Malo"
											className="text-myGray"
										>
											Malo
										</option>
									</select>
									<textarea
										value={
											vehicleData.estadoFrenos
												.observaciones
										}
										placeholder="Observaciones de los frenos..."
										className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
										rows="2"
									/>
								</div>
							</div>
						</div>
						<div className="w-1/2">
							<div className="bg-offCyan p-4 rounded-lg mb-4">
								<div className="flex items-center gap-2 mb-2">
									<Route className="w-5 h-5 text-myColor" />
									<label className="block text-sm font-medium text-gray-700">
										Prueba en Ruta
									</label>
								</div>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={
												vehicleData.pruebaRuta.realizada
											}
											className="rounded border-gray-300 text-myColor focus:ring-myColor"
										/>
										<span className="text-sm text-gray-700">
											Prueba realizada
										</span>
									</div>
									<textarea
										value={
											vehicleData.pruebaRuta.observaciones
										}
										placeholder="Observaciones de la prueba en ruta..."
										className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
										rows="2"
									/>
								</div>
							</div>
							<div className="bg-offCyan p-4 rounded-lg mb-4">
								<div className="flex items-center gap-2 mb-2">
									<GiCarWheel className="w-5 h-5 text-myColor" />
									<label className="block text-sm font-medium text-gray-700">
										Estado de los Neumáticos
									</label>
								</div>
								<div className="space-y-2">
									<select
										value={
											vehicleData.estadoNeumaticos.estado
										}
										className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor ${
											!vehicleData.estadoNeumaticos.estado
												? "text-gray-400"
												: "text-myGray"
										}`}
									>
										<option
											value=""
											disabled
											selected
											className="text-gray-400"
										>
											Elija una opción
										</option>
										<option
											value="Nuevo"
											className="text-myGray"
										>
											Nuevo
										</option>
										<option
											value="Bueno"
											className="text-myGray"
										>
											Bueno
										</option>
										<option
											value="Regular"
											className="text-myGray"
										>
											Regular
										</option>
										<option
											value="Malo"
											className="text-myGray"
										>
											Malo
										</option>
									</select>
									<textarea
										value={
											vehicleData.estadoNeumaticos
												.observaciones
										}
										placeholder="Observaciones de los neumáticos..."
										className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
										rows="2"
									/>
								</div>
							</div>
						</div>
					</div>
					{/* Comentarios */}
					<div className="bg-offCyan rounded-lg p-6">
						<h3 className="text-lg font-semibold text-myGray flex items-center gap-2 mb-4">
							Comentarios adicionales
						</h3>
						<div className="flex-1">
							<textarea
								name="comentarios"
								value={vehicleData.comentarios}
								placeholder="Ingrese aquí sus observaciones sobre el vehículo..."
								rows="10"
								required
								className="text-myGray block w-full border border-myColor rounded-md focus:border-myColor focus:ring-myColor p-3"
							/>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<img
							src="../../img/logoyme-secondary.svg"
							width={360}
							height={75}
							alt="YoMeEncargo logo"
						/>
						<div className="flex gap-4">
							<button
								className="bg-myColor text-white px-6 py-2 rounded-md hover:bg-myGray flex items-center gap-2"
								type="button"
							>
								<DownloadLink vehicleData={vehicleData} />
							</button>
						</div>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default ReportShared;
