import { useState } from 'react'
import { useAuthContext } from '@/core/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import InputField from '@/shared/ui/InputField'
import Button from '@/shared/ui/Button'
import './RegisterPage.css'

export default function RegisterPage() {

  const { register, error, loading } = useAuthContext()
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    cellphone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quitar espacios extra
    const cleanForm = {
      ...form,
      email: form.email.trim(),
      name: form.name.trim(),
      lastName: form.lastName.trim(),
      cellphone: form.cellphone.trim(),
    };

    // Validación básica de contraseñas
    {form.password !== form.confirmPassword && (
      <p className="auth__error">Las contraseñas no coinciden</p>
    )}

    try {
      const user = await register(cleanForm.email, cleanForm.password, {
        name: cleanForm.name,
        lastName: cleanForm.lastName,
        cellphone: cleanForm.cellphone,
      })
      console.log('Usuario registrado:', user)
      navigate("/") // redirige al HomePage
    } catch (err) {
      console.error('Error registro:', err)
      
      // Mensaje personalizado según el error
      if (err.code === 'auth/email-already-in-use') {
        alert('Este correo ya está registrado. Intenta iniciar sesión.')
      } else if (err.code === 'auth/invalid-email') {
        alert('Correo inválido. Verifica que esté bien escrito.')
      } else if (err.code === 'auth/weak-password') {
        alert('La contraseña es demasiado débil. Usa al menos 6 caracteres.')
      } else {
        alert('Ocurrió un error. Intenta nuevamente.')
      }
    }
  };

  return (
    <div className='container auth'>
      <div className='auth__box'>
        <h2 className='auth__title'>Regístrate</h2>
        <p className='auth__footer'>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
        <form onSubmit={handleSubmit} className='auth__form'>
          <InputField
            label="Nombre"
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Apellido"
            type="text"
            name="lastName"
            placeholder="Tu apellido"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Celular"
            type="tel"
            name="cellphone"
            placeholder="999 999 999"
            value={form.cellphone}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="email@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <InputField 
            label="Contraseña"
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
          <InputField 
            label="Repetir contraseña"
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button 
            type="submit"
            size="large"
            className="auth__button" 
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </Button>
          {error && <p className='auth__error'>{error}</p>}
        </form>
      </div>
    </div>
  )
}
