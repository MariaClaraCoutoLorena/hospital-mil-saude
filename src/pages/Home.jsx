import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Footer from '../components/Footer';
import Head from '../components/Head';
import ButtonCard from '../components/ButtonCard';

function Home() {
  const [medicos, setMedicos] = useState([]); // ✅ Fixed: initialized as an array

  const dbRef = collection(database, 'medicos');

  useEffect(() => {
    const getDoctors = async () => {
      const data = await getDocs(dbRef);
      const filter = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMedicos(filter); // ✅ Set state correctly
    };
    getDoctors();
  }, []);

  return (
    <>
      <Head/>
      <ButtonCard>Consultar Histórico de Consultas</ButtonCard>
      <ButtonCard>Consultar CID de Doenças</ButtonCard>
      <Footer/>

    </>
  );
}

export default Home;
