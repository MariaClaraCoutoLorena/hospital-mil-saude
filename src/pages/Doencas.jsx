import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import { doc, getDoc } from "firebase/firestore";
import { database } from '../config/firebase-config';
import DiseaseFeed from "../components/DiseaseFeed"
import lupa from '../assets/lupa.svg'

function Doencas() {
  
  const [selectedSymptom, setSymptom] = useState('*');
  
  const handleSymptomChange = (event) => {

    const newArray = [...event.target.selectedOptions].map((option) => option.value);
    setSymptom(newArray);
  }

  const [selectedNameSearch, setNameSearch] = useState('');
  
  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
  }

  const [medico, setMedico] = useState({});
    
  const id = 'cXrZqbso4inFPbFHbD8f';
    
  const dbRef = doc(database, 'medicos', id);
      
  useEffect(() => {
    const getDoctorById = async () => {
      const docMedico = await getDoc(dbRef);
  
      if (docMedico.exists()) {
        setMedico({ ...docMedico.data(), id: docMedico.id });
      } else {
        console.log("Médico não encontrado");
      }
    };
  
    getDoctorById();
  
  }, []);

  return (
    <>
      <Head medico_nome={medico.nome} medico_crm={medico.crm}> </Head>

      <main className="container-centralizado">
        
        

        <div className="filtros-container">
          <div className="input-com-icone">
            <img className='image-icons' src={lupa} alt="" />
            <input type="text" placeholder="Pesquise o nome da doença" onChange={handleNameSearchChange}/>
          </div>
          
          <select name="sitomas" defaultValue={["*", "febre"]} multiple={true} onChange={handleSymptomChange}>
              <option value="*">Todos</option>
              <option value="febre">Febre</option>
              <option value="cianose">Cianose</option>
          </select>
        </div>

        <DiseaseFeed symptom={selectedSymptom} nameSearch={selectedNameSearch}/>

      </main>

        {/* {doencas.map(
          (d) => (<DiseaseCard name={d.nome} cid={d.cid} symptoms={d.sintomas.map((sintoma,i)=>i!=d.sintomas.length-1 ? sintoma + ', ' : sintoma)}></DiseaseCard>)
          // (d) => (<h1>OLÀ</h1>)
        )} */}
      
      <Footer/>
    </>
  );
}

export default Doencas;
