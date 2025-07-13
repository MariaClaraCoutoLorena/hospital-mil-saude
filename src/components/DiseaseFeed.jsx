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
          if(props.nameSearch==""){
            var returnedDocs = await getDocs(dbRef);
          } else{
            query_result = query(dbRef, where("nome", "==", props.nameSearch));
            var returnedDocs = await getDocs(query_result);
          }
          
        } else {
          var query_result = ""
          if(props.nameSearch==""){
            query_result = query(dbRef, where("sintomas", "array-contains-any", props.symptom));
          } else{
            query_result = query(dbRef, 
                                      where("sintomas", "array-contains-any", props.symptom),
                                      where("nome", "==", props.nameSearch)
                                    );
          }
          var returnedDocs = await getDocs(query_result);
        }

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
    <div className='feed'>
        {doencas.map(
          (d, index) => (<DiseaseCard key={index}name={d.nome} cid={d.cid} symptoms={d.sintomas.map((sintoma,i)=>i!=d.sintomas.length-1 ? sintoma + ', ' : sintoma)}></DiseaseCard>)
        )}
    </div>
  );
}

export default DiseaseFeed;
