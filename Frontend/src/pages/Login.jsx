import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUsuario } from '../actions/yo-me-encargo'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })


  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }}, [navigate])


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

        if (result.token) {
          // Guardamos la información del usuario y el token
          localStorage.setItem('usuario', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          
          // Forzamos un rerender del navbar actualizando el localStorage
          const event = new Event('storage');
          window.dispatchEvent(event);
          
          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        // Manejar los mensajes de error específicos
        if (error.response && error.response.data && error.response.data.message) {
            setErrors(prev => ({
                ...prev,
                general: error.response.data.message
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                general: "Contraseña o correo incorrectos"
            }));
        }
    }
    }
  };



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section with Logo */}
      <div className="w-full md:w-1/2 bg-[#0F172A] flex items-center justify-center p-8 bg-logo-pattern bg-repeat bg-cover bg-center">

      </div>

      {/* Right Section with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
            <img
                src="img/logoyme-secondary.svg"
                width={360}
                height={80}
                alt="YoMeEncargo logo"
              />
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
                  className={`w-full px-4 py-2 bg-gray-50 text-gray-900 border border-myColor rounded-md focus:ring-2 focus:ring-myColor focus:border-transparent ${
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
                  className={`w-full px-4 py-2 bg-gray-50 text-gray-900 border border-myColor rounded-md focus:ring-2 focus:ring-myColor focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            </div>

            {errors.general && <p className="mt-4 text-center text-red-500">{errors.general}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-myColor hover:bg-myGray text-white font-semibold rounded-md hover:text-myColor focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
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
              onClick={() => navigate('/register')}
              className="mt-4 w-full py-2 px-4 border border-myColor text-myColor font-semibold rounded-md hover:bg-myColor hover:text-white focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
            >
              Ir al registro
            </button>
            <button
              onClick={() => navigate('/')}
              className="mt-4 w-full py-2 px-4 border border-myColor text-myColor font-semibold rounded-md hover:bg-myColor hover:text-white focus:outline-none focus:ring-2 focus:ring-myColor focus:ring-opacity-50 transition-colors"
            >
              Volver al Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage