import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./components/layout";
import NavBar from "./components/navbar";
import Footer from './components/footer';

import UsuariosPage from './pages/llamarlista';
import Inicio from './pages/inicio';
import Perfil from './pages/perfil';
import Ayuda from './pages/ayuda';
import Buscarmecanico from './pages/buscarmecanico';

function App() {
  
  return (
    <>
      <div className="bg-primary min h-screen">
        <NavBar></NavBar>
        <Layout>
          <Routes>
            <Route path='/' element = {<UsuariosPage></UsuariosPage>} ></Route>
            {/* <Route path='/' element = {<Inicio></Inicio>} ></Route> */}
            {/* <Route path='/perfil' element = {<Perfil></Perfil>} ></Route> 
            <Route path='/ayuda' element = {<Ayuda></Ayuda>} ></Route>
            <Route path='/buscarmecanico' element = {<Buscarmecanico></Buscarmecanico>} ></Route>
            <Route path='*' element ={<Navigate to ="/" ></Navigate>} ></Route> */}
          </Routes>
        </Layout>
        <Footer/>
      </div>
      </>
  );
}



export default App;
