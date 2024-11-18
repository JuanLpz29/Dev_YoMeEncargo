import PropTypes from "prop-types";

const NavBar = ({ userType, userName, userPhoto, isLogged }) => {
	return (
		<header className="bg-black">
			<nav className="h-20 w-[90%] mx-auto overflow-hidden max-w-screen-xl items-center flex">
				<div className="flex w-1/6 min-w-40">
					<a href="./">
						<img
							src="img/logoyme.svg"
							alt="logo"
							className="w-full"
						/>
					</a>
				</div>
				<div className="flex flex-grow md:w-3/6 justify-center">
					<input type="checkbox" id="menu" className="peer hidden" />
					<label
						htmlFor="menu"
						className="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden"
					></label>
					<div className="fixed inset-0 bg-gradient-to-b from-white/70 to-black/70 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:bg-none md:translate-x-0">
						<ul className="absolute inset-x-0 top-24 p-12 bg-white w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-[#43a6e8] shadow-2xl md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
							<li>
								<a href="#">Inicio</a>
							</li>
							<li>
								<a href="#">Perfil</a>
							</li>
							<li>
								<a href="#">Ayuda</a>
							</li>
							{/* Mostrar "Soy Mecánico" solo si está logueado */}
							{isLogged && userType === "usuario" && (
								<li>
									<a
										href="#"
										className="bg-[#43a6e8] text-white px-4 py-2 rounded-full shadow-md shadow-[#43a6e8]/50"
									>
										Soy Mecánico
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="flex items-center md:w-1/6 min-w-40 justify-end">
					{!isLogged ? (
						<a
							href="#"
							className="bg-[#43a6e8] text-white w-max py-4 px-12 rounded-full shadow-sm shadow-[#43a6e8]/30"
						>
							Iniciar Sesión
						</a>
					) : (
						<div className="flex items-center mr-4">
							<div className="relative">
								<button className="text-white hover:text-[#43a6e8]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
										/>
									</svg>
								</button>
								<span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
									3
								</span>
							</div>
							<div className="ml-4">
								<button className="flex items-center space-x-2">
									{userType === "mecanico" && userPhoto ? (
										<img
											src={userPhoto}
											alt="Usuario"
											className="w-8 h-8 rounded-full"
										/>
									) : (
										<div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center">
											{userName
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</div>
									)}
									<span className="text-white hover:text-[#43a6e8]">
										{userName}
									</span>
								</button>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

NavBar.propTypes = {
	userType: PropTypes.oneOf(["usuario", "mecanico"]),
	userName: PropTypes.string,
	userPhoto: PropTypes.string,
	isLogged: PropTypes.bool,
};

export default NavBar;
