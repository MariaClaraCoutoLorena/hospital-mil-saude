import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Consultas from "./pages/Consultas";
import Doencas from "./pages/Doencas";
import Signin from "./pages/Signin"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consultas/:id" element={<Consultas />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/doencas/:id" element={<Doencas />} />
        <Route path="/doencas" element={<Doencas />} />
      </Routes>
    </Router>
  );
}

export default App;
