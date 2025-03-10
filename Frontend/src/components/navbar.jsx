import { useState, useRef, useEffect } from "react";
import { CloseMenuIcon, OpenMenuIcon } from "../assets/icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ModalPM from "../components/ModalPM";
import { getMecanico } from "../actions/yo-me-encargo";
import logoYme from '../assets/img/logoyme.svg';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("LA API ES:", API_URL);


const usuarioString = localStorage.getItem("usuario");
const usuario = JSON.parse(usuarioString);
const token = localStorage.getItem("token");
const loggedIn = token ? true : false;

const ProfileDropDown = (props) => {
	const [state, setState] = useState(false);
	const [datosMecanico, setDatosMecanico] = useState(null);
	const profileRef = useRef();
	const navigate = useNavigate();

	// Obtener el usuario del localStorage de manera segura
	const getUser = () => {
		const usuarioString = localStorage.getItem("usuario");
		try {
			return usuarioString ? JSON.parse(usuarioString) : null;
		} catch (e) {
			console.error("Error parsing user data:", e);
			return null;
		}
	};

	const usuario = getUser();

	useEffect(() => {
		const obtenerDatosMecanico = async () => {
			if (usuario?.rol === "MECANICO") {
				try {
					const data = await getMecanico(usuario.id);
					setDatosMecanico(data);
				} catch (error) {
					console.error("Error al obtener datos del mecánico:", error);
				}
			}
		};

		obtenerDatosMecanico();
	}, [usuario]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("usuario");
		navigate("/");
	};

	const navigation =
		usuario?.rol === "MECANICO"
			? [
				{ title: "Perfil", path: "/ProfileMecanico" },
				{ title: "Salir", path: "/", onClick: handleLogout },
			]
			: [
				{ title: "Perfil", path: "/perfil" },
				{ title: "Salir", path: "/", onClick: handleLogout },
			];

	useEffect(() => {
		const handleDropDown = (e) => {
			if (!profileRef.current.contains(e.target)) setState(false);
		};
		document.addEventListener("click", handleDropDown);
	}, []);

	const getInitials = (nombre, apellido) => {
		return `${nombre?.charAt(0) || ""}${apellido?.charAt(0) || ""
			}`.toUpperCase();
	};

	return (
		<div className={`relative ${props.className}`}>
			<div className="flex items-center space-x-4">
				<button
					ref={profileRef}
					className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-[#43a6e8] ring-2 flex items-center justify-center bg-gray-200"
					onClick={() => setState(!state)}
				>
					{usuario?.rol === "MECANICO" && datosMecanico?.url_foto ? (
						<img
							src={`${API_URL}/files/fotos/${datosMecanico.url_foto}`}
							className="w-full h-full rounded-full object-cover"
							alt={`${usuario?.nombre || ''} ${usuario?.apellido || ''}`}
						/>
					) : usuario && usuario.imagen ? (
						<img
							src={usuario.imagen}
							className="w-full h-full rounded-full"
							alt={`${usuario?.nombre || ""} ${usuario?.apellido || ""}`}
						/>
					) : (
						<span className="text-[#43a6e8] font-semibold">
							{usuario
								? getInitials(usuario.nombre, usuario.apellido)
								: ""}
						</span>
					)}
				</button>
				{usuario && (
					<div className="md:hidden lg:block">
						<span className="block text-[#43a6e8]">
							{usuario.nombre} {usuario.apellido}
						</span>
						<span className="block text-sm text-white">
							{usuario.correo}
						</span>
					</div>
				)}
			</div>
			<ul
				className={`md:bg-[#1E293B] top-12 right-0 mt-5 space-y-5 md:absolute md:border md:rounded-md md:text-sm md:w-52 md:shadow-md md:space-y-0 md:mt-0 ${state ? "" : "md:hidden"
					}`}
			>
				{navigation.map((item, idx) => (
					<li key={idx}>
						<a
							className="block text-white hover:text-[#43a6e8] md:p-2.5"
							href={item.path}
							onClick={item.onClick}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

const NavBar = () => {
	const [state, setState] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userRole, setUserRole] = useState(null);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		const usuarioString = localStorage.getItem("usuario");
		if (usuarioString) {
			const usuario = JSON.parse(usuarioString);
			setUserRole(usuario.rol);
		}
	}, []);

	const navigation = [
		// { title: "Contacto", path: "javascript:void(0)" },
		// { title: "FAQs", path: "javascript:void(0)" },
	];

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				!e.target.closest(".menu-btn") &&
				!e.target.closest(".menu-items")
			) {
				setState(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		// Verificar autenticación inicial
		const checkAuth = () => {
			const token = localStorage.getItem("token");
			setIsAuthenticated(!!token);
		};

		// Verificar al montar el componente
		checkAuth();

		// Escuchar cambios en localStorage
		window.addEventListener("storage", checkAuth);

		// Cleanup
		return () => {
			window.removeEventListener("storage", checkAuth);
		};
	}, []);

	return (
		<nav
			className={`bg-myGray md:text-sm border-b ${state
					? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
					: ""
				}`}
		>
			<div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
				<div className="flex items-center justify-between py-5 md:block">
					<a href="/">
						<img
							src={logoYme}
							width={240}
							height={50}
							alt="YoMeEncargo logo"
						/>
					</a>
					<div className="md:hidden">
						<button
							className="menu-btn text-white hover:text-[#43a6e8]"
							onClick={(e) => {
								e.stopPropagation();
								setState(!state);
							}}
						>
							{state ? <CloseMenuIcon /> : <OpenMenuIcon />}
						</button>
					</div>
				</div>
				<div
					className={`flex-1 items-center md:mt-0 md:flex ${state ? "block" : "hidden"
						} `}
				>
					<ul className="justify-center items-center space-y-6 border-b md:border-none md:flex md:space-x-6 md:space-y-0">
						{navigation.map((item, idx) => {
							return (
								<li
									key={idx}
									className="text-white hover:text-[#43a6e8]"
								>
									<a href={item.path} className="block">
										{item.title}
									</a>
								</li>
							);
						})}
					</ul>
					{!isAuthenticated ? (
						<div className="flex-1 gap-x-6 items-center justify-end py-6 space-y-6 md:flex md:space-y-0 md:mt-0">
							<a
								href="/login"
								className="block text-white hover:text-[#43a6e8]"
							>
								Iniciar sesión
							</a>
							<a
								href="/register"
								className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#43a6e8] hover:bg-white hover:text-[#43a6e8] active:bg-gray-900 rounded-full md:inline-flex"
							>
								Registrarse
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path
										fillRule="evenodd"
										d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</div>
					) : (
						<div className="flex-1 flex items-center justify-between md:justify-end space-x-2 sm:space-x-6">
							<ProfileDropDown className="py-8 md:py-0" />
							{usuario?.rol !== "MECANICO" && (
								<div className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-[#43a6e8] hover:bg-white hover:text-[#43a6e8] active:bg-gray-900 rounded-full md:inline-flex">
									<button onClick={openModal}>
										Soy Mecánico
									</button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path
											fillRule="evenodd"
											d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<ModalPM isOpen={isModalOpen} onClose={closeModal} />
		</nav>
	);
};

export default NavBar;

ProfileDropDown.propTypes = {
	className: PropTypes.string,
};

ProfileDropDown.defaultProps = {
	className: "",
};
