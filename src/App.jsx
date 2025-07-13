import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Consultas from "./pages/Consultas";
import Doencas from "./pages/Doencas";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consultas/:id" element={<Consultas />} />
        <Route path="/doencas/:id" element={<Doencas />} />
      </Routes>
    </Router>
  );
}

export default App;
