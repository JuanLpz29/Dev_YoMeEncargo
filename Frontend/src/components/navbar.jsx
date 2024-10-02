
import {NavLink } from 'react-router-dom';

const NavBar = () => {
  const btnLink = 'block inline-blog py-1 text-purple hover:text-accent cursor-pointer mr-4';
  const activeLink = 'block inline-block py-1 text-accent mr-4';

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-2">
        <img src="/placeholder.svg" alt="YoMeEncargo Logo" width={32} height={32} />
        <span className="text-xl font-bold">
          YoMe<span className="text-purple-600">Encargo</span>
        </span>
      </div>
      <nav className="hidden md:flex space-x-4">
          <NavLink to = "/" className={({isActive}) => isActive?activeLink:btnLink}>Inicio</NavLink>
          <NavLink to = "/perfil"className={({isActive}) => isActive?activeLink:btnLink}>Perfil</NavLink>
          <NavLink to = "/ayuda"className={({isActive}) => isActive?activeLink:btnLink}>Ayuda</NavLink>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-purple-600 p-1" aria-label="Notifications">
          🔔
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 px-2 py-1">
          🚪 <span>Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
}

export default NavBar;
