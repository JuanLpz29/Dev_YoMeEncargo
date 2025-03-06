import { RightArrowIcon } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero.jpeg";

const Hero = () => {
	const navigate = useNavigate();

	const handleScrollToFAQs = (e) => {
		e.preventDefault();
		const faqs = document.getElementById("faqs");
		if (faqs) {
			faqs.scrollIntoView({ behavior: "smooth" });
		}
	}

	// Verificar si el usuario está logueado
	const isLoggedIn = () => {
		return localStorage.getItem("token") !== null;
	}

	return (
			<section className="py-28   bg-offCyan">
				<div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8 w-full">
					<div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
						<h1 className="text-sm text-[#43a6e8] font-medium">
							¿Buscas un mecánico profesional para una inspección segura y confiable?
						</h1> 
						<h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
						¡Bienvenido a 
						<span className="text-[#43a6e8]"> YoMeEncargo</span>!
						</h2>
						<p>
						Facilitamos inspecciones vehiculares 
						confiables para que tomes decisiones informadas 
						al comprar vehículos usados. 
						</p>
						<div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
							<button
								onClick={() => navigate("/mecanicos")}
								disabled={!isLoggedIn()}
								className={`block py-2 px-4 text-center font-medium rounded-lg shadow-lg 
									${isLoggedIn() 
										? 'text-white bg-myColor hover:bg-myGray hover:text-myColor hover:shadow-none duration-150' 
										: 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
							>
								Ver mecánicos disponibles
							</button>
							<a
								href="#faqs"
								onClick={handleScrollToFAQs}
								className="flex items-center justify-center gap-x-2 py-2 px-4 text-myColor hover:text-white hover:bg-myGray font-medium duration-150 active:bg-gray-100 border border-myColor rounded-lg md:inline-flex"
							>
								¿Qué es YoMeEncargo?
								<RightArrowIcon />
							</a>
 
						</div>
						{!isLoggedIn() && (
							<h1 className="text-sm text-[#43a6e8] font-small font-semibold">
								Debes iniciar sesión para ver a los mecánicos disponibles. Si eres mecánico y quieres trabajar con nosotros, por favor regístrate.
							</h1>
						)}
					</div>
					<div className="flex-none mt-14 md:mt-0 md:max-w-xl">
						<img
							src={heroImage}
							className="md:rounded-tl-[108px]"
							alt=""
						/>
					</div>
				</div>
			</section>
	);
};

export default Hero;
