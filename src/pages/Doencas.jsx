import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { database } from '../config/firebase-config';
import DiseaseFeed from "../components/DiseaseFeed"
import ButtonCard from "../components/ButtonCard";
import lupa from '../assets/lupa.svg'
import check from '../assets/check.svg'
import { useParams } from 'react-router-dom';

function Doencas() {
  
  const { id } = useParams();
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const dbRef = doc(database, 'medicos', id);
    const getDoctorById = async () => {
      const docMedico = await getDoc(dbRef);
  
      if (docMedico.exists()) {
        setMedico({ ...docMedico.data(), id: docMedico.id });
      } else {
        setMedico(null);
      }
      setLoading(false);
    };
    getDoctorById();
  }, []);

  const [sintomas, setSintomas] = useState([{ value: '*', label: 'Todos' }]);
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const getSintomas = async () => {
      const dbRef = collection(database, 'doencas');
      const docDoencas = await getDocs(dbRef);

      let sintomasBanco = [];

      docDoencas.forEach(d => {
        sintomasBanco.push(...d.data().sintomas);
      })

      sintomasBanco = [...new Set(sintomasBanco)];

      const sintomasFormatados = sintomasBanco.map(sintoma => ({
        value: sintoma,
        label: sintoma.charAt(0).toUpperCase() + sintoma.slice(1)
      }));

      setSintomas([{ value: '*', label: 'Todos' }, ...sintomasFormatados]);

    };
    getSintomas();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSymptom, setSymptom] = useState(['*']);

  const handleSymptomChange = (value) => {
    setSymptom((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  }

  if(selectedSymptom.length == 0 ) { handleSymptomChange('*') }

  const [selectedNameSearch, setNameSearch] = useState('');
  
  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
  }

  if (loading) {
    return (
      <>
        <main className="container-centralizado">
          <h1> Carregando . . .</h1>
        </main>
        <Footer/>
      </>
    );
  }

  if (!id || !medico) {
    return (
      <>
        <main className="container-centralizado">
          <p>Você não está logado ou o médico não foi encontrado.</p>
          <ButtonCard route_direct="/login"> Ir para página de login</ButtonCard>
        </main>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <Head medico_nome={medico.nome} medico_crm={medico.crm}> </Head>

      <main className="container-centralizado">
        
        

        <div className="filtros-container">
          <div className="filtro-com-icone">
            <img className='image-icons' src={lupa} alt="" />
            <input type="text" placeholder="Pesquise o nome da doença" onChange={handleNameSearchChange}/>
          </div>
          
          <div className="filtro-com-icone">
            <img className='image-icons' src={check} alt="" />
            <div className="dropdown-container">
              <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                Selecione os sintomas
                <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
              </button>
              { isOpen && (
                <div className="dropdown-options">
                  {sintomas.map((sintoma) => (
                    <label key={sintoma.value} className="option-item">
                      <input
                        type="checkbox"
                        checked={selectedSymptom.includes(sintoma.value)}
                        onChange={() => handleSymptomChange(sintoma.value)}
                      />
                      {sintoma.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>

        <DiseaseFeed symptom={selectedSymptom} nameSearch={selectedNameSearch}/>

      </main>

      <Footer/>
    </>
  );
}

export default Doencas;
