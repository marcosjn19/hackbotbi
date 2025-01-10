import './Login.css'
import botbiLogo from '../assets/botbiLogo.png'
import LoginForm from './LoginForm'

function Login() {
  return (
    <>
      <div className='index-container'>
        <div className='logo-container'><img src={botbiLogo}></img></div>
        <h1>¡Bienvenido!</h1>
        <LoginForm/>
      </div>
    </>
  )
}

export default Login
