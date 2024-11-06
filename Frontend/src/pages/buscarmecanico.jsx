import React, { useState } from 'react'
import { X } from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const BuscarMecánico = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    make: '',
    model: '',
    licensePlate: '',
    year: ''
  })

  const navigate = useNavigate();

  const ListaMechClick = () => {
    navigate('/listamech');  // Redirige a la página del nuevo componente
  };

  const handleBack = () => {
    navigate(-1);  // Navega hacia la página anterior
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Formateo para la patente en el formato XX-XX-XX
    if (name === 'licensePlate') {
      const rawValue = value.replace(/-/g, '').slice(0, 6).toUpperCase(); // Elimina los guiones, limita a 6 caracteres y convierte a mayúsculas
      const formattedValue = rawValue.replace(/(\w{2})(\w{2})?(\w{2})?/, (match, p1, p2, p3) => {
        return [p1, p2, p3].filter(Boolean).join('-'); // Añade guiones después de cada dos caracteres
      });
      
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));

    } else if (name === 'year') {
      // Limitar el año a 4 caracteres
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.slice(0, 4),  
      }));

    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault()  //Evita que la página se recargue (los formularios de forma predeterminada hacen eso) al presionar botones como 'ingresar' por ejemplo.
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-purple-600">Ingresa los datos de tu vehículo</h2>
          <button 
            onClick={handleBack} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-full p-1"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación del vehículo
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ingrese la dirección para realizar la revisión"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-400 placeholder-gray-400 focus:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Marca del vehículo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-400 placeholder-gray-400 focus:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Modelo
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Modelo del vehículo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-400 placeholder-gray-400 focus:text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
              Patente (Opcional)
            </label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="XX-XX-XX"
              maxLength="8"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-400 placeholder-gray-400 focus:text-black"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Año del vehículo"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-400 placeholder-gray-400 focus:text-black"
              required
            />
          </div>
          <div className="flex flex-col space-y-2 pt-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              onClick={ListaMechClick}
            >
              Ingresar
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full bg-white text-purple-600 py-2 px-4 rounded-full border border-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuscarMecánico