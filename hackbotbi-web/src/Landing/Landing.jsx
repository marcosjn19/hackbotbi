import './Landing.css'
import UserProfile from '../User/UserProfile'
import { useNavigate } from 'react-router'
function Landing() {

    const navigate = useNavigate();

    if ( UserProfile.getMail == "" ) {
        navigate("/")
    }
    
  return (
    <>
      <div className='landing-container'>
        <h1>Pagina principal</h1>
      </div>
    </>
  )
}

export default Landing
