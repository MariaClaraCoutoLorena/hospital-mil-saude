import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SignInForm from "../components/SignInForm";

function Signin() {

  return (
    <>
      <h1>Hospital Mil Saude</h1>
      <h1>Login</h1>
      <SignInForm/>
      <Link to={"/login"}>Já possui conta?</Link>
      <Footer/>
    </>
  );
}

export default Signin;
