import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Head from "../components/Head";
import DiseaseCard from "../components/DiseaseCard"
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';
import DiseaseFeed from "../components/DiseaseFeed"

function Doencas() {
  
  const [selectedSymptom, setSymptom] = useState('*');
  
  const handleSymptomChange = (event) => {

    const newArray = [...event.target.selectedOptions].map((option) => option.value);
    setSymptom(newArray);
  }

  return (
    <>
      <Head/>
      <h1>Hospital Mil Saude</h1>
      <h1>Doencas</h1>

      <select name="sitomas" defaultValue={["*", "febre"]} multiple={true} onChange={handleSymptomChange}>
          <option value="*">Todos</option>
          <option value="febre">Febre</option>
          <option value="cianose">Cianose</option>
      </select>
      <DiseaseFeed symptom={selectedSymptom}/>
        {/* {doencas.map(
          (d) => (<DiseaseCard name={d.nome} cid={d.cid} symptoms={d.sintomas.map((sintoma,i)=>i!=d.sintomas.length-1 ? sintoma + ', ' : sintoma)}></DiseaseCard>)
          // (d) => (<h1>OLÀ</h1>)
        )} */}
      <Footer/>
    </>
  );
}

export default Doencas;
