import './Menu.css'
import { CgMenuRound } from "react-icons/cg";
import { IoHome, IoPersonSharp, IoExit } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import botbiLogo from '../assets/botbiLogo.png'
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      alert("Hubo un problema al cerrar la sesión");
    }
    };

  return (
    <>
        <div className='navigation-menu-container'>
        <CgMenuRound size={30} onClick={toggleSidebar} className={`menu-icon ${isOpen ? 'open' : ''} `}/>
        <nav className={`navigation-menu ${isOpen ? 'open' : ''}`}>
            <li><IoMdCloseCircleOutline size={25} onClick={toggleSidebar} className='close-menu-icon'/></li>
            <li><Link to="/index"> <IoHome size={25}/>Inicio</Link></li>
            <li><Link to="/myclients"> <IoPersonSharp size={25}/>Clientes</Link></li>
            <li><Link onClick={handleLogout}><IoExit size={25}/>Salir</Link></li>
        </nav>
        <div className='logo-container-menu'><img src={botbiLogo}></img></div>
        </div>
    </>
  )
}

export default Menu
