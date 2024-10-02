import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Star, Settings, LogOut } from 'lucide-react'


const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    //Evento del botón "Guardar Cambios"
    setIsEditing(false)
    // Add logic to save profile changes
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-purple-600 h-32 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">Perfil de Usuario</h1>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="Profile picture"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Juan Pérez</h2>
                <p className="text-gray-600 mb-4">Mecánico Automotriz</p>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 w-5 h-5" fill="currentColor" />
                  ))}
                  <span className="ml-2 text-gray-600">(4.8)</span>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
                </button>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2">
                      <User className="text-gray-400" />
                      <input
                        type="text"
                        defaultValue="Juan Pérez"
                        disabled={!isEditing}
                        className="bg-gray-100 p-2 rounded w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="text-gray-400" />
                      <input
                        type="email"
                        defaultValue="juan.perez@example.com"
                        disabled={!isEditing}
                        className="bg-gray-100 p-2 rounded w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="text-gray-400" />
                      <input
                        type="tel"
                        defaultValue="+34 123 456 789"
                        disabled={!isEditing}
                        className="bg-gray-100 p-2 rounded w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-gray-400" />
                      <input
                        type="text"
                        defaultValue="Madrid, España"
                        disabled={!isEditing}
                        className="bg-gray-100 p-2 rounded w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sobre mí
                    </label>
                    <textarea
                      defaultValue="Mecánico automotriz con más de 10 años de experiencia. Especializado en vehículos europeos y japoneses."
                      disabled={!isEditing}
                      className="bg-gray-100 w-full h-32 p-2 rounded"
                    />
                  </div>
                  {isEditing && (
                    <button
                      type="submit"
                      className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Guardar Cambios
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Revisiones completadas</span>
                <span className="font-semibold">127</span>
              </li>
              <li className="flex justify-between">
                <span>Clientes satisfechos</span>
                <span className="font-semibold">98%</span>
              </li>
              <li className="flex justify-between">
                <span>Tiempo promedio por revisión</span>
                <span className="font-semibold">45 minutos</span>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Acciones rápidas</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-start p-2 border rounded hover:bg-gray-100">
                <Settings className="mr-2 h-4 w-4" /> Configuración de la cuenta
              </button>
              <button className="w-full flex items-center justify-start p-2 border rounded hover:bg-gray-100">
                <Star className="mr-2 h-4 w-4" /> Ver reseñas
              </button>
              <button className="w-full flex items-center justify-start p-2 border rounded text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Perfil