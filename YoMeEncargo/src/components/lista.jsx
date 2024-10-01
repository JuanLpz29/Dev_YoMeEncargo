
import React, { useEffect, useState } from 'react';

const ListaUsuarios = () => {
  // Estado para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]);

  // Función para obtener los usuarios desde la API
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      const data = await response.json();
      setUsuarios(data); // Guardamos los usuarios en el estado
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  // useEffect para llamar a fetchUsuarios cuando el componente se monte
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {usuarios.length > 0 ? (
        <ul className="list-none">
          {usuarios.map(usuario => (
            <li key={usuario.id} className="p-4 border-b border-gray-300">
              <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
              <p><strong>Celular:</strong> {usuario.celular}</p>
              <p><strong>Correo:</strong> {usuario.correo}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default ListaUsuarios;

