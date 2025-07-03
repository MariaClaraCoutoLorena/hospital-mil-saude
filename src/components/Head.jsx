import avatar from '../assets/avatar.png'
import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDocs, getDoc, collection, doc } from 'firebase/firestore';


function Head() {

    const [medico, setMedico] = useState({});

    const id = 'cXrZqbso4inFPbFHbD8f';
    const dbRef = doc(database, 'medicos', id);
  
    useEffect(() => {
      const getDoctorById = async () => {
          const docMedico = await getDoc(dbRef);
      
          if (docMedico.exists()) {
            setMedico({ ...docMedico.data(), id: docMedico.id });
          } else {
            console.log("Médico não encontrado");
          }
      };

      getDoctorById();

    }, []);
      

    return (
        <div className="head">

            <div className="div-image-p">
                <img src={avatar} alt="" className='image-avatar'/>
                <h1> Médico {medico.nome} </h1>
                <h2> {medico.crm} </h2>
            </div>
            
            <button>
                Log off
            </button>

        </div>
    );
  }
  
  export default Head;