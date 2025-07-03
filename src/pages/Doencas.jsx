import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import DiseaseCard from "../components/DiseaseCard"
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';

function Doencas() {
  
  const [doencas, setDoencas] = useState([]);

  const dbRef = collection(database, 'doencas');
  console.log("yes");
  useEffect(
    () => {
      const getDoencas = async () =>{

        const query_result = query(dbRef, where("sintomas", "array-contains", 'febre'));

        const returnedDocs = await getDocs(query_result);

        // returnedDocs.forEach((doc) => {
        //   console.log(doc.data());
        // })
        const diseaseList = [];

         returnedDocs.forEach(
          (d) => diseaseList.push({id:d, ...d.data()})
        );
        setDoencas(diseaseList);
      }
      getDoencas();
    }, []
  )


  return (
    <>
      <Head/>
      <h1>Hospital Mil Saude</h1>
      <h1>Doencas</h1>
      {doencas.map(
        (d) => (<DiseaseCard name={d.nome} cid={d.cid}></DiseaseCard>)
        // (d) => (<h1>OLÀ</h1>)
      )}
      <Footer/>
    </>
  );
}

export default Doencas;
