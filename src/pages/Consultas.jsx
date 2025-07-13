import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import Footer from "../components/Footer";
import Head from "../components/Head";
import ConsultasFeed from "../components/ConsultasFeed";
import ButtonCard from "../components/ButtonCard";
import lupa from "../assets/lupa.svg"
import calendario from "../assets/calendario.png"
import { useParams } from 'react-router-dom';


function Consultas() {

  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);
    
  const { id } = useParams();
  
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const dbRef = doc(database, 'medicos', id);
    const getDoctorById = async () => {
      const docMedico = await getDoc(dbRef);
  
      if (docMedico.exists()) {
        console.log(docMedico)
        setMedico({ ...docMedico.data(), id: docMedico.id });
      } else {
        setMedico(null);
      }
      setLoading(false);
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
