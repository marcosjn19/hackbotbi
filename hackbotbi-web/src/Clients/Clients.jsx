import Menu from '../Menu/Menu'
import './Clients.css'
import { useEffect, useState } from 'react'
import ClientRow from './ClientRow'
import axios from 'axios'
import { useNavigate } from "react-router-dom"; 

function Clients() {
    const navigate = useNavigate();
    
    const [clients, setClients] = useState([])
    const fetchClientes = async () => {
        const response = await axios.get("/get/clients")
        setClients(response.data.clients)
    }

    useEffect(() => {
        fetchClientes()
      }, [])
    
    const toNewClient = () => {
        navigate("/newclient")
    }
  return (
    <>
    <Menu/>
      <div className='clients-container'>
        <h1>Pagina de clientes</h1>
        <div className='clients-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Mail</th>
                        <th>Ubicacion</th>
                    </tr>
                </thead>

                <tbody>
                {
                clients.map(({ id, mail, name, lastname, lat, long  }) => (
                <ClientRow
                    name     = {name}
                    lastname = {lastname}
                    mail     = {mail}
                    lat      = {lat}
                    long     = {long}
                >
                </ClientRow>
                ))
                }
                </tbody>
            </table>
        </div>
        <button className='main-btn' onClick={toNewClient}> Nuevo cliente </button>
      </div>
    </>
  )
}

export default Clients
