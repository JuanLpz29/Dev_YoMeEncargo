import { Navigate, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar";
import Footer from "./components/footer";

import Inicio from "./pages/inicio";
import Perfil from "./pages/perfil";
import Ayuda from "./pages/ayuda";
import Buscarmecanico from "./pages/buscarmecanico";
import ListaMech from "./pages/listamech";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/registerpage";

function App() {
	return (
		<>
			<div className="bg-primary min h-screen">
				<NavBar
					userType="mecanico"
					userName="Juan Pérez"
					userPhoto="/src/assets/images/foto1.jpg"
					isLogged={true}
				></NavBar>
				<Routes>
					<Route path="/" element={<Inicio></Inicio>}></Route>
					<Route
						path="/loginpage"
						element={<LoginPage></LoginPage>}
					></Route>
					<Route
						path="/registerpage"
						element={<RegisterPage></RegisterPage>}
					></Route>
					<Route path="/perfil" element={<Perfil></Perfil>}></Route>
					<Route path="/ayuda" element={<Ayuda></Ayuda>}></Route>
					<Route
						path="/buscarmecanico"
						element={<Buscarmecanico></Buscarmecanico>}
					></Route>
					<Route
						path="/listamech"
						element={<ListaMech></ListaMech>}
					></Route>
					<Route
						path="*"
						element={<Navigate to="/"></Navigate>}
					></Route>
				</Routes>
				<Footer></Footer>
			</div>
		</>
	);
}

export default App;
