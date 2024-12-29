import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";

import Perfil from "./pages/perfil";
import Ayuda from "./pages/ayuda";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import Mecanicos from "./pages/mecanicos";

import Inspecciones from "./pages/VistaMecanico/inspecciones";

import NotFound from "./pages/NotFound";

import Reporte from "./pages/VistaMecanico/reporte";

function App() {
	return (
		<div className="bg-offCyan">
			<div className="min h-screen">
				<Routes>
					<Route path="/" element={<HomePage></HomePage>}></Route>
					
					<Route
						path="/login"
						element={<LoginPage></LoginPage>}
					></Route>
					
					<Route
						path="/register"
						element={<RegisterPage></RegisterPage>}
					></Route>
					
					<Route
						path="/mecanicos"
						element={<Mecanicos></Mecanicos>}
					></Route>

					<Route 
						path="/perfil" 
						element={<Perfil></Perfil>}
					></Route>

					<Route
						path="/ayuda"
						element={<Ayuda></Ayuda>}
					></Route>

					<Route
						path="/inspecciones"
						element={<Inspecciones></Inspecciones>}
					></Route>

					<Route
						path="/reporte"
						element={<Reporte></Reporte>}
					></Route>

					<Route
						path="/revision/compartir/:id"
						element={<Reporte></Reporte>}
					></Route>

					<Route path="*" element={<NotFound></NotFound>}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
