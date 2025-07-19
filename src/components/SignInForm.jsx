import { useEffect, useState } from "react"
import { auth } from "../config/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';
import { Link, useNavigate } from "react-router-dom";
import ButtonCard from "./ButtonCard";


function SignInForm(params) {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCrm, setUserCrm] = useState("");
    const [adminUserValid, setAdminUserValid]  = useState(true);

    const navigate = useNavigate();

    const signIn = async () => {
        const dbRef = collection(database, 'medicos');
        
        var doctorQuery = query(dbRef, where("email", "==", userEmail), where("crm", "==", userCrm));
        
        const returnedDoctor = await getDocs(doctorQuery);
        if(!returnedDoctor.empty){  
            const userPromise= await createUserWithEmailAndPassword(auth, userEmail, userPassword).then(
                (userCredentials) => {
                    const user = userCredentials.user;
                    setAdminUserValid(true);
                    navigate(`/login`);
                }
            ).catch((error) => console.log(error));

        }else{
            setAdminUserValid(false);
        }
            
        
    }

   
    return (
        <>
                {!adminUserValid && (
                    <div style={{ border: '1px solid red', padding: '10px', marginBottom: '10px', backgroundColor: '#ffe6e6' }}>
                        <p>Entre em contato com a administração para cadastrar o seu usuario no sistema</p>
                    </div>
                )}
                <input placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                <input placeholder="Senha" onChange={(e) => setUserPassword(e.target.value)}/>
                <input placeholder="crm" onChange={(e) => setUserCrm(e.target.value)}/>
                <input type="submit" value="SignIn" onClick={signIn}></input>
        </>
    );
}

  export default SignInForm;