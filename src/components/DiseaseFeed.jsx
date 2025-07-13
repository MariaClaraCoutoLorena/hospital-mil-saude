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
          console.log(props)
          var query_result = ""
          if(props.nameSearch==""){
            query_result = query(dbRef, where("sintomas", "array-contains-any", props.symptom));
            console.log("Sintomas filtrados")
          } else{
            query_result = query(dbRef, 
                                      where("sintomas", "array-contains-any", props.symptom),
                                      where("nome", "==", props.nameSearch)
                                    );
            console.log("Nome pesquisado")
          }
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
    <div className='diseasefeed'>
        {doencas.map(
          (d, index) => (<DiseaseCard key={index}name={d.nome} cid={d.cid} symptoms={d.sintomas.map((sintoma,i)=>i!=d.sintomas.length-1 ? sintoma + ', ' : sintoma)}></DiseaseCard>)
        )}
    </div>
  );
}

export default DiseaseFeed;
