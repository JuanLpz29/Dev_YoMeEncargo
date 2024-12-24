import { useState } from 'react'
import { Star, Calendar, Clock } from 'lucide-react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import Modal from '../components/modal'

import * as Avatar from "@radix-ui/react-avatar";

const ListaMech = () => {

  const [selectedDate, setSelectedDate] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  const [showMechanic, setShowMechanic] = useState(false);

  const mechanics = [
    {
      id: 1,
      name: 'Juan Mecánico',
      rating: 5,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4.5,
      schedule: 'Horario entre 10.00 y 19.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 3,
      name: 'Alex Brown',
      rating: 4.7,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 4,
      name: 'John Doe',
      rating: 4.8,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 5,
      name: 'Jane Smith',
      rating: 4.5,
      schedule: 'Horario entre 8.00 y 15.00',
      image: 'src/assets/images/mechanic.png'
    },
    {
      id: 6,
      name: 'Alex Brown',
      rating: 4.7,
      schedule: 'Horario entre 8.00 y 18.00',
      image: 'src/assets/images/mechanic.png'
    }
  ]

  const handleDateClick = () => {
    const dateInput = document.getElementById('date-picker')
    if (dateInput) {
      dateInput.showPicker()
    }
  }

  const handleFilterClick = () => {
    setShowMechanic(true);
  };


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }


  const openModal = (mechanic) => {
    setSelectedMechanic(mechanic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMechanic(null);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 min-h-screen bg-offCyan">
        <h1 className="text-3xl font-bold text-center text-myColor mb-8">
          Mecánicos Disponibles
        </h1>
        <h3 className="text-small text-center opacity-90 text-myGray mb-4">
          Elige la fecha en la que deseas inspeccionar tu vehículo:
        </h3>

        {/* Selection Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          {/* Date Picker */}
          <div
            className="relative w-full md:w-auto pl-10 pr-4 py-2 border border-myColor rounded-md focus-within:ring-2 focus-within:ring-myColor focus-within:border-transparent cursor-pointer hover:border-myColor bg-white"
            onClick={handleDateClick}
          >
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-myGray" size={20} />
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="pointer-events-none text-myGray">
              {selectedDate ? formatDate(selectedDate) : 'Elegir Fecha'}
            </span>
          </div>
          <button
            className={`w-full md:w-auto px-4 py-2 bg-myColor 
            text-white font-semibold rounded-md hover:bg-myGray 
            focus:outline-none focus:ring-2 focus:ring-myColor 
            focus:ring-opacity-50 transition-colors ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleFilterClick}
            disabled={!selectedDate}
          >
            Filtrar
          </button>
        </div>

        {/* Mechanics Grid */}
        {showMechanic && ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mechanics.map((mechanic) => (
            <div
              key={mechanic.id}
              className="bg-myGray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-center p-4">
                {/* Avatar */}
                <Avatar.Root className="flex items-center space-x-3">
                  <Avatar.Image
                    src={mechanic.image}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <Avatar.Fallback
                    delayMs={600}
                    className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-sm"
                  >
                    {mechanic.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar.Root>

                <div className="flex-1 ml-4">
                  {/* Name */}
                  <h2 className="text-xl font-semibold mb-2 text-myColor">
                    {mechanic.name}
                  </h2>
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${index < Math.floor(mechanic.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-white">
                      {mechanic.rating}/5
                    </span>
                  </div>
                  {/* Schedule */}
                  <p className="text-primary text-sm mb-4">
                    {mechanic.schedule}
                  </p>
                  {/* Button */}
                  <button
                    className="text-myColor hover:text-offCyan font-semibold text-sm 
                                  focus:outline-none focus:ring-2 focus:ring-myColor
                                  focus:ring-opacity-50 rounded-md px-4 py-2 
                                  border border-myColor hover:bg-myGray"
                    onClick={() => openModal(mechanic)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} mechanic={selectedMechanic} selectedDate={selectedDate} pdfUrl="src/assets/docs/ejemplo.pdf" />
    </>
  )
}

export default ListaMech