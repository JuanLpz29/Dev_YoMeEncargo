import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import Ayuda from "./pages/ayuda";
import Mecanicos from "./pages/mecanicos";

import Inspecciones from "./pages/VistaMecanico/inspecciones";
import HeroMecanico from "./pages/VistaMecanico/HeroMecanico";
import Reporte from "./pages/VistaMecanico/reporte";
import PM from "./pages/VistaMecanico/PM";

import NotFound from "./pages/NotFound";





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
						element={<Profile></Profile>}
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

					<Route
						path="/ProfileMecanico"
						element={<PM></PM>}
					></Route>

					<Route
						path="/HeroMecanico"
						element={<HeroMecanico></HeroMecanico>}
					></Route>

					<Route path="*" element={<NotFound></NotFound>}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
