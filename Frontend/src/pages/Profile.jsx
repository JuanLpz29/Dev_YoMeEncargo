import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Save,
    LogOut,
    Pencil,
    Camera,
    House
} from "lucide-react";

import NavBar from "../components/navbar";
import Footer from "../components/footer";
import * as Avatar from "@radix-ui/react-avatar";
import { getUsuario, updateUsuario } from "../actions/yo-me-encargo";

const usuarioString = localStorage.getItem("usuario");
const usuario = JSON.parse(usuarioString);
const token = localStorage.getItem("token");
const loggedIn = token ? true : false;

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: usuario?.nombre || '',
        apellido: usuario?.apellido || '',
        correo: usuario?.correo || '',
        celular: usuario?.celular?.startsWith('+56') ? usuario.celular : `+56${usuario?.celular}` || '',
        avatarUrl: usuario?.avatarUrl || ''
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar la información del usuario y el token del localStorage
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        
        // Redirigir al usuario a la página de inicio
        navigate('/');
        
        // Forzar un rerender del navbar actualizando el localStorage
        const event = new Event('storage');
        window.dispatchEvent(event);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validar que el número de teléfono tenga exactamente 12 caracteres
        if (formData.celular.length !== 12) {
            newErrors.phone = "El número debe tener exactamente 12 caracteres (incluyendo el prefijo +56).";
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
                ...formData
            });
            localStorage.setItem("usuario", JSON.stringify(result));
            setIsEditing(false);
            alert("Usuario actualizado correctamente");
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
                            Perfil del Usuario
                        </h3>
                    </div>
                    <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`${isEditing
                                ? "bg-red-500 hover:bg-red-700 text-white"
                                : "bg-white hover:bg-myColor"
                                } flex items-center gap-2 px-4 py-2 text-center text-myColor border rounded-md hover:text-white border-myColor hover:border-transparent duration-150`}
                        >
                            <Pencil className="w-5 h-5" />
                            {isEditing ? "Cancelar" : "Editar Perfil"}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-center text-red-500 rounded-md border hover:text-white hover:bg-red-500 border-myColor hover:border-transparent duration-150"
                        >
                            <LogOut className="w-5 h-5" />Cerrar Sesión
                        </button>
                    </div>
                </div>
                <main className="container mx-auto py-8 px-4">
                    <div className="shadow rounded-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center">

                                <div className="md:w-1/3 flex flex-col items-center gap-4">
                                    <div className="relative flex w-32 h-32 items-center justify-center">
                                        <Avatar.Root className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-offCyan ring-offset-2 ring-myGray ring-2">
                                            <Avatar.Image
                                                src={formData.avatarUrl || 'https://url-incorrecta.com/150'}
                                                alt={`${formData.nombre} ${formData.apellido}`}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                            <Avatar.Fallback className="text-4xl text-myColor font-semibold">
                                                {formData.nombre?.charAt(0)}{formData.apellido?.charAt(0)}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    </div>
                                    <div className="flex flex-col items-center text-myColor">
                                        <h2 className="text-2xl font-semibold">
                                            {formData.nombre} {formData.apellido}
                                        </h2>
                                    </div>
                                </div>

                                <div className="md:w-full md:pl-8 bg-gray-100 rounded-lg p-6">
                                    <form onSubmit={handleSubmit} className="relative mb-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <label htmlFor="nombre" className="text-myColor font-semibold mb-2 ml-8">Nombre</label>
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
                                                <label htmlFor="apellido" className="text-myColor font-semibold mb-2 ml-8">Apellido</label>
                                                <div className="flex items-center space-x-2">
                                                    <User className="text-[#43a6e8]" />
                                                    <input
                                                        id="apellido"
                                                        type="text"
                                                        name="apellido"
                                                        value={formData.apellido}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className="p-2 rounded w-full text-gray-700 focus:outline-none focus:ring-1 focus:ring-myGray border border-myColor"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="correo" className="text-myColor font-semibold mb-2 ml-8">Correo</label>
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
                                                <label htmlFor="celular" className="text-gray-600 mb-2">Celular</label>
                                                <div className="flex items-center space-x-2">
                                                    <Phone className="text-[#43a6e8]" />
                                                    <input
                                                        id="celular"
                                                        type="tel"
                                                        name="celular"
                                                        value={formData.celular}
                                                        onChange={(e) => {
                                                            let value = e.target.value;

                                                            // Eliminar caracteres no numéricos, excepto el prefijo "+56"
                                                            if (!value.startsWith("+56")) {
                                                                value = "+56" + value.replace(/\D/g, "");
                                                            } else {
                                                                value = "+56" + value.slice(3).replace(/\D/g, "");
                                                            }

                                                            // Limitar a 12 caracteres en total
                                                            if (value.length > 12) return;

                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                celular: value,
                                                            }));

                                                            // Limpiar errores al modificar el campo
                                                            setErrors((prev) => ({ ...prev, phone: undefined }));
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
                                        </div>
                                        {isEditing && (
                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="flex items-center gap-2 bg-lime-500 hover:bg-lime-700 text-white py-2 px-4 rounded-md"
                                                >
                                                    <Save />Guardar cambios
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
                        onClick= {() => navigate('/')}
                        className="flex items-center gap-2 bg-myColor hover:bg-myGray text-white py-2 px-4 rounded-md">
                            <House />Ir al Home
                        </button>
                    </div>
                </main>
            </div>
        <Footer />
        </div>
    );
};

export default Profile;