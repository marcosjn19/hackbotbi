import React, { useState } from "react";
import './LoginForm.css'
import axios from "axios";
import UserProfile from "../User/UserProfile";
import { useNavigate } from "react-router-dom"; 

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event, action) => {
    event.preventDefault();

    if ( UserProfile.getMail != "" ) {
        navigate("/index");
    }
    
    const url = "/" + action
        try {
          const response = await axios.post(url, {
            mail: email,
            password: password,
          });
          setMessage(response.data.message);
          UserProfile.setMail(email);
          navigate("/index");
        } catch (error) {
          if (error.response) {
            setMessage(error.response.data.message);
          } else {
            setMessage("ERROR");
          }
        }
    };

  return (
    <>
    <div className="login-container">
        <form id="loginForm" onSubmit={(e) => handleSubmit(e, "login")}>
            <div className="login-container">
                <div>
                    <input type="text" id="mail" name="mail" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <input type="password" id="password" name="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </div>

            <div><button type="submit" className="login-btn main-btn">Iniciar Sesión</button></div>
            <div><button className="register-btn alt-btn" onClick={(e) => handleSubmit(e, "register")}>Registrarse</button></div>
        </form>

        {<p>{message}</p>}
    </div>
    </>
  )
}

export default LoginForm
