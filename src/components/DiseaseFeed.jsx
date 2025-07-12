import { useEffect, useState } from "react";
import DiseaseCard from "../components/DiseaseCard"
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';

function DiseaseFeed(props) {
  
  const [doencas, setDoencas] = useState([]);

  const dbRef = collection(database, 'doencas');
  useEffect(
    () => {
      const getDoencas = async () =>{
        if(props.symptom.includes('*') || props.symptom.length == 0) {
          
          var returnedDocs = await getDocs(dbRef);
          
        }else{

          const query_result = query(dbRef, where("sintomas", "array-contains-any", props.symptom));
          var returnedDocs = await getDocs(query_result);
        }


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
    }, [props]
  )


  return (
    <div class='diseasefeed'>
        {doencas.map(
          (d, index) => (<DiseaseCard key={index}name={d.nome} cid={d.cid} symptoms={d.sintomas.map((sintoma,i)=>i!=d.sintomas.length-1 ? sintoma + ', ' : sintoma)}></DiseaseCard>)
          // (d) => (<h1>OLÀ</h1>)
        )}
    </div>
  );
}

export default DiseaseFeed;
