import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const Ayuda = () => {
	const [formSubmitted, setFormSubmitted] = useState(false);
	
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Agregar Lógica para enviar el formulario a un servidor
		setFormSubmitted(true); // Cambia el estado a "formulario enviado"
	};

	return (
		<>
			<NavBar />
			<main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8 max-w-screen-xl mx-auto">
				{!formSubmitted ? (
					<div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
						<div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
							<h1 className="title-font font-medium text-3xl text-gray-900">
								¿Tuviste un problema? ¡Contáctanos!
							</h1>
							<p className="leading-relaxed mt-4 text-myColor font-semibold">
								Ingresa tus datos y tus comentarios para ayudarte a la brevedad.
							</p>
						</div>
						<form
							onSubmit={handleSubmit}
							className="lg:w-2/5 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
						>
							<h2 className="text-gray-900 text-lg font-medium title-font mb-5">
								Contacto
							</h2>
							<div className="relative mb-4">
								<label
									htmlFor="full-name"
									className="leading-7 text-sm text-gray-600"
								>
									Nombre Completo
								</label>
								<input
									type="text"
									id="full-name"
									name="full-name"
									className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									required
								/>
							</div>
							<div className="relative mb-4">
								<label
									htmlFor="email"
									className="leading-7 text-sm text-gray-600"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									required
								/>
							</div>
							<div className="relative mb-4">
								<label
									htmlFor="message"
									className="leading-7 text-sm text-gray-600"
								>
									Comentario, Problema o Reporte
								</label>
								<textarea
									id="message"
									name="message"
									rows="6"
									className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out resize-none"
									placeholder="Escribe tu mensaje aquí..."
									required
								></textarea>
							</div>
							<button
								type="submit"
								className="text-white font-semibold bg-myColor border-0 py-2 px-8 focus:outline-none hover:bg-myGray rounded text-lg hover:text-myColor"
							>
								Enviar
							</button>
							<p className="text-xs text-gray-500 mt-3">
								Una vez leamos tu mensaje te responderemos lo antes posible.
							</p>
						</form>
					</div>
				) : (
					<div className="text-center p-8 bg-offCyan rounded-lg py-60 px-8">
						<h2 className="text-2xl font-bold text-gray-900">
							¡Gracias por comunicarte con nosotros!
						</h2>
						<p className="mt-4 text-gray-700">
							Hemos recibido tu mensaje y te responderemos lo antes posible.
						</p>
						<button
							onClick={(() => navigate('/'))}
							className="mt-6 bg-myColor text-white font-semibold py-2 px-8 rounded hover:bg-myGray hover:text-myColor"
						>
							Volver al Home
						</button>
					</div>
				)}
			</main>
			<Footer />
		</>
	);
};

export default Ayuda;
