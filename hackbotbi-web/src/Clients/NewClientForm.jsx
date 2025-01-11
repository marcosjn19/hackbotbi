import Menu from '../Menu/Menu'
import './NewClientForm.css'
import { LuMail } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";

function NewClientForm() {
  return (
    <>
    <Menu/>
    <h1>Nuevo cliente</h1>
      <div className='newclient-main-container'>
          <form>
          
          <div className="newclient-container">
          
          <h3>Datos personales</h3>
              <div className='personal-info-container'>
                <div>
                  <IoMdPerson size={15}/>
                  <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Nombre"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      title="Nombre del cliente"
                  />
                </div>

                <div>
                <IoMdPerson size={15}/>
                  <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Apellido"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      title="Apellido del cliente"
                  />
                </div>

                <div>
                <LuMail size={15}/>
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
              {/* Calle */}
            <div className='direccion-container'>
              <div>
                  <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Calle"
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      title="Calle del cliente"
                  />
              </div>

              {/* Colonia */}
              <div>
                  <input
                      type="text"
                      id="neighborhood"
                      name="neighborhood"
                      placeholder="Colonia"
                      onChange={(e) => setNeighborhood(e.target.value)}
                      required
                      title="Colonia del cliente"
                  />
              </div>

              {/* Número exterior */}
              <div>
                  <input
                      type="text"
                      id="ext_number"
                      name="ext_number"
                      placeholder="Número exterior"
                      onChange={(e) => setExtNumber(e.target.value)}
                      required
                      title="Número exterior del cliente"
                  />
              </div>
            </div>

            <div className='direccion-container'>
              {/* Ciudad */}
              <div>
                  <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Ciudad"
                      onChange={(e) => setCity(e.target.value)}
                      required
                      title="Ciudad del cliente"
                  />
              </div>

              {/* Estado */}
              <div>
                  <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Estado"
                      onChange={(e) => setState(e.target.value)}
                      required
                      title="Estado del cliente"
                  />
              </div>

              {/* País */}
              <div>
                  <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="País"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      title="País del cliente"
                  />
              </div>
            </div>
          </div>
          
          {/* Botones */}
          <div className='btn-form-container'>
          <button className='alt-btn'>Validar direccion</button>
          <button type="submit" className="main-btn"> Guardar Cliente </button>
          </div>
      </form>
      </div>
    </>
  )
}

export default NewClientForm
