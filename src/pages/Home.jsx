import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDoc, collection, doc } from 'firebase/firestore';
import Footer from '../components/Footer';
import Head from '../components/Head';
import ButtonCard from '../components/ButtonCard';
import { useParams } from 'react-router-dom';

function Home() {

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
        <ButtonCard route_direct="/consultas" id_info={id}>Consultar Histórico de Consultas</ButtonCard>
        <ButtonCard route_direct="/doencas" id_info={id}>Consultar CID de Doenças</ButtonCard>
      </main>
      <Footer/>

    </>
  );
}

export default Home;
