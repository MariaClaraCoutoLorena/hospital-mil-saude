import ButtonCard from "../components/ButtonCard";
import Footer from "../components/Footer";
import LogInForm from "../components/LogInForm"
import { Link } from "react-router-dom";
function Login() {

  return (
    <div className="container-centralizado">
      <h1>Hospital Mil Saude</h1>
      <div className="login-background">

        <h1>Login</h1>
        <LogInForm/>
        

      </div>
      <Link to={"/signin"}>Não possui conta?</Link>
 
    <Footer/>
    </div>
  );
}

export default Login;
