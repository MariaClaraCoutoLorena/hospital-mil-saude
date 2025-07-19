import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SignInForm from "../components/SignInForm";

function Signin() {

  return (
    <div className="container-centralizado">
      <h1>Hospital Mil Saude</h1>
      <div className="login-background">
        <h1>SignIn</h1>
        <SignInForm/>

      </div>
      <Link to={"/login"}>Já possui conta?</Link>
      <Footer/>
    </div>
  );
}

export default Signin;
