import { useEffect, useState } from "react"
import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth"
import { data, Link } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';

import { useNavigate } from "react-router-dom";

// dentro do componente

function LogInForm(params) {
    
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const signIn = async () => {
        //TODO verify if user is in database
        const userPromise= await signInWithEmailAndPassword (auth, userEmail, userPassword).then(
           async (userCredentials) => {
                const user = userCredentials.user;
                
                const dbRef = collection(database, 'medicos');

                var doctorQuery = query(dbRef, where("email", "==", user.email));

                const returnedDoctor = await getDocs(doctorQuery);

                const doctorData = []
                if(!returnedDoctor.empty){
                    returnedDoctor.forEach((d) => doctorData.push({id: d.id, ...d.data()}));
                    navigate(`/${doctorData[0].id}`);
                }
            }
        ).catch((error) => alert(error));
        
    
        
    }
    if(1){
        return (
            <div className="loginContainer">
                    <label style={{width: "100%"}}>Email</label>
                    <input placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} className="campo-login"/>
                    <label style={{width: "100%"}}>Senha</label>
                    <input placeholder="Senha" type="password" onChange={(e) => setUserPassword(e.target.value)} className="campo-login"/>
                    
                    <input type="submit" value="LogIn" onClick={signIn} className="botao-login"/>
            </div>
        );

    }
}

  export default LogInForm;