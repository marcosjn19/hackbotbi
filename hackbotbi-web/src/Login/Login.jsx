import './Login.css'
import botbiLogo from '../assets/botbiLogo.png'
import LoginForm from './LoginForm'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    axios
      .get("/check-session", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.logged);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  if ( isAuthenticated ) {
    navigate("/index")
  }

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
