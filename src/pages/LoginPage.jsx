import { useState } from 'react'
import { useAuthContext } from '@/core/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '@/shared/ui/InputField'
import Button from '@/shared/ui/Button'
import './LoginPage.css'

export default function LoginPage() {
 
  const { login, error, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log('Usuario logueado:', user);
      navigate("/");
    } catch (err) {
      console.error("Error login:", err);

      if (err.code === 'auth/user-not-found') {
        alert('No existe un usuario con ese correo. Regístrate primero.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Intenta nuevamente.');
      } else if (err.code === 'auth/invalid-email') {
        alert('Correo inválido. Verifica que esté bien escrito.');
      } else {
        alert('Ocurrió un error. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className='container auth'>
      <div className='auth__box'>
        <h2 className='auth__title'>Iniciar Sesión</h2>
        <p className='auth__top'>
          ¿Es tu primera vez? <Link to='/registro'>Regístrate</Link>
        </p>
        <form action="" className='auth__form' onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="email@email.com"
            value={email}
            size="large"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField 
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            size="large"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button 
            type="submit"
            size="large"
            className="auth__button" 
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
          {error && <p className='auth__error'>{error}</p>}
        </form>
        <p className='auth__footer'>o conéctate con</p>
      </div>
    </div>
  )
}
