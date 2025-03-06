import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { User, Mail, Phone, Save, LogOut, Pencil, FileText, Camera, House } from "lucide-react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import * as Avatar from "@radix-ui/react-avatar";
import { updateUsuario, updateMecanico } from "../../actions/yo-me-encargo";
import { getMecanico } from "../../actions/yo-me-encargo";


const usuarioString = localStorage.getItem("usuario");
const usuario = JSON.parse(usuarioString);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


const ProfileMecanico = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [errors, setErrors] = useState({});
    const [datosMecanico, setDatosMecanico] = useState(null);
    const [formData, setFormData] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        correo: usuario?.correo || "",
        celular: usuario?.celular
            ? usuario.celular.startsWith("+56")
                ? usuario.celular
                : `+56${usuario.celular}`
            : "",
        certificado: usuario?.certificado || "",
        avatarUrl: usuario?.avatarUrl || "",
        availability: {
            startDay: usuario?.availability?.startDay || '',
            endDay: usuario?.availability?.endDay || '',
            startTime: usuario?.availability?.startTime || '',
            endTime: usuario?.availability?.endTime || ''
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerDatosMecanico = async () => {
            try {
                const data = await getMecanico(usuario.id);
                setDatosMecanico(data);
                if (data) {
                    setFormData((prevData) => ({
                        ...prevData,
                        certificado: data.certificado || prevData.certificado,
                    }));
                }
            } catch (error) {
                console.error("Error al obtener datos del mecánico:", error);
            }
        };

        obtenerDatosMecanico();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        navigate("/");

        const event = new Event("storage");
        window.dispatchEvent(event);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const horario = `${formData.availability.startDay} a ${formData.availability.endDay} ${formData.availability.startTime} - ${formData.availability.endTime}`;
    
    const handleDayChange = async () => {
        try {
            const id = datosMecanico.id;
            const formUpdate = new FormData();
            formUpdate.append("horario", horario);

            await updateMecanico(id, formUpdate);

            setIsChanging(false);
            alert("Disponibilidad actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar disponibilidad:", error);
            alert("Error al actualizar disponibilidad");
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validar que el número de teléfono tenga exactamente 12 caracteres
        if (formData.celular.length !== 12) {
            newErrors.phone =
                "El número debe tener exactamente 12 caracteres (incluyendo el prefijo +56).";
        }

        // Si hay errores, establecerlos y detener el envío
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Si no hay errores, proceder con la actualización
        try {
            const result = await updateUsuario({
                id: usuario.id,
                ...formData,
            });
            localStorage.setItem("usuario", JSON.stringify(result));
            setIsEditing(false);
            alert("Datos personales actualizados correctamente");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario");
        }
    };


    return (
        <div className="bg-offCyan min-h-screen">
            <NavBar />
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16 mb-16">
                <div className="items-start justify-between py-4 border-b md:flex">
                    <div>
                        <h3 className="text-myColor text-2xl font-bold">
                            Perfil del Mecánico
                        </h3>
                    </div>

                    <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-center text-red-500 rounded-md border hover:text-white hover:bg-red-500 border-myColor hover:border-transparent duration-150"
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
                <main className="container mx-auto py-8 px-4">
                    <div className="shadow rounded-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center relative">
                                <button
                                    onClick={() => setIsChanging(!isChanging)}
                                    className={`absolute top-0 right-0${isChanging
                                        ? "bg-red-500 hover:bg-red-700 text-myHover"
                                        : "bg-white hover:bg-myColor"
                                        } flex items-center gap-2 p-2 text-center text-myColor border rounded-full hover:text-white border-myColor hover:border-transparent duration-150`}
                                >
                                    <Pencil className="w-5 h-5" />
                                    {isChanging ? "Cancelar" : ""}
                                </button>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`absolute top-0 right-0 ml-32${isEditing
                                        ? "bg-red-500 hover:bg-red-700 text-myHover"
                                        : "bg-white hover:bg-myColor"
                                        } flex items-center gap-2 p-2 text-center text-myColor border rounded-full hover:text-white border-myColor hover:border-transparent duration-150`}
                                >
                                    <Pencil className="w-5 h-5" />
                                    {isEditing ? "Cancelar" : ""}
                                </button>
                                <div className="md:w-3/4 flex flex-col items-center gap-4">
                                    <div className="relative flex w-32 h-32 items-center justify-center">
                                        <Avatar.Root className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-offCyan ring-offset-2 ring-myGray ring-2">
                                            <Avatar.Image
                                                src={
                                                    datosMecanico?.url_foto
                                                        ? `${API_URL}/files/fotos/${datosMecanico.url_foto}`
                                                        : ""
                                                }
                                                alt={`${formData.nombre} ${formData.apellido}`}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                            <Avatar.Fallback className="text-4xl text-myColor font-semibold">
                                                {formData.nombre?.charAt(0)}
                                                {formData.apellido?.charAt(0)}
                                            </Avatar.Fallback>
                                        </Avatar.Root>

                                    </div>
                                    <div className="flex flex-col items-center text-myColor">
                                        <h2 className="text-2xl font-semibold">
                                            {formData.nombre} {formData.apellido}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <label className="block text-myColor font-semibold mb-2">
                                            Horario de Disponibilidad
                                        </label>
                                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                            <div className="flex flex-col items-start">
                                                <label className="block text-myColor font-semibold mb-2">
                                                    Desde el
                                                </label>
                                                <select
                                                    value={formData.availability.startDay}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            availability: {
                                                                ...formData.availability,
                                                                startDay: e.target.value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full md:w-40 cursor-pointer p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
                                                    disabled={!isChanging}
                                                >
                                                    <option value="" disabled>
                                                        Elegir día
                                                    </option>
                                                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, index) => (
                                                        <option key={index} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <label className="block text-myColor font-semibold mb-2">
                                                    hasta el
                                                </label>
                                                <select
                                                    value={formData.availability.endDay}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            availability: {
                                                                ...formData.availability,
                                                                endDay: e.target.value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full md:w-40 cursor-pointer p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
                                                    disabled={!isChanging}
                                                >
                                                    <option value="" disabled>
                                                        Elegir día
                                                    </option>
                                                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day, index) => (
                                                        <option key={index} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid gap-4">
                                            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                                <div>
                                                    <label className="block text-myColor font-semibold mt-4">
                                                        Desde las
                                                    </label>
                                                    <select
                                                        value={formData.availability.startTime}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                availability: {
                                                                    ...formData.availability,
                                                                    startTime: e.target.value,
                                                                },
                                                            })
                                                        }
                                                        className="w-full md:w-40 cursor-pointer p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
                                                        disabled={!isChanging}
                                                    >
                                                        <option value="" disabled>
                                                            Elegir hora
                                                        </option>
                                                        {Array.from({ length: 16 }, (_, i) => (
                                                            <option key={i} value={`${i + 7}:00`}>{`${i + 7}:00`}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-myColor font-semibold mt-4">
                                                        hasta las
                                                    </label>
                                                    <select
                                                        value={formData.availability.endTime}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                availability: {
                                                                    ...formData.availability,
                                                                    endTime: e.target.value,
                                                                },
                                                            })
                                                        }
                                                        className="w-full md:w-40 cursor-pointer p-2 bg-gray-50 border border-myColor rounded-md text-gray-900 focus:ring-2 focus:ring-myColor focus:border-transparent"
                                                        disabled={!isChanging}
                                                    >
                                                        <option value="" disabled>
                                                            Elegir hora
                                                        </option>
                                                        {Array.from({ length: 16 }, (_, i) => (
                                                            <option key={i} value={`${i + 7}:00`}>{`${i + 7}:00`}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {(isChanging) && (
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 bg-lime-500 hover:bg-lime-700 text-white py-2 px-4 rounded-md"
                                            onClick={handleDayChange}
                                        >
                                            <Save />
                                            Guardar
                                        </button>
                                    )}
                                </div>

                                <div className="md:w-full md:pl-8 bg-gray-100 rounded-lg p-10">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="relative mb-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="nombre"
                                                    className="text-myColor font-semibold mb-2 ml-8"
                                                >
                                                    Nombre
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <User className="text-myColor" />
                                                    <input
                                                        id="nombre"
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className="p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="apellido"
                                                    className="text-myColor font-semibold mb-2 ml-8"
                                                >
                                                    Apellido
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <User className="text-[#43a6e8]" />
                                                    <input
                                                        id="apellido"
                                                        type="text"
                                                        name="apellido"
                                                        value={
                                                            formData.apellido
                                                        }
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className="p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="correo"
                                                    className="text-myColor font-semibold mb-2 ml-8"
                                                >
                                                    Correo
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="text-myColor" />
                                                    <input
                                                        id="correo"
                                                        type="email"
                                                        name="correo"
                                                        value={formData.correo}
                                                        onChange={handleChange}
                                                        disabled
                                                        className="p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="celular"
                                                    className="text-gray-600 mb-2"
                                                >
                                                    Celular
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="text-[#43a6e8]" />
                                                    <input
                                                        id="celular"
                                                        type="tel"
                                                        name="celular"
                                                        value={formData.celular}
                                                        onChange={(e) => {
                                                            let value =
                                                                e.target.value;

                                                            // Eliminar caracteres no numéricos, excepto el prefijo "+56"
                                                            if (
                                                                !value.startsWith(
                                                                    "+56"
                                                                )
                                                            ) {
                                                                value =
                                                                    "+56" +
                                                                    value.replace(
                                                                        /\D/g,
                                                                        ""
                                                                    );
                                                            } else {
                                                                value =
                                                                    "+56" +
                                                                    value
                                                                        .slice(
                                                                            3
                                                                        )
                                                                        .replace(
                                                                            /\D/g,
                                                                            ""
                                                                        );
                                                            }

                                                            // Limitar a 12 caracteres en total
                                                            if (
                                                                value.length >
                                                                12
                                                            )
                                                                return;

                                                            setFormData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    celular:
                                                                        value,
                                                                })
                                                            );

                                                            // Limpiar errores al modificar el campo
                                                            setErrors(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    phone: undefined,
                                                                })
                                                            );
                                                        }}
                                                        disabled={!isEditing}
                                                        className="p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor"
                                                    />
                                                </div>
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-2">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <label
                                                    htmlFor="certificado"
                                                    className="text-myColor font-semibold mb-2 ml-8"
                                                >
                                                    Certificado de
                                                    Profesionalidad
                                                </label>
                                                <div className="flex items-center space-x-2">
                                                    <FileText className="text-myColor" />
                                                    {!isEditing &&
                                                        !isChanging && (
                                                            <a
                                                                href={
                                                                    datosMecanico?.url_foto
                                                                        ? `${API_URL}/files/certificados/${datosMecanico.certificado}`
                                                                        : "#"
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-2 rounded w-full text-myGray text-center focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor bg-gray-50 hover:bg-myColor hover:text-white transition-colors"
                                                            >
                                                                Ir al
                                                                certificado
                                                            </a>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        {(isEditing) && (
                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="flex items-center gap-2 bg-lime-500 hover:bg-lime-700 text-white py-2 px-4 rounded-md"
                                                >
                                                    <Save />
                                                    Guardar cambios
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-myColor hover:bg-myGray text-white py-2 px-4 rounded-md"
                        >
                            <House />
                            Ir al Home
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileMecanico;
