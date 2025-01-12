import { useNavigate } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()

	// const handleGoBack = () => {
	// 	navigate(-1)
	//}

	return (
		<main>
			<div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
				<div className="max-w-lg mx-auto space-y-3 text-center mb-6 mt-6">
					<h3 className="text-myColor text-4xl font-semibold">404 Error</h3>
					<p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
						Página no encontrada
					</p>
					<p className="text-gray-600 md:text-lg py-4">
						Lo sentimos, la página que buscas no existe.
					</p>
					<div className="flex flex-wrap items-center justify-center gap-3">
						<button	
							onClick={() => navigate(-1)}
							className=" mt-8 w-3/4 block py-2 px-4 text-white font-medium bg-myColor duration-150 hover:bg-myGray active:bg-myColor rounded-lg"
						>
							VOLVER
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
