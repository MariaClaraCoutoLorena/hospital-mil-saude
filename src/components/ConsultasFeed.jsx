import { useEffect, useState } from "react";
import ConsultaCard from "./ConsultaCard"
import { getDocs, collection, query, where } from "firebase/firestore";
import { database } from '../config/firebase-config';

const formatarTimestamp = (timestamp) => {
  const data = new Date(timestamp.seconds * 1000);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano} - ${horas}h${minutos}`;
};

const calcularIdade = (timestamp) => {
  if (!timestamp || typeof timestamp.seconds !== 'number') {
      return null; 
  }

  var dataNascimento = new Date(timestamp.seconds * 1000);
  var hoje = new Date();
  var idade = hoje.getFullYear() - dataNascimento.getFullYear();
  var mes = hoje.getMonth() - dataNascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  return idade;
};

function ConsultasFeed(props) {
  
  const [consultas, setConsultas] = useState([]);

  const dbRef = collection(database, 'consultas');
  useEffect(() => {
    const getConsultas = async () =>{
      var conditions = []
      var query_result = dbRef

      
      

      if(props.crm){
        conditions = [where("crm", "==", props.crm)];

        if(props.dataInicio){
          const [ano, mes, dia] = props.dataInicio.split('-');
          var dataInicioObj = new Date(ano, mes - 1, dia);
          conditions.push(where("data_consulta", ">=", dataInicioObj))
        }
        if(props.dataFim){
          const [ano, mes, dia] = props.dataFim.split('-');
          const dataFimObj = new Date(ano, mes - 1, dia);
          dataFimObj.setHours(23, 59, 59, 999);
          conditions.push(where("data_consulta", "<=", dataFimObj))
        }
        query_result = query(dbRef, ...conditions);
      } else {
        return
      }

      var returnedDocs = await getDocs(query_result);
      var consultasLista = [];
      var dados_card = [];

      returnedDocs.forEach(
        (d) => consultasLista.push({
            id:d,
            ...d.data(),
            data_consulta_format: formatarTimestamp(d.data().data_consulta)
          })
      );        
      const cpfs = [...new Set(consultasLista.map(c => c.cpf))];
      
      if (cpfs.length>0) {
        const pacientesRef = collection(database, 'pacientes');
        const pacientesQuery = query(pacientesRef, where("CPF", "in", cpfs));
        const returnedPacientes = await getDocs(pacientesQuery);
        
        const pacientesLista = [];
        returnedPacientes.forEach(d => {
            pacientesLista.push({
              ...d.data(),
              idade: calcularIdade(d.data().nascimento)
            });
        });
        dados_card = consultasLista.map( consulta =>{
          var paciente = pacientesLista.find(paciente => paciente.CPF === consulta.cpf);
          return {
            ...consulta,
            nome: paciente ? paciente.nome : 'Paciente não identificado',
            idade: paciente ? paciente.idade : 0
          };
        })
        console.log(dados_card)

      }
      else {
        dados_card = consultasLista
      }

      if(props.nameSearch != ""){
        dados_card = dados_card.filter(consulta => {
          return consulta.nome.toLowerCase().includes(props.nameSearch.toLowerCase());
        });

      }


          // if(props.datas.includes('*')) {
          //   if(props.nameSearch==""){
          //     var returnedDocs = await getDocs(dbRef);
          //   } else{
          //     query_result = query(dbRef, where("nome", "==", props.nameSearch));
          //     var returnedDocs = await getDocs(query_result);
          //   }
            
          // } else {
          //   console.log(props)
          //   var query_result = ""
          //   if(props.nameSearch==""){
          //     query_result = query(dbRef, where("sintomas", "array-contains-any", props.symptom));
          //     console.log("Sintomas filtrados")
          //   } else{
          //     query_result = query(dbRef, 
          //                               where("sintomas", "array-contains-any", props.symptom),
          //                               where("nome", "==", props.nameSearch)
          //                             );
          //     console.log("Nome pesquisado")
          //   }
          //   var returnedDocs = await getDocs(query_result);
          // }

      setConsultas(dados_card);
    }
    getConsultas();
    }, [props]
  )


  return (
    <div className='feed'>
        {consultas.map(
          (d, index) => (<ConsultaCard key={d.id} descricao={d.detalhes} data_consulta={d.data_consulta_format} nome={d.nome} idade={d.idade}></ConsultaCard>)
        )}
    </div>
  );
}

export default ConsultasFeed;
