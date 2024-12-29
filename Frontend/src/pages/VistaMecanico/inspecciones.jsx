import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { Calendar} from 'lucide-react'
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import Modal from '../../components/Modal';
import * as Avatar from "@radix-ui/react-avatar";

const Inspecciones = () => {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);

    // Obtener el ID del mecánico del localStorage
    const getMecanicoId = () => {
        const usuarioString = localStorage.getItem("usuario");
        try {
            const usuario = JSON.parse(usuarioString);
            console.log("Usuario encontrado:", usuario);
            return usuario?.id;
        } catch (e) {
            console.error("Error obteniendo ID del mecánico:", e);
            return null;
        }
    };

    // Cargar las solicitudes aprobadas del mecánico
    useEffect(() => {
        const fetchSolicitudes = async () => {
            const mecanicoId = getMecanicoId();
            console.log("ID del mecánico:", mecanicoId);

            if (!mecanicoId) {
                console.log("No se encontró ID del mecánico");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/solicitudes/mecanico/${mecanicoId}`);
                const data = await response.json();
                console.log("Solicitudes recibidas:", data);
                
                setSolicitudes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar solicitudes:', error);
                setLoading(false);
            }
        };

        fetchSolicitudes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString.substring(0, 5); // Formato HH:mm
    };

    const openModal = (solicitud) => {
        setSelectedSolicitud(solicitud);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSolicitud(null);
    };

    return (
        <>
            <NavBar />

            <div className="container mx-auto px-4 py-8 min-h-screen bg-offCyan">
                <div className="flex justify-center">
                    <button 
                        onClick={() => navigate('/reporte')}
                        className=" bg-myColor text-myGray hover:bg-myGray hover:text-white px-4 py-2 rounded-md mb-4"
                    >
                        Reporte
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-center text-myColor mb-8">
                    Inspecciones Programadas
                </h1>

                {loading ? (
                    <div className="text-center">
                        <p>Cargando solicitudes...</p>
                    </div>
                ) : solicitudes.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl text-gray-600">No hay inspecciones programadas.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solicitudes.map((solicitud) => (
                            <div
                                key={solicitud.id}
                                className="bg-myGray rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col p-4">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <Avatar.Root>
                                            <Avatar.Image
                                                src={solicitud.cliente?.imagen || '/default-avatar.png'}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <Avatar.Fallback className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                {solicitud.cliente?.nombre?.[0] || '?'}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                        
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-white mb-1">
                                                {solicitud.cliente?.nombre} {solicitud.cliente?.apellido}
                                            </h2>
                                            <p className="text-primary text-sm">
                                                {solicitud.vehiculo?.marca} {solicitud.vehiculo?.modelo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-white">
                                        <p className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Fecha: {formatDate(solicitud.fecha)}
                                        </p>
                                        <p className="flex items-center">
                                            <span className="material-icons mr-2">schedule</span>
                                            Hora: {formatTime(solicitud.hora)}
                                        </p>
                                        <p className="flex items-center">
                                            <span className="material-icons mr-2">location_on</span>
                                            {solicitud.direccion}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => openModal(solicitud)}
                                        className="mt-4 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Cancelar Inspección
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                solicitud={selectedSolicitud}
                tipo="cancelacion"
            />
        </>
    );
};

export default Inspecciones;