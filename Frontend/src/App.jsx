import { Navigate, Route, Routes } from 'react-router-dom';


import NavBar from "./components/navbar";
import Footer from './components/footer';


import Inicio from './pages/inicio';
import Perfil from './pages/perfil';
import Ayuda from './pages/ayuda';
import Buscarmecanico from './pages/buscarmecanico';



function App() {
  
  return (
    <>
      <div className="bg-primary min h-screen">
        <NavBar></NavBar>
          <Routes>
            <Route path='/' element = {<Inicio></Inicio>} ></Route>
            <Route path='/perfil' element = {<Perfil></Perfil>} ></Route> 
            <Route path='/ayuda' element = {<Ayuda></Ayuda>} ></Route>
            <Route path='/buscarmecanico' element = {<Buscarmecanico></Buscarmecanico>}></Route>
            <Route path='*' element ={<Navigate to ="/" ></Navigate>} ></Route>
          </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}



export default App;
