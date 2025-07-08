import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Footer from '../components/Footer';
import Head from '../components/Head';
import ButtonCard from '../components/ButtonCard';

function Home() {
  const [medicos, setMedicos] = useState([]);

  const dbRef = collection(database, 'medicos');

  useEffect(() => {
    const getDoctors = async () => {
      const data = await getDocs(dbRef);
      const filter = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMedicos(filter); 
    };
    getDoctors();
  }, []);

  return (
    <>
      <Head/>
      <ButtonCard route_direct="/consultas">Consultar Histórico de Consultas</ButtonCard>
      <ButtonCard route_direct="/doencas">Consultar CID de Doenças</ButtonCard>
      <Footer/>

    </>
  );
}

export default Home;
