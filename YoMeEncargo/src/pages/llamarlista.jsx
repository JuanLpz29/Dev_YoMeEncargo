import React from 'react';
import ListaUsuarios from '../components/lista';  // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

const UsuariosPage = () => {
  return (
    <div className="usuarios-page">
      <h1 className="text-3xl font-bold text-center my-6">Página de Usuarios</h1>
      <ListaUsuarios />
    </div>
  );
};

export default UsuariosPage;
