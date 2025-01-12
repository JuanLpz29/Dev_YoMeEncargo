import React, { useState, useEffect } from "react";
import {
	XIcon,
	FacebookIcon,
	GithubIcon, 
	InstagramIcon,
} from "../assets/icons";

const Footer = () => {
	const footerNavs = [
		{
			href: "/ayuda",
			name: "Contáctanos",
		},
	];

	const [userRole, setUserRole] = useState(null);

		useEffect(() => {
			const usuarioString = localStorage.getItem("usuario");
			if (usuarioString) {
				const usuario = JSON.parse(usuarioString);
				setUserRole(usuario.rol);
			}
		}, []);
	

	return (
		<footer className="text-gray-400 bg-myGray w-full">
			<div className="px-4 py-5 max-w-screen-xl mx-auto md:px-8">
				<div className="max-w-lg mx-auto text-center">
				<a href={userRole === "MECANICO" ? "/HeroMecanico" : "/"}>
						<img
							src="img/logoyme.svg"
							alt="Logo de YoMeEncargo"
							className="w-60 h-auto mx-auto"
						/>
					</a>
					<p className="leading-relaxed mt-2 text-[15px] font-semibold">
						La plataforma que necesitabas para encontrar mecánicos fácil y rápido
						al alcance de un click.
					</p>
				</div>
				<ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
					{footerNavs.map((item, idx) => (
						<li key={idx}>
							<a 
								href={item.href}
								className="inline-block px-6 py-2 text-white bg-myColor rounded-full hover:bg-opacity-90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
							>
								{item.name}
							</a>
						</li>
					))}
				</ul>
				<div className="mt-8 items-center justify-between sm:flex">
					<div className="mt-4 sm:mt-0 text-center sm:text-left font-semibold">
						&copy; 2025 YoMeEncargo. Todos los derechos reservados.
					</div>
					<div className="mt-6 sm:mt-0">
						<ul className="flex items-center space-x-4">
							{/* Icono de X */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="https://x.com" aria-label="X">
									<XIcon />
								</a>
							</li>

							{/* Icono de Facebook */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="https://www.facebook.com" aria-label="Facebook">
									<FacebookIcon />
								</a>
							</li>

							{/* Icono de Instagram */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="https://www.instagram.com/yomeencargocl/" aria-label="Instagram">
									<InstagramIcon />
								</a>
							</li>

							{/* Icono de GitHub */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="https://github.com" aria-label="GitHub">
									<GithubIcon />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
