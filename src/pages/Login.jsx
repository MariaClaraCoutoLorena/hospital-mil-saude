import ButtonCard from "../components/ButtonCard";
import Footer from "../components/Footer";
import LogInForm from "../components/LogInForm"
import { Link } from "react-router-dom";
function Login() {

  return (
    <>
      <main className="container-centralizado">
        <h1 style={{fontSize: "4rem"}}>Hospital Mil Saude</h1>
        <div className="login-background">
          <h1>Login</h1>
          <LogInForm/>
        </div>
        <Link className="redirectLink" to={"/signin"}>Não possui conta? Clique aqui! </Link>
      </main>
      
    <Footer/>
    </>
  );
}

export default Login;
