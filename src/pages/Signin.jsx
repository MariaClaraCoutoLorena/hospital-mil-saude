import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SignInForm from "../components/SignInForm";

function Signin() {

  return (
    <>
      <main div className="container-centralizado">
        <h1 style={{fontSize: "4rem"}}>Hospital Mil Saude</h1>
        <div className="login-background">
          <h1>Cadastro</h1>
          <SignInForm/>
        </div>
        <Link className="redirectLink" to={"/login"}>Já possui conta?</Link>
      </main>
      <Footer/>
    </>
  );
}

export default Signin;
