import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png'
import { getAuth, signOut } from "firebase/auth";


function Head(props) {

    const auth = getAuth();
    const navigate = useNavigate();

    const signOutUser = async () => {
        signOut(auth);
        navigate("/");
    }
    return (
        <div className="head">

            <div className="div-image-p">
                <img src={avatar} alt="" className='image-avatar'/>
                <h1> Médico {props.medico_nome} </h1>
                <h2> {props.medico_crm} </h2>
            </div>
            
            <button onClick={signOutUser}>
                Log off
            </button >

        </div>
    );
  }
  
  export default Head;