import React, { useState } from "react";
import './LoginForm.css'
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {validEmail, validPassword} from "../Utils/Regex.jsx"

import { LuMail } from "react-icons/lu";
import { IoKeyOutline } from "react-icons/io5";


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);

    const navigate = useNavigate();

    const validar = () => {
        setEmailErr(false);
        setPwdError(false);
        let datosValidos = true;
        if (!validEmail.test(email)) {
            setEmailErr(true);
            datosValidos = false;
        }

        if (!validPassword.test(password)) {
           setPwdError(true);
           datosValidos = false;
        }
        return datosValidos;
    };

    const handleSubmit = async (event, action) => {
    event.preventDefault();

    const url = "/" + action
    if ( action == "register" ) {
        if ( !validar() ){
            return;
        }
    }
        try {
          const response = await axios.post(url, {
            mail: email,
            password: password,
          });
          setMessage(response.data.message);
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
                    <LuMail className="icon-login"/>
                    <input type="text" id="mail" name="mail" placeholder="Correo" onChange={(e) => {setEmail(e.target.value);}} required 
                    title="Introduce tu correo electronico"/>
                </div>
                
                {emailErr && <p className="error-message">Correo invalido</p>}
                <div>
                    <IoKeyOutline className="icon-login"/>
                    <input type="password" id="password" name="password" placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value);}} required 
                    title="Introduce tu contraseña de al menos 6 caracteres con letras y numeros."/>
                </div>
                {pwdError && <p className="error-message">Contraseña invalida, debe contener letras, numeros y al menos 6 caracteres</p>}
            </div>
            {message && <p className="error-message">{message}</p>}
            <div><button type="submit" className="login-btn main-btn">Iniciar Sesión</button></div>
            <div><button className="register-btn alt-btn" onClick={(e) => handleSubmit(e, "register")}>Registrarse</button></div>
        </form>

       
    </div>
    </>
  )
}

export default LoginForm
