import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	X,
	FileUser,
	ChevronDown,
	Star,
	AlertTriangle,
	MessageSquare,
	Edit2,
	Trash2,
} from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const ModalMecanico = ({ mecanico, selectedDate, onClose, onReservar }) => {
	const [selectedTime, setSelectedTime] = useState("");
	const [showReportModal, setShowReportModal] = useState(false);
	const [reportReason, setReportReason] = useState("");
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [rating, setRating] = useState(5);
	const [editingComment, setEditingComment] = useState(null);

	const [reviews, setReviews] = useState(() => {
		const savedReviews = localStorage.getItem(`reviews-${mecanico?.id}`);
		if (savedReviews) {
			return JSON.parse(savedReviews);
		}
		return [];
	});

	useEffect(() => {
		if (mecanico?.id) {
			localStorage.setItem(
				`reviews-${mecanico.id}`,
				JSON.stringify(reviews)
			);
		}
	}, [reviews, mecanico?.id]);

	const handleReservation = () => {
		if (!selectedTime || !selectedDate) {
			alert("Por favor selecciona una fecha y horario antes de continuar.");
			return;
		}

		// Llamar a onReservar para cambiar al ModalFormulario
		onReservar({
			selectedDate,
			selectedTime,
			mechanic: mecanico,
		});
	};

	const handleSubmitReport = () => {
		if (!reportReason.trim()) {
			alert("Por favor, describe el motivo del reporte");
			return;
		}

		setShowReportModal(false);
		setReportReason("");
		alert("Reporte enviado con éxito");
	};

	const handleSubmitComment = () => {
		if (!newComment.trim()) {
			alert("Por favor, escribe un comentario");
			return;
		}

		if (editingComment) {
			// Modo edición
			setReviews((prevReviews) =>
				prevReviews.map((review) =>
					review.id === editingComment.id
						? {
							...review,
							text: newComment,
							rating,
							editedAt: new Date().toISOString(),
						}
						: review
				)
			);
		} else {
			// Nuevo comentario
			const newReview = {
				id: Date.now().toString(), // ID único para el comentario
				text: newComment,
				rating: rating,
				date: new Date().toISOString(),
				userId: "usuario_actual",
			};
			setReviews((prevReviews) => [newReview, ...prevReviews]);
		}

		setNewComment("");
		setRating(5);
		setShowCommentModal(false);
		setEditingComment(null);
		alert(
			editingComment
				? "¡Comentario actualizado!"
				: "¡Gracias por tu comentario!"
		);
	};

	const handleEditComment = (review) => {
		setEditingComment(review);
		setNewComment(review.text);
		setRating(review.rating);
		setShowCommentModal(true);
	};

	const handleDeleteComment = (reviewId) => {
		if (
			window.confirm(
				"¿Estás seguro de que quieres eliminar este comentario?"
			)
		) {
			setReviews((prevReviews) =>
				prevReviews.filter((review) => review.id !== reviewId)
			);
		}
	};

	const availableTimes = [
		"08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
	];


	return (
		<div className="p-6 mb-8">
			{/* Modal Header */}
			<div className="flex justify-between items-center p-6 border-b">
				<h2 className="text-2xl font-bold text-gray-900">Información del Mecánico</h2>
				<button
					onClick={onClose}
					className="text-gray-500 hover:text-gray-700"
				>
					<X size={24} />
				</button>
			</div>

			{/* Modal Content */}
			<div className="p-6 flex flex-col md:flex-row gap-8">
				<div className="flex-1 space-y-6">
					{/* Profile Info */}
					<div className="flex items-start space-x-4">
						<Avatar.Root className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-offCyan ring-offset-2 ring-myGray ring-2">
							<Avatar.Fallback className="text-4xl text-myColor font-semibold">
								{mecanico.usuario.nombre?.charAt(0)}
								{mecanico.usuario.apellido?.charAt(0)}
							</Avatar.Fallback>
							<Avatar.Image
								src={
									mecanico?.url_foto
										? `${API_URL}/files/fotos/${mecanico.url_foto}`
										: ""
								}
								alt={`${mecanico?.usuario?.nombre || ''} ${mecanico?.usuario?.apellido || ''}`}
								onError={(e) => {
									e.target.src = '';
								}}
								className="w-full h-full rounded-full object-cover"
							/>
						</Avatar.Root>
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-gray-900">
								{`${mecanico.usuario.nombre} ${mecanico.usuario.apellido}`}
							</h3>
							<div className="flex items-center mb-2">
								{[...Array(5)].map((_, index) => {
									const isFilled =
										index < Math.round(mecanico.valoracion);
									return (
										<Star
											key={index}
											className={`w-4 h-4 ${isFilled
												? "text-yellow-400 fill-current"
												: "text-gray-300"
												}`}
										/>
									);
								})}
								<span className="ml-2 text-sm text-black">
									{Math.round(mecanico.valoracion)}/5
								</span>

							</div>

						</div>
						<div className="rounded-md">
							<div className="flex flex-col items-center">
								<div className="bg-primary p-3 rounded-lg">
									<FileUser className="w-14 h-14 text-myColor " />
								</div>
								<a
									href={
										mecanico?.certificado
											? `${API_URL}/files/certificados/${mecanico.certificado}`
											: "#"
									}
									target="_blank"
									rel="noopener noreferrer"
									download
									className="text-sm text-myColor font-semibold hover:underline"
								>
									Descargar Certificado
								</a>
							</div>
						</div>
					</div>

					{/* Reviews */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-gray-900">
							Comentarios
						</h4>
						<div className="max-h-[400px] overflow-y-auto pr-2">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{reviews.map((review) => (
									<div
										key={review.id}
										className="bg-gray-100 p-4 rounded-lg relative group"
									>
										{/* Mostrar estrellas */}
										<div className="flex mb-2">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${i < review.rating
														? "text-yellow-400 fill-current"
														: "text-gray-300"
														}`}
												/>
											))}
										</div>

										<p className="text-gray-700 text-sm">
											{review.text}
										</p>

										{/* Fecha del comentario */}
										<p className="text-xs text-gray-500 mt-2">
											{new Date(
												review.date
											).toLocaleDateString()}
											{review.editedAt && " (editado)"}
										</p>

										{/* Botones de editar/eliminar (solo visibles para el usuario actual) */}
										{review.userId === "usuario_actual" && (
											<div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
												<button
													onClick={() =>
														handleEditComment(
															review
														)
													}
													className="p-1 text-blue-600 hover:bg-blue-100 rounded"
												>
													<Edit2 className="w-4 h-4" />
												</button>
												<button
													onClick={() =>
														handleDeleteComment(
															review.id
														)
													}
													className="p-1 text-red-600 hover:bg-red-100 rounded"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Right Section - Actions */}
				<div className="w-full md:w-64 space-y-4">
					<div className="space-y-2">
						<p className="text-gray-700 mb-4 font-semibold">
							Fecha:{" "}
							{selectedDate
								? new Date(
									selectedDate + "T00:00:00"
								).toLocaleDateString()
								: "No seleccionada"}
						</p>

						<div className="relative">
							<select
								className="w-full p-2 border border-myColor text-myGray rounded-md appearance-none hover:border-myColor/80 focus:ring-2 focus:ring-myColor/50 focus:outline-none cursor-pointer bg-white"
								value={selectedTime}
								onChange={(e) =>
									setSelectedTime(e.target.value)
								}
								required
							>
								<option value="" disabled hidden>
									Seleccionar horario
								</option>
								{availableTimes.map((time) => (
									<option key={time} value={time}>
										{time}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
								<ChevronDown className="w-4 h-4 text-myGray" />
							</div>
						</div>
					</div>

					<button
						className="w-full text-white font-semibold bg-myColor hover:bg-myGray py-2 px-4 rounded-md hover:text-myColor hover:shadow-none duration-150 "
						onClick={handleReservation}
					>
						Reservar mecánico
					</button>

					<button
						onClick={() => setShowCommentModal(true)}
						className="w-full border bg-primary font-semibold hover:text-white hover:bg-myGray border-myColor hover:border-primary text-myColor py-2 px-4 rounded-md flex items-center justify-center gap-2"
					>
						<MessageSquare className="w-5 h-5" />
						Dejar un comentario
					</button>

					<div>
						<div className="grid h-full">
							<button
								onClick={() => setShowReportModal(true)}
								className="w-4/3 py-2 px-4 bg-primary text-red-500 text-sm rounded-md border hover:text-white hover:bg-red-500 border-myColor hover:border-primary flex items-center gap-2 justify-center place-self-end"
							>
								<AlertTriangle className="w-4 h-4" />
								Reportar
							</button>
						</div>

						{showReportModal && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
								<div className="bg-white p-6 rounded-lg shadow-xl w-96">
									<h3 className="text-lg font-semibold mb-4 text-myColor">
										Reportar Mecánico
									</h3>
									<textarea
										value={reportReason}
										onChange={(e) =>
											setReportReason(e.target.value)
										}
										placeholder="Describe el motivo del reporte..."
										className="w-full h-32 p-2 border border-gray-300 text-myGray rounded-md mb-4 resize-none"
									/>
									<div className="flex justify-end space-x-2">
										<button
											onClick={() =>
												setShowReportModal(false)
											}
											className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
										>
											Cancelar
										</button>
										<button
											onClick={handleSubmitReport}
											className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
										>
											Enviar Reporte
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Modal de comentario */}
			{showCommentModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-xl w-96">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-myColor">
								{editingComment
									? "Editar comentario"
									: "Dejar un comentario"}
							</h3>
							<button
								onClick={() => {
									setShowCommentModal(false);
									setEditingComment(null);
									setNewComment("");
									setRating(5);
								}}
								className="text-gray-500 hover:text-gray-700"
							>
								<X size={24} />
							</button>
						</div>

						{/* Selección de estrellas */}
						<div className="mb-4">
							<p className="text-sm text-gray-600 mb-2">
								Calificación:
							</p>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`w-6 h-6 cursor-pointer ${star <= rating
											? "text-yellow-400 fill-current"
											: "text-myColor"
											}`}
										onClick={() => setRating(star)}
									/>
								))}
							</div>
						</div>

						{/* Campo de comentario */}
						<textarea
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder="Escribe tu comentario aquí..."
							className="w-full h-32 p-2 border text-myGray border-gray-300 rounded-md mb-4 resize-none focus:ring-2 focus:ring-myColor focus:outline-none"
						/>

						{/* Botones de acción */}
						<div className="flex justify-end space-x-2">
							<button
								onClick={() => setShowCommentModal(false)}
								className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
							>
								Cancelar
							</button>
							<button
								onClick={handleSubmitComment}
								className="px-4 py-2 bg-myColor text-white rounded-md hover:bg-myGray"
							>
								Publicar comentario
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

ModalMecanico.propTypes = {
	mecanico: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		url_foto: PropTypes.string.isRequired,
		valoracion: PropTypes.number.isRequired,
		certificado: PropTypes.string,
		horario: PropTypes.string.isRequired,
		usuario: PropTypes.shape({
			apellido: PropTypes.string.isRequired,
			celular: PropTypes.string.isRequired,
			correo: PropTypes.string.isRequired,
			id: PropTypes.number.isRequired,
			nombre: PropTypes.string.isRequired,
			rol: PropTypes.string.isRequired,
		}),
	}),
	selectedDate: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	onReservar: PropTypes.func.isRequired,
};

export default ModalMecanico;
