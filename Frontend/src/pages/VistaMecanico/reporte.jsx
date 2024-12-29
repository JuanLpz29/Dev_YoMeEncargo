import React, { useState, useEffect } from 'react';
import { Save, Calendar, Gauge, Route, Share, Download } from 'lucide-react';
import { GiCarDoor, GiCarWheel, GiCarSeat } from "react-icons/gi";
import { MdCarCrash } from "react-icons/md";
import { RiOilFill, RiUser3Fill } from "react-icons/ri";
import { RxIdCard } from "react-icons/rx";
import { PiEngineBold } from "react-icons/pi";
import { IoColorFill } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import { revisionService } from '../../services/revisionService';
import DownloadLink from './ReportePDF';

import NavBar from '../../components/navbar'
import Footer from '../../components/footer'

const InspeccionForm = () => {
    const [vehicleData, setVehicleData] = useState({
        fechaInspeccion: '',
        nombreMecanico: '',

        // ITEM 1
        marca: '',
        modelo: '',
        año: '',
        combustible: '',
        transmision: '',
        traccion: '',


        // ITEM 2
        kilometraje: '',
        cilindrada: '',
        color: '',
        tapiceria: '',
        numPuertas: '',
        vin: '',

        // ITEM 2.5
        soap: { fecha: '', vigencia: '' },
        permisoCirculacion: { fecha: '', vigencia: '' },
        revisionTecnica: { fecha: '', vigencia: '' },
        emisionContaminantes: { fecha: '', vigencia: '' },

        // ITEM 3
        estadoAceite: {
            estado: '',
            observaciones: ''
        },
        estadoFrenos: {
            estado: '',
            observaciones: ''
        },
        pruebaRuta: {
            realizada: false,
            observaciones: ''
        },
        estadoNeumaticos: {
            estado: '',
            observaciones: ''
        },
        id_mecanico: null,
        id_reserva: null
    });

    const [isSharedView, setIsSharedView] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [savedRevisionId, setSavedRevisionId] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    console.log('API URL:', API_URL);

    useEffect(() => {
        console.log('Variables de entorno:', {
            VITE_API_URL: import.meta.env.VITE_API_URL,
            MODE: import.meta.env.MODE,
        });
    }, []);

    useEffect(() => {
        if (id) {
            setIsSharedView(true);
            cargarRevisionCompartida(id);
        }
    }, [id]);

    useEffect(() => {
        const setInitialData = () => {
            setVehicleData(prev => ({
                ...prev,
                id_mecanico: 1, // TODO: Obtener ID del mecánico actual
                id_reserva: 1 // TODO: Obtener ID de la reserva actual
            }));
        };

        setInitialData();
    }, []);

    const cargarRevisionCompartida = async (revisionId) => {
        try {
            setLoading(true);
            const data = await revisionService.getRevisionCompartida(revisionId);

            // Asegurarse que los datos se parseen correctamente
            const revisionData = typeof data.reporte === 'string'
                ? JSON.parse(JSON.parse(data.reporte))
                : data.reporte;

            // Combinar los datos existentes con los nuevos
            setVehicleData(prevData => ({
                ...prevData,
                ...revisionData,
                comentarios: data.comentario || '', // Asegurarse que los comentarios se carguen
            }));
        } catch (error) {
            console.error('Error al cargar la revisión:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShareReport = async () => {
        try {
            if (!savedRevisionId) {
                alert('Primero debe guardar la revisión antes de compartirla');
                return;
            }

            const shareableURL = `${window.location.origin}/revision/compartir/${savedRevisionId}`;
            await navigator.clipboard.writeText(shareableURL);
            alert('¡URL copiada al portapapeles!');
        } catch (error) {
            alert('Error al generar el enlace compartible');
        }
    };

    const handleInputChange = (e) => {
        if (isSharedView) return; // No permitir cambios si es vista compartida

        const { name, value } = e.target;
        setVehicleData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDocumentChange = (docType, field, value) => {
        if (isSharedView) return; // No permitir cambios si es vista compartida

        setVehicleData(prev => ({
            ...prev,
            [docType]: {
                ...prev[docType],
                [field]: value
            }
        }));
    };

    const handleTechnicalChange = (field, subfield, value) => {
        if (isSharedView) return; // No permitir cambios si es vista compartida

        setVehicleData(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subfield]: value
            }
        }));
    };

    const handleSaveInspection = async () => {
        try {
            if (!vehicleData.comentarios?.trim()) {
                alert('Por favor ingrese comentarios antes de guardar la inspección');
                return;
            }

            const dataToSave = {
                id_mecanico: 1,
                id_reserva: 2,
                reporte: JSON.stringify(JSON.stringify(vehicleData)),
                comentario: vehicleData.comentarios,
            };
            console.log("dataToSave >>>", dataToSave);
            console.log("JSON.stringify(dataToSave) >>>", JSON.stringify(dataToSave));

            const response = await fetch(`${API_URL}/api/revisiones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la revisión');
            }

            const { id } = await response.json();
            setSavedRevisionId(id);
            alert('Revisión guardada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar la revisión: ' + error.message);
        }
    };

    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    return (
        <div className="bg-myColor">
            <NavBar />
            {/* Contenedor del reporte entero */}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-myColor mb-6 flex flex-col items-center">Reporte de Inspección</h2>

                <form className="space-y-6">
                    <div className="flex space-x-4">
                        {/* Contenedor izq. Fecha de inspección */}
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-myColor flex items-center gap-2 mb-2">
                                    <Calendar className="w-5 h-5" />
                                    Fecha de inspección
                                </h3>

                                <div
                                    className="relative w-full border border-myColor cursor-pointer"
                                    onClick={() => {
                                        const dateInput = document.querySelector('input[name="fechaInspeccion"]');
                                        if (dateInput) dateInput.showPicker();
                                    }}>
                                    <input
                                        type="date"
                                        name="fechaInspeccion"
                                        value={vehicleData.fechaInspeccion}
                                        onChange={handleInputChange}
                                        className={`w-full border border-myColor rounded-md font-semibold ${!vehicleData.fechaInspeccion ? 'text-gray-400' : 'text-myGray'} focus:border-myColor focus:ring-myColor cursor-pointer px-2`}
                                        min={today}
                                    />
                                    <div className="absolute inset-0"></div>
                                </div>
                            </div>
                        </div>
                        {/*Contenedor der. Nombre mecánico */}
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-myColor flex items-center gap-2 mb-2">
                                    <RiUser3Fill className="w-5 h-5" />
                                    Nombre del mecánico
                                </h3>
                                <div className="relative w-full border border-myColor">
                                    <input
                                        type="text"
                                        name="nombreMecanico"
                                        value={vehicleData.nombreMecanico}
                                        onChange={handleInputChange}
                                        disabled={isSharedView}
                                        className={`w-full border font-semibold border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2 ${isSharedView ? 'bg-gray-100 cursor-not-allowed' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Segunda sección: Información básica del vehículo */}
                    <div className="flex space-x-4 text-myColor font-semibold">
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg">
                                Marca
                                <input type="text" name="marca" value={vehicleData.marca} onChange={handleInputChange} className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                Modelo
                                <input type="text" name="modelo" value={vehicleData.modelo} onChange={handleInputChange} className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                Año
                                <select
                                    name="año"
                                    value={vehicleData.año}
                                    onChange={handleInputChange}
                                    className={`w-full border border-myColor rounded-md ${!vehicleData.año ? 'text-gray-400' : 'text-myGray'} focus:border-myColor focus:ring-myColor px-2 cursor-pointer`}
                                >
                                    <option value="" disabled selected className="text-gray-400">Seleccione un año</option>
                                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i).map(year => (
                                        <option key={year} value={year} className="text-myGray">{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg">
                                Combustible
                                <input type="text" name="tipoCombustible" value={vehicleData.tipoCombustible} onChange={handleInputChange} className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />
                                Transmisión
                                <input type="text" name="transmision" value={vehicleData.transmision} onChange={handleInputChange} className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />
                                Tracción
                                <input type="text" name="traccion" value={vehicleData.traccion} onChange={handleInputChange} className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />
                            </div>
                        </div>
                    </div>


                    {/* Tercera sección: Información básica del vehículo LADO IZQUIERDO */}
                    <div className="flex space-x-4 text-myColor font-semibold">
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg mb-4">
                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2">
                                    <Gauge className="w-5 h-5" />
                                    Kilometraje
                                </h3>
                                <input
                                    type="number"
                                    name="kilometraje"
                                    value={vehicleData.kilometraje}
                                    onChange={handleInputChange}
                                    placeholder="Ej: 66774"
                                    onInput={(e) => {
                                        if (e.target.value.length > 6) {
                                            e.target.value = e.target.value.slice(0, 6);
                                        }
                                    }}
                                    className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
                                    <PiEngineBold className="w-5 h-5" />
                                    Cilindrada del motor
                                </h3>
                                <input
                                    type="text"
                                    name="cilindrada"
                                    value={vehicleData.cilindrada}
                                    onChange={handleInputChange}
                                    placeholder="Ejemplo: 1.6"
                                    className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
                                    <IoColorFill className="w-5 h-5" />
                                    Color del vehículo
                                </h3>
                                <input
                                    type="text"
                                    name="color"
                                    value={vehicleData.color}
                                    onChange={handleInputChange}
                                    placeholder="Gris, Blanco, etc."
                                    className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
                                    <GiCarSeat className="w-5 h-5" />
                                    Tapicería
                                </h3>
                                <input
                                    type="text"
                                    name="tapiceria"
                                    value={vehicleData.tapiceria}
                                    onChange={handleInputChange}
                                    placeholder="Cuero, Tela, etc."
                                    className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />

                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
                                    <GiCarDoor className="w-5 h-5" />
                                    N° de puertas
                                </h3>
                                <select
                                    name="numPuertas"
                                    value={vehicleData.numPuertas}
                                    onChange={handleInputChange}
                                    placeholder="Elegir"
                                    className={`w-full border border-myColor rounded-md text-gray-400 focus:border-myColor focus:ring-myColor cursor-pointer px-2 ${!vehicleData.numPuertas ? "text-gray-400" : "text-myGray"
                                        }`}>
                                    <option value="" disabled selected>Elija una opción</option>
                                    <option value="2">2 puertas</option>
                                    <option value="3">3 puertas</option>
                                    <option value="4">4 puertas</option>
                                    <option value="5">5 puertas</option>
                                </select>

                                <h3 className="text-base font-semibold text-myColor flex items-center gap-2 mb-2 mt-2">
                                    <RxIdCard className="w-5 h-5" />
                                    VIN (chasis)
                                </h3>
                                <input
                                    type="text"
                                    name="vin"
                                    value={vehicleData.vin}
                                    onChange={(e) => {
                                        const upperCaseValue = e.target.value.toUpperCase();
                                        handleInputChange({ target: { name: e.target.name, value: upperCaseValue } });
                                    }}
                                    placeholder="Ingrese el VIN del vehículo..."
                                    className="w-full border border-myColor rounded-md text-myGray focus:border-myColor focus:ring-myColor px-2" />
                            </div>
                        </div>


                        {/* Tercera sección: Documentación con fecha y estado LADO DERECHO */}
                        <div className="w-1/2">
                            <div className="p-4 rounded-lg mb-2 text-myColor">
                                {['soap', 'permisoCirculacion', 'revisionTecnica', 'emisionContaminantes'].map((doc) => (
                                    <div key={doc} className="flex items-center gap-2 mt-4 mb-6">
                                        <div className="flex-1">
                                            <h3 className="block text-myColor mb-1">
                                                {doc.charAt(0).toUpperCase() + doc.slice(1).replace(/([A-Z])/g, ' $1')}
                                            </h3>
                                            <div className="flex gap-4">
                                                <div className="relative w-1/2 cursor-pointer"
                                                    onClick={() => {
                                                        const dateInput = document.querySelector(`input[name="${doc}"]`);
                                                        if (dateInput) dateInput.showPicker();
                                                    }}>
                                                    <input
                                                        type="date"
                                                        name={doc}
                                                        value={vehicleData[doc].fecha}
                                                        onChange={(e) => handleDocumentChange(doc, 'fecha', e.target.value)}
                                                        className={`block w-full rounded-md border border-myColor px-2 py-2 ${!vehicleData[doc].fecha ? 'text-gray-400' : 'text-myGray'} focus:border-myColor focus:ring-myColor cursor-pointer`}
                                                    />
                                                </div>
                                                <select
                                                    value={vehicleData[doc].vigencia}
                                                    onChange={(e) => handleDocumentChange(doc, 'vigencia', e.target.value)}
                                                    className={`block w-1/2 rounded-md border border-myColor px-2 py-2 ${!vehicleData[doc].vigencia ? 'text-gray-400' : 'text-myGray'} focus:border-myColor focus:ring-myColor cursor-pointer`}
                                                >
                                                    <option value="" disabled selected>Elija una opción</option>
                                                    <option value="Vigente">Vigente</option>
                                                    <option value="No vigente">No vigente</option>
                                                    <option value="No homologado">No homologado</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Cuarta sección: Información básica del vehículo LADO IZQUIERDO */}
                    <div className="flex space-x-4 text-myColor font-semibold">
                        <div className="w-1/2">

                            {/* Estado del Aceite */}
                            <div className="bg-offCyan p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <RiOilFill className="w-5 h-5 text-myColor" />
                                    <label className="block text-sm font-medium text-gray-700">Estado del Aceite</label>
                                </div>
                                <div className="space-y-2">
                                    <select
                                        value={vehicleData.estadoAceite.estado}
                                        onChange={(e) => handleTechnicalChange('estadoAceite', 'estado', e.target.value)}
                                        className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 ${!vehicleData.estadoAceite.estado ? 'text-gray-400' : 'text-myGray'}`}
                                    >
                                        <option value="" disabled selected className="text-gray-400">Elija una opción</option>
                                        <option value="Nuevo" className="text-myGray">Nuevo</option>
                                        <option value="Bueno" className="text-myGray">Bueno</option>
                                        <option value="Regular" className="text-myGray">Regular</option>
                                        <option value="Malo" className="text-myGray">Malo</option>
                                    </select>
                                    <textarea
                                        value={vehicleData.estadoAceite.observaciones}
                                        onChange={(e) => handleTechnicalChange('estadoAceite', 'observaciones', e.target.value)}
                                        placeholder="Observaciones del aceite..."
                                        className="block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 text-sm text-myGray"
                                        rows="2"
                                    />
                                </div>
                            </div>

                            {/* Estado de los Frenos */}
                            <div className="bg-offCyan p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdCarCrash className="w-5 h-5 text-myColor" />
                                    <label className="block text-sm font-medium text-gray-700">Estado de los Frenos</label>
                                </div>
                                <div className="space-y-2">
                                    <select
                                        value={vehicleData.estadoFrenos.estado}
                                        onChange={(e) => handleTechnicalChange('estadoFrenos', 'estado', e.target.value)}
                                        className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor px-2 ${!vehicleData.estadoFrenos.estado ? 'text-gray-400' : 'text-myGray'}`}
                                    >
                                        <option value="" disabled selected className="text-gray-400">Elija una opción</option>
                                        <option value="Nuevo" className="text-myGray">Nuevo</option>
                                        <option value="Bueno" className="text-myGray">Bueno</option>
                                        <option value="Regular" className="text-myGray">Regular</option>
                                        <option value="Malo" className="text-myGray">Malo</option>
                                    </select>
                                    <textarea
                                        value={vehicleData.estadoFrenos.observaciones}
                                        onChange={(e) => handleTechnicalChange('estadoFrenos', 'observaciones', e.target.value)}
                                        placeholder="Observaciones de los frenos..."
                                        className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
                                        rows="2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Cuarta sección: Información básica del vehículo LADO DERECHO */}
                        <div className="w-1/2">
                            {/* Prueba en Ruta */}
                            <div className="bg-offCyan p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Route className="w-5 h-5 text-myColor" />
                                    <label className="block text-sm font-medium text-gray-700">Prueba en Ruta</label>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={vehicleData.pruebaRuta.realizada}
                                            onChange={(e) => handleTechnicalChange('pruebaRuta', 'realizada', e.target.checked)}
                                            className="rounded border-gray-300 text-myColor focus:ring-myColor"
                                        />
                                        <span className="text-sm text-gray-700">Prueba realizada</span>
                                    </div>
                                    <textarea
                                        value={vehicleData.pruebaRuta.observaciones}
                                        onChange={(e) => handleTechnicalChange('pruebaRuta', 'observaciones', e.target.value)}
                                        placeholder="Observaciones de la prueba en ruta..."
                                        className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
                                        rows="2"
                                    />
                                </div>
                            </div>

                            {/* Estado de los Neumáticos */}
                            <div className="bg-offCyan p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <GiCarWheel className="w-5 h-5 text-myColor" />
                                    <label className="block text-sm font-medium text-gray-700">Estado de los Neumáticos</label>
                                </div>
                                <div className="space-y-2">
                                    <select
                                        value={vehicleData.estadoFrenos.estado}
                                        onChange={(e) => handleTechnicalChange('estadoFrenos', 'estado', e.target.value)}
                                        className={`block w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor ${!vehicleData.estadoFrenos.estado ? 'text-gray-400' : 'text-myGray'}`}
                                    >
                                        <option value="" disabled selected className="text-gray-400">Elija una opción</option>
                                        <option value="Nuevo" className="text-myGray">Nuevo</option>
                                        <option value="Bueno" className="text-myGray">Bueno</option>
                                        <option value="Regular" className="text-myGray">Regular</option>
                                        <option value="Malo" className="text-myGray">Malo</option>
                                    </select>
                                    <textarea
                                        value={vehicleData.estadoNeumaticos.observaciones}
                                        onChange={(e) => handleTechnicalChange('estadoNeumaticos', 'observaciones', e.target.value)}
                                        placeholder="Observaciones de los neumáticos..."
                                        className="w-full rounded-md border-gray-300 focus:border-myColor focus:ring-myColor text-sm text-myGray px-2"
                                        rows="2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comentarios */}
                    <div className="bg-offCyan rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-myGray flex items-center gap-2 mb-4">
                            Comentarios adicionales
                        </h3>
                        <div className="flex-1">
                            <textarea
                                name="comentarios"
                                value={vehicleData.comentarios}
                                onChange={handleInputChange}
                                placeholder="Ingrese aquí sus observaciones sobre el vehículo..."
                                rows="10"
                                required
                                className="text-myGray block w-full border border-myColor rounded-md focus:border-myColor focus:ring-myColor p-3"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {/* El logo ahora siempre será visible */}
                        <img
                            src="img/logoyme-secondary.svg"
                            width={360}
                            height={75}
                            alt="YoMeEncargo logo"
                        />
                        <div className="flex gap-4">
                            {/* Botón de descargar PDF visible en todas las vistas */}
                            <button
                                className="bg-myColor text-white px-6 py-2 rounded-md hover:bg-myGray flex items-center gap-2"
                                type="button"
                            >
                                <DownloadLink vehicleData={vehicleData} />
                            </button>

                            {/* Mostrar otros botones solo si no es vista compartida */}
                            {!isSharedView && (
                                <>
                                    <button
                                        className="bg-myColor text-white px-6 py-2 rounded-md hover:bg-myGray flex items-center gap-2"
                                        type="button"
                                        onClick={handleShareReport}
                                        disabled={!savedRevisionId}
                                    >
                                        <Share className="w-5 h-5" />
                                        Compartir
                                    </button>
                                    <button
                                        className="bg-myColor text-white px-6 py-2 rounded-md hover:bg-myGray flex items-center gap-2"
                                        type="button"
                                        onClick={handleSaveInspection}
                                    >
                                        <Save className="w-5 h-5" />
                                        Guardar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </form>
            </div>
            <Footer />
        </div>
    );
};

export default InspeccionForm;
