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
    const [crmValid, setCrmValid] = useState(true);

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
        <div className="loginContainer">
                <input placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} className="campo-login"/>
                <input placeholder="Senha" type="password" onChange={(e) => setUserPassword(e.target.value)} className="campo-login"/>
                <input placeholder="CRM" onChange={(e) => setUserCrm(e.target.value)} className="campo-login"/>
                <input type="submit" value="SignIn" onClick={signIn} className="botao-login"></input>
                {!adminUserValid && (
                    <div className="fundoPreto">
                        <div className="aviso">
                            <Link className="fechar" to={"/signin"} onClick={(e) => setAdminUserValid(true)}>X</Link>
                            <p>CRM Inválido! Entre em contato com a administração para cadastrar seu usuario no sistema</p>
                        </div>
                    </div>
                )}
        </div>
    );
}

  export default SignInForm;