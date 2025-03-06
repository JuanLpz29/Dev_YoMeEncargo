import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/img/hero.jpeg";

const HeroMecanico = () => {
	const navigate = useNavigate();

	// Verificar si el usuario está logueado
	const isLoggedIn = () => {
		return localStorage.getItem("token") !== null;
	};

	return (
		<div className="bg-offCyan">
			
			<section className="py-28">
				<div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8 w-full">
					<div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
						<img
							src={heroImage}
							alt=""
							className="md:rounded-tl-[108px]"
						/>
					</div>
					<div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
						<h1 className="text-sm text-[#43a6e8] font-medium">
							Cientos de clientes esperan a recibir una inspección
							hecha por ti.
						</h1>
						<h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
							¡Bienvenido a
							<span className="text-[#43a6e8]"> YoMeEncargo</span>
							!
						</h2>
						<p>
							Como mecánico, podras acceder a las inspecciones
							programadas por los clientes y realizarlas de manera
							segura y confiable.
						</p>
						<div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
							<button
								onClick={() => navigate("/inspecciones")}
								disabled={!isLoggedIn()}
								className={`block py-2 px-4 text-center font-medium rounded-lg shadow-lg 
                                ${
									isLoggedIn()
										? "text-white bg-myColor hover:bg-myGray hover:text-myColor hover:shadow-none duration-150"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
							>
								Ver Inspecciones
							</button>
							<button
								onClick={() => navigate("/ProfileMecanico")}
								className="block py-2 px-4 text-center font-medium rounded-lg shadow-lg text-myColor bg-white border border-myColor hover:bg-myColor hover:text-white hover:shadow-none duration-150"
							>
								Ver mi perfil
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HeroMecanico;
