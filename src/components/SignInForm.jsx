import { useEffect, useState } from "react"
import { auth } from "../config/firebase-config"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import ButtonCard from "./ButtonCard";


function SignInForm(params) {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCrm, setUserCrm] = useState("");
    var signinSuccess;
    const signIn = async () => {
        //TODO verify if user is in database
        const dbRef = collection(database, 'medicos');
        
        var doctorQuery = query(dbRef, where("email", "==", user.email), where("crm", "==", userCrm));
        
        const returnedDoctor = await getDocs(doctorQuery);
        if(!returnedDoctor.empty){
            const userPromise= await createUserWithEmailAndPassword(auth, userEmail, userPassword).then(
                (userCredentials) => {
                    const user = userCredentials.user;
                    console.log(user.uid);
                    console.log(user.email);
                }
            ).catch((error) => console.log(error));

        }else {
            signinSuccess = False;  
        }
            
        
    }

    if(!signinSuccess){
        alert("Signin nao foi possivel");
    }
    return (
        <>
                <input placeholder="Email" onChange={(e) => setUserEmail(e.target.value)}/>
                <input placeholder="Senha" onChange={(e) => setUserPassword(e.target.value)}/>
                <input placeholder="crm" onChange={(e) => setUserCrm(e.target.value)}/>
                <input type="submit" value="SignIn" onClick={signIn}></input>
        </>
    );
}

  export default SignInForm;