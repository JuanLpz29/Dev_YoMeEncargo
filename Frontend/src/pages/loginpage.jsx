import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../actions/yo-me-encargo'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })



  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido'
    if (!formData.password) newErrors.password = 'La contraseña es requerida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const usuarioData = {
          correo: formData.email,
          contrasena: formData.password,
        };

        const result = await loginUsuario(usuarioData);
        console.log("Usuario logueado:", result);

        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        navigate("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section with Logo */}
      <div className="w-full md:w-1/2 bg-[#0F172A] flex items-center justify-center p-8">
        <img
          src="src/assets/images/Login.png"
          alt="YoMeEncargo Logo"
          className="max-w-md w-full"
        />
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.4 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">¡Bienvenido a Yo Me Encargo!</h2>
            <p className="mt-2 text-sm text-gray-600">
              Puedes iniciar sesión ingresando tu correo y contraseña a continuación.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Si aun no tienes una cuenta,
              <br />
              ¡Únete a nuestra comunidad!
            </p>
            <button
              onClick={() => navigate('/registerpage')}
              className="mt-4 w-full py-2 px-4 border border-purple-600 text-purple-600 font-semibold rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
            >
              Registrarme
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage