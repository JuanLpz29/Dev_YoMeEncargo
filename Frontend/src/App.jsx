import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home";

import Perfil from "./pages/perfil";
import Ayuda from "./pages/ayuda";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import ListaMech from "./pages/listamech";
//import Mecanicos from "./pages/mecanicos";

import ReservationModal from "./pages/reservationmodal";
import VehicleForm from "./pages/VehicleForm";

import HandlerPayment from "./components/handlerpayment";

import NotFound from "./pages/NotFound";

function App() {
	return (
		<>
			<div className="bg-offCyan min h-screen">
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
						path="/listamech"
						element={<ListaMech></ListaMech>}
					></Route>

					{/* <Route
						path="/mecanicos"
						element={<Mecanicos></Mecanicos>}
					></Route> */}

					<Route
						path="/reservationmodal"
						element={<ReservationModal></ReservationModal>}		
					></Route>

					<Route
						path="/VehicleForm"
						element={<VehicleForm></VehicleForm>}
					></Route>

					<Route
						path="/handlerpayment"
						element={<HandlerPayment></HandlerPayment>}
					></Route>

					<Route 
						path="/perfil" 
						element={<Perfil></Perfil>}
					></Route>

					<Route
						path="/ayuda"
						element={<Ayuda></Ayuda>}
					></Route>

					<Route path="*" element={<NotFound></NotFound>}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
