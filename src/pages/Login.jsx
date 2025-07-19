import ButtonCard from "../components/ButtonCard";
import Footer from "../components/Footer";
import LogInForm from "../components/LogInForm"
import { Link } from "react-router-dom";
function Login() {

  return (
    <>
      <h1>Hospital Mil Saude</h1>
      <h1>Login</h1>
      <LogInForm/>
      <Link to={"/signin"}>Não possui conta?</Link>
      <Footer/>
    </>
  );
}

export default Login;
