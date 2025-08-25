import { useState } from 'react'
import { useAuthContext } from '@/core/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '@/shared/ui/InputField'
import Button from '@/shared/ui/Button'
import SocialButton from '@/shared/ui/SocialButton'
import './LoginPage.css'

export default function LoginPage() {
 
  const { login, loginWithFacebook, error } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingEmail(true);
    try {
      const user = await login(email, password)
      console.log('Usuario logueado:', user)
      navigate("/")
    } catch (err) {
      console.error("Error login:", err)

      if (err.code === 'auth/user-not-found') {
        alert('No existe un usuario con ese correo. Regístrate primero.')
      } else if (err.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta. Intenta nuevamente.')
      } else if (err.code === 'auth/invalid-email') {
        alert('Correo inválido. Verifica que esté bien escrito.')
      } else {
        alert('Ocurrió un error. Intenta nuevamente.')
      }
    } finally {
      setLoadingEmail(false);
    }
  }

  const handleFacebookLogin = async () => {
    setLoadingFacebook(true);
    try {
      const user = await loginWithFacebook();
      console.log("Usuario logueado con Facebook:", user);
      navigate("/");
    } catch (err) {
      console.error("Error loginWithFacebook:", err);
      alert("Error iniciando sesión con Facebook. Intenta nuevamente.");
    } finally {
      setLoadingFacebook(false);
    }
  }

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
            disabled={loadingEmail}
          >
            {loadingEmail ? "Cargando..." : "Iniciar Sesión"}
          </Button>
          {error && <p className='auth__error'>{error}</p>}
        </form>
        <div className="auth__separator">
          <span>o conéctate con</span>
        </div>
        
        <div className="social-buttons">
          <SocialButton 
            socialType="facebook" 
            onClick={handleFacebookLogin} 
            loading={loadingFacebook}
          />
          <SocialButton 
            socialType="google" 
            onClick={() => console.log("Google login")}
            loading={false}
          />
          <SocialButton 
            socialType="apple" 
            onClick={() => console.log("Apple login")}
            loading={false}
          />
        </div>
      </div>
    </div>
  )
}
