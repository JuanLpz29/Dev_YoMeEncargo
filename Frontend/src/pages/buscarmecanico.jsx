import React, { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

const Buscarmecanico = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    make: '',
    model: '',
    licensePlate: '',
    year: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-purple-600">Ingresa los datos de tu vehículo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <div className="relative">
                <select
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Marca del vehículo</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="ford">Ford</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                Modelo
              </label>
              <div className="relative">
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Modelo del vehículo</option>
                  <option value="corolla">Corolla</option>
                  <option value="civic">Civic</option>
                  <option value="focus">Focus</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <div className="relative">
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Año</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 pt-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Ingresar
            </button>
            <button
              type="button"
              onClick={onClose}
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

export default Buscarmecanico