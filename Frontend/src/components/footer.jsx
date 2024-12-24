import {
	TwitterIcon,
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

	return (
		<footer className="text-gray-400 bg-myGray w-full">
			<div className="px-4 py-5 max-w-screen-xl mx-auto md:px-8">
				<div className="max-w-lg mx-auto text-center">
					<a href="/" className="inline-block">
						<img
							src="img/logoyme.svg"
							alt="Logo de YoMeEncargo"
							className="w-60 h-auto mx-auto"
						/>
					</a>
					<p className="leading-relaxed mt-2 text-[15px]">
						La plataforma que necesitabas para encontrar mecánicos fácil y rápido
						al alcance de un click.
					</p>
				</div>
				<ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
					{footerNavs.map((item, idx) => (
						<li key={idx} className="hover:text-myColor">
							<a href={item.href}>{item.name}</a>
						</li>
					))}
				</ul>
				<div className="mt-8 items-center justify-between sm:flex">
					<div className="mt-4 sm:mt-0 text-center sm:text-left">
						&copy; 2024 YoMeEncargo. Todos los derechos reservados.
					</div>
					<div className="mt-6 sm:mt-0">
						<ul className="flex items-center space-x-4">
							{/* Icono de Twitter */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="#" aria-label="Twitter">
									<TwitterIcon />
								</a>
							</li>

							{/* Icono de Facebook */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="#" aria-label="Facebook">
									<FacebookIcon />
								</a>
							</li>

							{/* Icono de GitHub */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="#" aria-label="GitHub">
									<GithubIcon />
								</a>
							</li>

							{/* Icono de Instagram */}
							<li className="w-10 h-10 border rounded-full flex items-center justify-center bg-offCyan hover:bg-gray-400 hover:border-myColor transition">
								<a href="#" aria-label="Instagram">
									<InstagramIcon />
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
