import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import Footer from "../components/Footer";
import Head from "../components/Head";
import ConsultasFeed from "../components/ConsultasFeed";
import lupa from "../assets/lupa.svg"
import calendario from "../assets/calendario.png"
import { useParams } from 'react-router-dom';


function Consultas() {
  const [medico, setMedico] = useState({});
  
  const { id } = useParams();
  
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

  const [selectedDatas, setDatas] = useState(['*']);

  const handleDatasChange = (value) => {
    setSymptom((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  }

  if(selectedDatas.length == 0 ) { handleDatasChange('*') }

  const [selectedNameSearch, setNameSearch] = useState('');
  
  const handleNameSearchChange = (event) => {
    setNameSearch(event.target.value);
  }

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');


  return (
    <>
      <Head medico_nome={medico.nome} medico_crm={medico.crm}> </Head>
      
      <main className="container-centralizado">
        
        

        <div className="filtros-container">
          <div className="filtro-com-icone">
            <img className='image-icons' src={lupa} alt="" />
            <input type="text" placeholder="Pesquise o nome do paciente" onChange={handleNameSearchChange}/>
          </div>
          
          <div className="filtroData">
            <img className='image-icons' src={calendario} alt="" />
            <input 
              type="date" 
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <span style={{ margin: '0 6px' }}>até</span>
            <input 
              type="date" 
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          
        </div>

        <ConsultasFeed crm ={medico.crm} selectedDatas={selectedDatas} nameSearch={selectedNameSearch} dataInicio={dataInicio} dataFim={dataFim}/>

      </main>

      <Footer/>

    </>
  );
}

export default Consultas;
