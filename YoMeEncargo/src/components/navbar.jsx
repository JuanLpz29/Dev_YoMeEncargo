import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const btnLink = 'block inline-blog py-1 text-white hover:text-accent cursor-pointer mr-4';

  const BuscarMecanicoClick = () => {
    navigate('/buscar-mecanico');  // Redirige a la página del nuevo componente
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-semibold text-white">Yo Me Encargo</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className={btnLink}>Inicio</a>
          <a className={btnLink}>Perfil</a>
          <a className={btnLink}>Ayuda</a>
        </nav>
        <button className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0" onClick={BuscarMecanicoClick}>
          Buscar Mecánico
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
