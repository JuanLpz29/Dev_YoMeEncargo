import { useRef, useState } from "react";
import PropTypes from "prop-types";

const FaqsCard = (props) => {
	const answerElRef = useRef();
	const [state, setState] = useState(false);
	const [answerH, setAnswerH] = useState("0px");
	const { faqsList, idx } = props;

	const handleOpenAnswer = () => {
		const answerElH = answerElRef.current.childNodes[0].offsetHeight;
		setState(!state);
		setAnswerH(`${answerElH + 20}px`);
	};

	return (
		<div
			className="bg-offCyan space-y-3 mt-5 overflow-hidden border-b w-full"
			key={idx}
			onClick={handleOpenAnswer}
		>
			<h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
				{faqsList.q}
				{state ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M20 12H4"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-500 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				)}
			</h4>
			<div
				ref={answerElRef}
				className="duration-300"
				style={state ? { height: answerH } : { height: "0px" }}
			>
				<div>
					<p className="text-gray-500">{faqsList.a}</p>
				</div>
			</div>
		</div>
	);
};

FaqsCard.propTypes = {
	faqsList: PropTypes.shape({
		q: PropTypes.string.isRequired,
		a: PropTypes.string.isRequired,
	}).isRequired,
	idx: PropTypes.number.isRequired,
};

const FAQs = () => {
	const faqsList = [
		{
			q: "¿Qué es YoMeEncargo?",
			a: "Es una plataforma que facilita la comunicación con mecánicos para una inspección vehicular confiable a la hora de tomar decisiones respecto a la compra y/o venta de vehículos usados.",
		},
		{
			q: "¿Es gratis usar YoMeEncargo?",
			a: "Sí, la plataforma es de uso completamente gratuito.",
		},
		{
			q: "¿Cómo puedo encontrar un mecánico?",
			a: "Sólo debes presionar en el botón de arriba para ver la lista de mecánicos disponibles, podrás filtrarlo según la fecha y el horario requerido y luego deberás llenar el formulario con los datos de tu vehículo. Finalmente tu solicitud será enviada al mecánico y este deberá aceptarla.",
		},
		{
			q: "¿Puedo confiar en en los mecánicos de la plataforma?",
			a: "Sí, ya que todos nuestros mecánicos poseen una certificación correspondiente a sus estudios profesionales.",
		},
		{
			q: "¿Cómo se realiza la inspección del vehículo?",
			a: "El mecánico que elijas se acercará a la dirección previamente definida y realizará la revisión del vehículo.",
		},
		{
			q: "¿Puedo elegir la fecha y la hora de la inspección?",
			a: "Sí, puedes elegir el lugar, la hora y el día en que deseas realizar la revisión.",
		},
		{
			q: "¿Que incluye el reporte de la inspección?",
			a: "El reporte incluye una revisión detallada del vehículo, en la que se dan a conocer los aspectos positivos y negativos del mismo.",
		},
	];

	return (
		<div className="bg-offCyan py-28">
			<section id ="faqs" className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-4 w-full">
				<div className="space-y-3 text-center">
					<h1 className="text-3xl text-gray-800 font-semibold">
						Preguntas Frecuentes
					</h1>
					<p className="text-gray-600 max-w-lg mx-auto text-lg">
						Encuentra aquí las respuestas a las preguntas más frecuentes
						que nuestros usuarios suelen tener.
					</p>
				</div>
				<div className="mt-14 max-w-2xl mx-auto">
					{faqsList.map((item, idx) => (
						<FaqsCard key={idx} idx={idx} faqsList={item} />
					))}
				</div>
			</section>
		</div>
	);
};

export default FAQs;
