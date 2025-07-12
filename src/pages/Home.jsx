import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDoc, collection, doc } from 'firebase/firestore';
import Footer from '../components/Footer';
import Head from '../components/Head';
import ButtonCard from '../components/ButtonCard';

function Home() {
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
      <ButtonCard route_direct="/consultas">Consultar Histórico de Consultas</ButtonCard>
      <ButtonCard route_direct="/doencas">Consultar CID de Doenças</ButtonCard>
      <Footer/>

    </>
  );
}

export default Home;
