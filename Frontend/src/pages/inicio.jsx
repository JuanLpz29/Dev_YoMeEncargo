import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();

  const BuscarMecanicoClick = () => {
    navigate('/buscarmecanico');  // Redirige a la página del componente de formulario para buscar mecánico
  };
  
  
  return (
    <main className="flex flex-col items-center justify-center p-4 space-y-8 max-w-4xl mx-auto">
      <div className="w-full h-48 relative rounded-lg overflow-hidden">
      <img 
          src="/src/assets/images/top-image.jpg" 
          alt="Top image" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl mx-auto">
          ¿Necesitas saber si el vehículo que comprarás está en buen estado?
        </h1>
        <p className="text-xl md:text-2xl text-purple-600 font-semibold">Uno de nuestros mecánicos te ayudará</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"onClick={BuscarMecanicoClick}>Buscar Mecánico</button>
          <button className="border-purple-600 text-purple-600 hover:bg-purple-100 font-bold py-2 px-6 rounded">Soy Mecánico</button>
        </div>
      </div>

      <div className="w-full h-48 relative rounded-lg overflow-hidden">
      <img 
          src="/src/assets/images/bottom-image.jpg" 
          alt="Bottom image" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    </main>
  );
}

export default Inicio;
