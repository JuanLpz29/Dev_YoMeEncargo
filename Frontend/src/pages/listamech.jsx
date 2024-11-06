import { Star, Calendar, Clock } from 'lucide-react'

const ListaMech = () => {
  const mechanics = [
    {
      id: 1,
      name: 'John Doe',
      rating: 4.8,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4.5,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 3,
      name: 'Alex Brown',
      rating: 4.7,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
        Mecánicos Disponibles
      </h1>

      {/* Selection Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="date"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Select Day"
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="time"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mechanics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics.map((mechanic) => (
          <div 
            key={mechanic.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold mb-2">{mechanic.name}</h2>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(mechanic.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {mechanic.rating}/5
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{mechanic.schedule}</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded-md px-4 py-2 border border-purple-600 hover:bg-purple-50">
                  Más Información
                </button>
              </div>
              <div className="w-full md:w-48 h-48">
                <img
                  src={mechanic.image}
                  alt={`Mechanic ${mechanic.name}`}
                  style={{ width: '80%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaMech