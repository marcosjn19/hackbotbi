import Menu from '../Menu/Menu'
import './NewClientForm.css'
import { IoMdPerson, IoIosMail } from "react-icons/io";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom"; 


function NewClientForm() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [calle, setCalle] = useState("");
    const [colonia, setColonia] = useState("");
    const [numero, setNumero] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [estado, setEstado] = useState("");
    const [pais, setPais] = useState("");
    const mapRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
      if (lat && long) {
          const map = L.map(mapRef.current).setView([lat, long], 13);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          const marker = L.marker([lat, long]);
          marker.addTo(map).bindPopup("Ubicación validada").openPopup();
          map.setView([lat, long], 13);

          return () => {
              if (map) {
                  map.remove(); 
              }
          };
      }
  }, [lat, long]);

    const getCoordinates = async (e) => {
      e.preventDefault();
      try{
        const response = await axios.post("/getcoords", {
          calle,
          numero,
          ciudad,
          pais
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setLat  (response.data.lat)
        setLong (response.data.long)
        console.log(lat)
        console.log(long)
      }catch(error){

      }
    }

    const registerClient = async ( e ) => {
      e.preventDefault();
      try {
        const response = await axios.post("/register/client", {
          name: name,
          lastname: lastname,
          mail: email,
          lat: lat,
          long: long
        });
        navigate("/myclients");
      } catch (error) {
        if (error.response) {
          console.log(error.response)
        } else {
          console.log("ERROR")
        }
      }
    }

  return (
    <>
    <Menu/>
    <h1>Nuevo cliente</h1>
      <div className='newclient-main-container'>
          <form onSubmit={registerClient}>
          <div className="newclient-container">
          <h3>Datos personales</h3>
              <div className='personal-info-container'>
                <div>
                  <IoMdPerson size={15}/>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nombre"
                      onChange={(e) => setName(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="Nombre del cliente"
                  />
                </div>

                <div>
                <IoMdPerson size={15}/>
                  <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Apellido"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="Apellido del cliente"
                  />
                </div>

                <div>
                <IoIosMail size={15}/>
                  <input
                      type="email"
                      id="mail"
                      name="mail"
                      placeholder="Correo"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      title="Correo electrónico del cliente"
                  />
                </div>
              </div>

            <h3>Dirección</h3>
          
            <div className='direccion-container'>
              <div>
                  <input
                      type="text"
                      id="calle"
                      name="calle"
                      placeholder="Calle"
                      onChange={(e) => setCalle(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="Calle del cliente"
                  />
              </div>

              <div>
                  <input
                      type="text"
                      id="colonia"
                      name="colonia"
                      placeholder="Colonia"
                      onChange={(e) => setColonia(e.target.value)}
                      required
                      title="Colonia del cliente"
                  />
              </div>

              
              <div>
                  <input
                      type="text"
                      id="numero"
                      name="numero"
                      placeholder="Número exterior"
                      onChange={(e) => setNumero(e.target.value)}
                      required
                      pattern="[0-9]+"
                      title="Número exterior del cliente"
                  />
              </div>
            </div>

            <div className='direccion-container'>
              
              <div>
                  <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      placeholder="Ciudad"
                      onChange={(e) => setCiudad(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="Ciudad del cliente"
                  />
              </div>

              <div>
                  <input
                      type="text"
                      id="estado"
                      name="estado"
                      placeholder="Estado"
                      onChange={(e) => setEstado(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="Estado del cliente"
                  />
              </div>

              
              <div>
                  <input
                      type="text"
                      id="pais"
                      name="pais"
                      placeholder="País"
                      onChange={(e) => setPais(e.target.value)}
                      required
                      pattern="[A-Za-zÀ-ÿ\s]+"
                      title="País del cliente"
                  />
              </div>
            </div>
          </div>
          
          
          {lat && long && (
            <div className='btn-form-container'>
              <button type="submit" className="main-btn">Guardar Cliente</button>
            </div>
          )}
      </form>
      <button className='alt-btn validate-btn' onClick={getCoordinates}>Validar direccion</button>
      {lat && long && <div className='mapa-container' ref={mapRef} style={{ height: "300px", width: "80%" }} />}
      </div>
    </>
  )
}

export default NewClientForm
