import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bloques from "./components/bloques";
import Button from "./components/button";
import Layout from "./components/layout";
import NavBar from "./components/navbar";
import BuscarMecanico from "./components/buscarmecanico"; // Importa el nuevo componente

function App() {
  return (
    <Router>
      <div className="bg-primary min h-screen">
        <NavBar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/buscar-mecanico" element={<BuscarMecanico />} />
          </Routes>
        </Layout>
        <Bloques />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aliquam eum sint expedita ratione aspernatur ipsum fugit cumque voluptates magni nulla incidunt? Commodi veritatis minus laborum, perferendis sit cum ipsum.</p>
  );
}

export default App;
